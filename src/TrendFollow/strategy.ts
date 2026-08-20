import { createStrategyConfigParser } from "@tradejs/strategy-kit/config";
import type { ValidatedStrategyRegistryEntry } from "@tradejs/strategy-kit/config";
import { config as DEFAULT_CONFIG, TrendFollowConfig } from "./config";
import { createTrendFollowCore } from "./core";
import { trendFollowManifest } from "./manifest";

export const TrendFollowStrategyDefinition: ValidatedStrategyRegistryEntry<TrendFollowConfig> =
  {
    defaults: DEFAULT_CONFIG,
    parseConfig: createStrategyConfigParser({
      strategyName: "TrendFollow",
      defaults: DEFAULT_CONFIG,
    }),
    createCore: createTrendFollowCore,
    manifest: trendFollowManifest,
  };
