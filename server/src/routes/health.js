import express from "express";

export function createHealthRouter({ broadcaster, state }) {
  const router = express.Router();

  router.get("/health", (req, res) => {
    res.json({
      status: "ok",
      connectedClients: broadcaster.clientCount(),
      viewerCount: state.viewerCount,
      watchSeconds: state.watchSeconds,
      rewardUnlocked: state.rewardUnlocked,
      rewardClaimed: state.rewardClaimed,
      timestamp: new Date().toISOString(),
    });
  });

  return router;
}