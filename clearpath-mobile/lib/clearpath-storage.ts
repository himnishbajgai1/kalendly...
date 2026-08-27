import AsyncStorage from "@react-native-async-storage/async-storage";

export { dateKey, dayCount, formatShortDate } from "@/lib/clearpath-utils";

export type CheckInLevel = "steady" | "uneasy" | "overloaded";

export type CheckIn = {
  id: string;
  createdAt: string;
  level: CheckInLevel;
  note: string;
};

export type ResetWin = {
  id: string;
  createdAt: string;
  action: string;
};

export type PersonalPlan = {
  reason: string;
  trigger: string;
  replacementAction: string;
};

export type ClearPathData = {
  startedAt: string;
  checkIns: CheckIn[];
  resetWins: ResetWin[];
  plan: PersonalPlan;
};

const STORAGE_KEY = "clearpath.private.data.v1";

export const DEFAULT_PLAN: PersonalPlan = {
  reason: "I want more focus for the things that matter to me.",
  trigger: "Late-night scrolling",
  replacementAction: "Put my phone away and take a short walk",
};

export function createInitialData(): ClearPathData {
  return {
    startedAt: new Date().toISOString(),
    checkIns: [],
    resetWins: [],
    plan: { ...DEFAULT_PLAN },
  };
}

export async function loadClearPathData(): Promise<ClearPathData> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return createInitialData();

    const parsed = JSON.parse(raw) as Partial<ClearPathData>;
    if (!parsed.startedAt || !Array.isArray(parsed.checkIns) || !Array.isArray(parsed.resetWins)) {
      return createInitialData();
    }

    return {
      startedAt: parsed.startedAt,
      checkIns: parsed.checkIns,
      resetWins: parsed.resetWins,
      plan: { ...DEFAULT_PLAN, ...parsed.plan },
    };
  } catch {
    return createInitialData();
  }
}

export async function saveClearPathData(data: ClearPathData) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
