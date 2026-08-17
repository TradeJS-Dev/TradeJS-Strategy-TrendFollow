import { defineStrategyPlugin } from "@tradejs/core/config";
import type { StrategyConfig, StrategyRegistryEntry } from "@tradejs/types";
import { config as trendFollowDefaultConfig } from "./TrendFollow/config";
import { TrendFollowStrategyDefinition } from "./TrendFollow/strategy";

export const strategyEntries: StrategyRegistryEntry[] = [
  TrendFollowStrategyDefinition,
];

const defaultConfigs: Record<string, StrategyConfig> = {
  TrendFollow: trendFollowDefaultConfig,
};

export const getBuiltInStrategyDefaultConfig = (
  strategyName: string,
): StrategyConfig | undefined => defaultConfigs[strategyName];

export { TrendFollowStrategyDefinition } from "./TrendFollow/strategy";
export { trendFollowDefaultConfig };
export { trendFollowManifest } from "./TrendFollow/manifest";
export { trendFollowAiAdapter } from "./TrendFollow/adapters/ai";

export default defineStrategyPlugin({ strategyEntries });
