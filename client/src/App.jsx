import { useDropStream } from "./hooks/useDropStream";
import { StreamPanel } from "./components/StreamPanel";
import { DropProgress } from "./components/DropProgress";
import { EventFeed } from "./components/EventFeed";
import { InsightPanel } from "./components/InsightPanel";
import "./style.css";

export default function App() {
  const { status, latest, events, claimReward, claimResult } = useDropStream();

  return (
    <main className="app-shell">
      <section className="hero">
        <div>
          <p className="eyebrow">Creator Sponsorships / Drops Simulation</p>
          <h1>Real-time reward engagement dashboard</h1>
          <p>
            A live product-engineering demo for watch progress, reward unlocks,
            WebSocket delivery, and creator monetization signals.
          </p>
        </div>

        <div className={`connection-pill ${status}`}>
          <span />
          {status}
        </div>
      </section>

      <StreamPanel event={latest} status={status} />

      <section className="dashboard-grid">
        <DropProgress
          event={latest}
          onClaim={claimReward}
          claimResult={claimResult}
        />
        <InsightPanel event={latest} />
      </section>

      <EventFeed events={events} />
    </main>
  );
}