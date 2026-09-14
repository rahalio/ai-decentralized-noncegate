import { useQuery } from "@tanstack/react-query";
import { getJson } from "@/lib/api";

type Feed = {
  status: string;
  observationLagMs: number;
  headerOnlyMode: boolean;
  clientLabel?: string;
  nonReplacementBanner?: string;
};

export function FeedHealthPage() {
  const query = useQuery({
    queryKey: ["feed-health"],
    queryFn: async () => {
      return await getJson<Feed>("/v1/block-observations/feed-health");
    },
  });

  const feed = query.data;

  return (
    <div className="stack">
      <div>
        <h1 className="page-title">Node feed health</h1>
        <p className="page-lede">
          Noncegate sits beside clients — ingest health without replacing consensus.
        </p>
      </div>
      <div className="panel">
        {feed ? (
          <>
            <div className="grid-3">
              <div>
                <div className="metric-label">Status</div>
                <div className="metric-value">{feed.status}</div>
              </div>
              <div>
                <div className="metric-label">Observation lag</div>
                <div className="metric-value mono">{feed.observationLagMs}ms</div>
              </div>
              <div>
                <div className="metric-label">Header-only</div>
                <div className="metric-value">{feed.headerOnlyMode ? "on" : "off"}</div>
              </div>
            </div>
            <p style={{ color: "var(--color-mute)", marginBottom: 0 }}>
              {feed.nonReplacementBanner ??
                "Assurance plane only — consensus remains on node clients (BR-9)."}
            </p>
          </>
        ) : (
          <p className="empty">Feed status unavailable — verification coverage may be blocked.</p>
        )}
      </div>
    </div>
  );
}
