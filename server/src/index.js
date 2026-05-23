import express from "express";
import cors from "cors";
import { WebSocketServer } from "ws";
import { config } from "./config.js";
import { viewerState } from "./simulator/viewerState.js";
import { generateActivity } from "./simulator/activityGenerator.js";
import { processDropTick, claimReward } from "./pipeline/dropProcessor.js";
import { Broadcaster } from "./websocket/broadcaster.js";
import { createHealthRouter } from "./routes/health.js";

const app = express();

app.use(cors());
app.use(express.json());

const server = app.listen(config.port, () => {
  console.log(`Twitch Drops simulator running at http://localhost:${config.port}`);
});

const wss = new WebSocketServer({ server });
const broadcaster = new Broadcaster(wss);

app.use("/api", createHealthRouter({ broadcaster, state: viewerState }));

app.post("/api/claim", (req, res) => {
  const result = claimReward(viewerState);

  broadcaster.broadcast({
    type: "REWARD_CLAIMED",
    result,
    viewer: viewerState,
  });

  res.json(result);
});

wss.on("connection", (socket) => {
  socket.send(
    JSON.stringify({
      type: "SYSTEM",
      message: "Connected to Drops simulation stream.",
      timestamp: new Date().toISOString(),
    })
  );
});

setInterval(() => {
  const activity = generateActivity(viewerState);
  const dropEvent = processDropTick(viewerState, activity);

  broadcaster.broadcast({
    type: "DROP_EVENT",
    event: dropEvent,
  });
}, config.tickMs);