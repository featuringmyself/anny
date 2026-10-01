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
  AUDIT_FIX_PRICING,
  type AuditFixMarket,
} from "@/lib/audit-fix-pricing";

type AuditFixMarketContextValue = {
  market: AuditFixMarket;
  setMarket: (market: AuditFixMarket) => void;
  pricing: (typeof AUDIT_FIX_PRICING)[AuditFixMarket];
};

const AuditFixMarketContext =
  createContext<AuditFixMarketContextValue | null>(null);

export function AuditFixMarketProvider({
  initialMarket,
  children,
}: {
  initialMarket: AuditFixMarket;
  children: ReactNode;
}) {
  const [market, setMarketState] = useState<AuditFixMarket>(initialMarket);
  const setMarket = useCallback((next: AuditFixMarket) => {
    setMarketState(next);
  }, []);

  const value = useMemo(
    () => ({
      market,
      setMarket,
      pricing: AUDIT_FIX_PRICING[market],
    }),
    [market, setMarket],
  );

  return (
    <AuditFixMarketContext.Provider value={value}>
      {children}
    </AuditFixMarketContext.Provider>
  );
}

export function useAuditFixMarket() {
  const ctx = useContext(AuditFixMarketContext);
  if (!ctx) {
    throw new Error(
      "useAuditFixMarket must be used within AuditFixMarketProvider",
    );
  }
  return ctx;
}
