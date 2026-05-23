import { nanoid } from "nanoid";
import { config } from "../config.js";

export function processDropTick(state, activity) {
  if (!state.rewardUnlocked) {
    state.watchSeconds += 1;
  }

  const progress = Math.min(
    state.watchSeconds / config.rewardThresholdSeconds,
    1
  );

  if (progress >= 1 && !state.rewardUnlocked) {
    state.rewardUnlocked = true;
  }

  const processedAt = Date.now();

  return {
    id: nanoid(),
    type: "DROP_PROGRESS",
    activity,
    processedAt,
    latencyMs: processedAt - activity.createdAt,
    stream: {
      title: state.streamTitle,
      streamer: state.streamer,
      viewerCount: state.viewerCount,
    },
    viewer: {
      userId: state.userId,
      username: state.username,
      watchSeconds: state.watchSeconds,
      progress,
      rewardUnlocked: state.rewardUnlocked,
      rewardClaimed: state.rewardClaimed,
    },
    reward: {
      id: "drop_founder_badge",
      name: "Sky City Founder Badge",
      thresholdSeconds: config.rewardThresholdSeconds,
    },
    insight: createInsight(state, progress),
  };
}

export function claimReward(state) {
  if (!state.rewardUnlocked) {
    return { ok: false, message: "Reward is not unlocked yet." };
  }

  state.rewardClaimed = true;
  return { ok: true, message: "Reward claimed." };
}

function createInsight(state, progress) {
  if (state.rewardClaimed) return "Reward claimed. The engagement loop is complete.";
  if (state.rewardUnlocked) return "Reward unlocked. The viewer is ready to claim.";
  if (progress >= 0.75) return "Viewer is close to unlocking the Drop.";
  if (progress >= 0.4) return "Viewer is meaningfully engaged.";
  return "Viewer has started earning watch progress.";
}