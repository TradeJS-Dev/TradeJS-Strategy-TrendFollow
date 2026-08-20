# @tradejs/strategy-trend-follow

TradeJS strategy plugin providing `TrendFollow`.

## Strategy overview

`TrendFollow` maintains an ATR-offset trailing trend state from replayable
pivot structure. It trades directional flips with optional structure-breakout,
trend, benchmark, volume, persistence, RSI, and volatility filters, and can
exit on the trailing stop or an opposite signal.

## Logic at a glance

![TrendFollow strategy logic](https://raw.githubusercontent.com/TradeJS-Dev/TradeJS-Strategy-TrendFollow/main/docs/strategy-logic.svg)

## Signal on an example chart

The purple ATR-offset trail holds the bearish regime until price crosses it and the bounded state flips upward; optional context filters then qualify the LONG.

![TrendFollow signal on an illustrative ticker chart](https://raw.githubusercontent.com/TradeJS-Dev/TradeJS-Strategy-TrendFollow/main/docs/signal-example.svg)

The illustration is schematic, not market data. Exact thresholds, confirmation
rules, and risk parameters come from the active TradeJS strategy config.

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

Publishing is beta-first and delegated to the pinned
`TradeJS-Workflows@v1` reusable workflow. A relevant push publishes a unique
prerelease and moves the npm `beta` tag only after the production-like Project
image passes. The current verified beta is promoted to one stable `latest`
release by the weekly automation; production never consumes prereleases.

Keywords: ai, claude, codex.
