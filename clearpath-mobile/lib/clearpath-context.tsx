import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";

import {
  createInitialData,
  loadClearPathData,
  saveClearPathData,
  type CheckInLevel,
  type ClearPathData,
  type PersonalPlan,
} from "@/lib/clearpath-storage";

type ClearPathContextValue = {
  data: ClearPathData;
  isReady: boolean;
  submitCheckIn: (level: CheckInLevel, note: string) => Promise<void>;
  recordResetWin: (action: string) => Promise<void>;
  updatePlan: (plan: PersonalPlan) => Promise<void>;
  clearLocalData: () => Promise<void>;
};

const ClearPathContext = createContext<ClearPathContextValue | null>(null);

export function ClearPathProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<ClearPathData>(() => createInitialData());
  const [isReady, setIsReady] = useState(false);
  const dataRef = useRef(data);

  useEffect(() => {
    loadClearPathData().then((loaded) => {
      dataRef.current = loaded;
      setData(loaded);
      setIsReady(true);
    });
  }, []);

  const commit = useCallback(async (transform: (current: ClearPathData) => ClearPathData) => {
    const next = transform(dataRef.current);
    dataRef.current = next;
    setData(next);
    await saveClearPathData(next);
  }, []);

  const value = useMemo<ClearPathContextValue>(
    () => ({
      data,
      isReady,
      submitCheckIn: (level, note) =>
        commit((current) => ({
          ...current,
          checkIns: [
            {
              id: `check-in-${Date.now()}`,
              createdAt: new Date().toISOString(),
              level,
              note: note.trim(),
            },
            ...current.checkIns,
          ].slice(0, 120),
        })),
      recordResetWin: (action) =>
        commit((current) => ({
          ...current,
          resetWins: [
            {
              id: `reset-${Date.now()}`,
              createdAt: new Date().toISOString(),
              action,
            },
            ...current.resetWins,
          ].slice(0, 120),
        })),
      updatePlan: (plan) => commit((current) => ({ ...current, plan })),
      clearLocalData: () =>
        commit(() => {
          return createInitialData();
        }),
    }),
    [commit, data, isReady],
  );

  return <ClearPathContext.Provider value={value}>{children}</ClearPathContext.Provider>;
}

export function useClearPath() {
  const context = useContext(ClearPathContext);
  if (!context) throw new Error("useClearPath must be used within ClearPathProvider");
  return context;
}
