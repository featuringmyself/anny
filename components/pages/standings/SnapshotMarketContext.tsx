"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  SNAPSHOT_PRICING,
  type SnapshotMarket,
} from "@/lib/snapshots-pricing";

type SnapshotMarketContextValue = {
  market: SnapshotMarket;
  setMarket: (market: SnapshotMarket) => void;
  pricing: (typeof SNAPSHOT_PRICING)[SnapshotMarket];
};

const SnapshotMarketContext = createContext<SnapshotMarketContextValue | null>(
  null,
);

export function SnapshotMarketProvider({
  initialMarket,
  children,
}: {
  initialMarket: SnapshotMarket;
  children: ReactNode;
}) {
  const [market, setMarketState] = useState<SnapshotMarket>(initialMarket);
  const setMarket = useCallback((next: SnapshotMarket) => {
    setMarketState(next);
  }, []);

  const value = useMemo(
    () => ({
      market,
      setMarket,
      pricing: SNAPSHOT_PRICING[market],
    }),
    [market, setMarket],
  );

  return (
    <SnapshotMarketContext.Provider value={value}>
      {children}
    </SnapshotMarketContext.Provider>
  );
}

export function useSnapshotMarket() {
  const ctx = useContext(SnapshotMarketContext);
  if (!ctx) {
    throw new Error("useSnapshotMarket must be used within SnapshotMarketProvider");
  }
  return ctx;
}
