import type { AiPayload, Direction, Signal } from "@tradejs/types";
import { trendFollowAiAdapter } from "../adapters/ai";

const evaluate = ({
  direction = "SHORT",
  advancers = 2,
  top5Unchanged = 0,
  ethM15LevelsCrossed = 2,
  distanceToStopPct = 6,
  top5EqualWeightedReturn = -0.003,
}: {
  direction?: Direction;
  advancers?: number;
  top5Unchanged?: number;
  ethM15LevelsCrossed?: number;
  distanceToStopPct?: number;
  top5EqualWeightedReturn?: number;
} = {}) =>
  trendFollowAiAdapter.postProcessLocalAnalysis?.({
    signal: {
      direction,
      prices: { takeProfitPrice: 90, stopLossPrice: 105 },
    } as Signal,
    payload: {
      additionalIndicators: {
        baseContext: {
          relative: {
            marketBreadth: { advancers },
            marketBreadths: {
              top5: {
                unchanged: top5Unchanged,
                equalWeightedReturn: top5EqualWeightedReturn,
              },
            },
            referencePsychologicalLevels: {
              ETHUSDT: {
                windows: {
                  m15: { levelsCrossed: ethM15LevelsCrossed },
                },
              },
            },
          },
        },
        trendFollowContext: { distanceToStopPct },
      },
    } as unknown as AiPayload,
    analysis: { direction, quality: 5 },
  });

describe("TrendFollow local AI gate", () => {
  it("approves the calibrated SHORT breadth boundary", () => {
    expect(evaluate()).toEqual(
      expect.objectContaining({
        direction: "SHORT",
        quality: 4,
        approved: true,
        gateDecision: "approved",
      }),
    );
  });

  it.each([
    ["LONG direction", { direction: "LONG" as Direction }],
    ["too few advancers", { advancers: 1 }],
    ["unchanged top-five member", { top5Unchanged: 1 }],
    [
      "discovered loss pocket",
      {
        ethM15LevelsCrossed: 1,
        distanceToStopPct: 6,
        top5EqualWeightedReturn: -0.003,
      },
    ],
  ])("rejects %s", (_name, overrides) => {
    expect(evaluate(overrides)).toEqual(
      expect.objectContaining({
        direction: null,
        quality: 3,
        approved: false,
        gateDecision: "rejected",
      }),
    );
  });

  it.each([
    ["ETH m15 level breakout", { ethM15LevelsCrossed: 2 }],
    ["compact stop distance", { ethM15LevelsCrossed: 1, distanceToStopPct: 5 }],
    [
      "non-negative top-five pressure",
      { ethM15LevelsCrossed: 1, top5EqualWeightedReturn: -0.002 },
    ],
  ])("approves outside loss pocket via %s", (_name, overrides) => {
    expect(evaluate(overrides)).toEqual(
      expect.objectContaining({
        direction: "SHORT",
        quality: 4,
        approved: true,
        gateDecision: "approved",
      }),
    );
  });

  it("rejects when a required causal feature is missing", () => {
    const result = trendFollowAiAdapter.postProcessLocalAnalysis?.({
      signal: {
        direction: "SHORT",
        prices: { takeProfitPrice: 90, stopLossPrice: 105 },
      } as Signal,
      payload: {
        additionalIndicators: { baseContext: {} },
      } as unknown as AiPayload,
      analysis: { direction: "SHORT", quality: 5 },
    });

    expect(result).toEqual(
      expect.objectContaining({
        direction: null,
        quality: 3,
        approved: false,
        gateDecision: "rejected",
      }),
    );
  });
});
