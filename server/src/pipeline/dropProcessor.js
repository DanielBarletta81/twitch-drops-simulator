import { nanoid } from "nanoid";

export function processDropTick(state, activity) {
  if (!state.campaign.active) {
    return createDropEvent(state, activity, "Campaign is paused.");
  }

  if (!state.rewardUnlocked) {
    state.watchSeconds += 1;
  }

  const progress = Math.min(
    state.watchSeconds / state.campaign.thresholdSeconds,
    1
  );
  const engagementScore = Number((progress * state.viewerCount).toFixed(2));

  const analytics = {
  viewerCount: state.viewerCount,
  watchSeconds: state.watchSeconds,
  progressPercent: Math.round(progress * 100),
  completionRate: state.rewardUnlocked ? 100 : Math.round(progress * 100),
  claimedRate: state.rewardClaimed ? 100 : 0,
  engagementScore,
  campaignStatus: state.campaign.active ? "active" : "paused",
};

  if (progress >= 1 && !state.rewardUnlocked) {
    state.rewardUnlocked = true;
  }

  return createDropEvent(state, activity, createInsight(state, progress));
}

export function claimReward(state) {
  if (!state.rewardUnlocked) {
    return { ok: false, message: "Reward is not unlocked yet." };
  }

  state.rewardClaimed = true;
  return { ok: true, message: "Reward claimed." };
}

export function updateCampaign(state, updates) {
  state.campaign = {
    ...state.campaign,
    ...updates,
    thresholdSeconds: Number(updates.thresholdSeconds) || state.campaign.thresholdSeconds,
  };

  state.watchSeconds = 0;
  state.rewardUnlocked = false;
  state.rewardClaimed = false;

  return state.campaign;
}

function createDropEvent(state, activity, insight) {
  const processedAt = Date.now();
  const progress = Math.min(
    state.watchSeconds / state.campaign.thresholdSeconds,
    1
  );

  return {
  id: nanoid(),
  type: "DROP_PROGRESS",
  activity,
  processedAt,
  latencyMs: processedAt - activity.createdAt,
  engagementScore,
  analytics,
  campaign: state.campaign,
  stream: {
    title: state.campaign.streamTitle,
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
    id: state.campaign.rewardId,
    name: state.campaign.rewardName,
    description: state.campaign.rewardDescription,
    thresholdSeconds: state.campaign.thresholdSeconds,
  },
  insight,
};
}

function createInsight(state, progress) {
  if (state.rewardClaimed) return "Reward claimed. The engagement loop is complete.";
  if (state.rewardUnlocked) return "Reward unlocked. The viewer is ready to claim.";
  if (progress >= 0.75) return "Viewer is close to unlocking the Drop.";
  if (progress >= 0.4) return "Viewer is meaningfully engaged.";
  return "Viewer has started earning watch progress.";
}