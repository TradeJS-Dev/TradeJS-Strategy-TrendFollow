# @tradejs/strategy-trend-follow

TradeJS strategy plugin providing `TrendFollow`.

## Strategy overview

`TrendFollow` maintains an ATR-offset trailing trend state from replayable
pivot structure. It trades directional flips with optional structure-breakout,
trend, benchmark, volume, persistence, RSI, and volatility filters, and can
exit on the trailing stop or an opposite signal.

## Logic at a glance

![TrendFollow strategy logic](https://raw.githubusercontent.com/TradeJS-Dev/TradeJS-Strategy-TrendFollow/main/docs/strategy-logic.svg)

## Install

```bash
yarn add @tradejs/strategy-trend-follow
```

Register the package in `tradejs.config.ts`:

```ts
import { defineConfig } from "@tradejs/core/config";

export default defineConfig({
  strategies: ["@tradejs/strategy-trend-follow"],
});
```

The package exports `strategyEntries` for the TradeJS plugin loader together
with its strategy definitions, manifests, default configs, and public AI/ML
adapters. Strategy implementation changes are released from this repository,
independently of the TradeJS engine.

## Development

```bash
yarn install --immutable
yarn checks
```

Publishing is triggered by a GitHub release and delegated to the pinned
`TradeJS-Workflows@v1` reusable workflow.

Keywords: ai, claude, codex.
