const activityTypes = [
  "CHAT_MESSAGE",
  "VIEWER_JOINED",
  "VIEWER_LEFT",
  "HYPE_EVENT",
  "SPONSOR_PROMPT",
];

export function generateActivity(state) {
  const type = activityTypes[Math.floor(Math.random() * activityTypes.length)];

  if (type === "VIEWER_JOINED") {
    state.viewerCount += Math.floor(Math.random() * 8) + 1;
  }

  if (type === "VIEWER_LEFT") {
    state.viewerCount = Math.max(0, state.viewerCount - Math.floor(Math.random() * 6));
  }

  return {
    type,
    viewerCount: state.viewerCount,
    createdAt: Date.now(),
  };
}