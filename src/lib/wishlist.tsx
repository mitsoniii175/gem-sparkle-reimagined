import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";

const LOCAL_KEY = "ras-wishlist";

type WishlistValue = {
  ids: string[];
  has: (id: string) => boolean;
  toggle: (id: string) => void;
};

const WishlistContext = createContext<WishlistValue>({
  ids: [],
  has: () => false,
  toggle: () => {},
});

function readLocal(): string[] {
  try {
    const raw = window.localStorage.getItem(LOCAL_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function writeLocal(ids: string[]) {
  try {
    window.localStorage.setItem(LOCAL_KEY, JSON.stringify(ids));
  } catch {
    /* ignore */
  }
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [ids, setIds] = useState<string[]>([]);

  // Load local wishlist on mount (guest state).
  useEffect(() => {
    setIds(readLocal());
  }, []);

  // On sign-in: merge any guest picks into the account, then load from the account.
  useEffect(() => {
    if (!user) return;
    let cancelled = false;

    (async () => {
      const local = readLocal();
      if (local.length > 0) {
        await supabase
          .from("wishlist_items")
          .upsert(
            local.map((product_id) => ({ user_id: user.id, product_id })),
            { onConflict: "user_id,product_id" },
          );
        writeLocal([]);
      }
      const { data } = await supabase.from("wishlist_items").select("product_id");
      if (!cancelled && data) setIds(data.map((r) => r.product_id));
    })();

    return () => {
      cancelled = true;
    };
  }, [user]);

  const toggle = useCallback(
    (id: string) => {
      setIds((current) => {
        const exists = current.includes(id);
        const next = exists ? current.filter((x) => x !== id) : [...current, id];

        if (user) {
          if (exists) {
            void supabase.from("wishlist_items").delete().eq("product_id", id).eq("user_id", user.id);
          } else {
            void supabase
              .from("wishlist_items")
              .upsert({ user_id: user.id, product_id: id }, { onConflict: "user_id,product_id" });
          }
        } else {
          writeLocal(next);
        }
        return next;
      });
    },
    [user],
  );

  const has = useCallback((id: string) => ids.includes(id), [ids]);

  return (
    <WishlistContext.Provider value={{ ids, has, toggle }}>{children}</WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
