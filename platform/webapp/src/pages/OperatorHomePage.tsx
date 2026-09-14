import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getJson } from "@/lib/api";

type TipSummary = {
  tip?: {
    height?: number;
    blockHash?: string;
    nonce?: string;
    headerOnly?: boolean;
  };
  verificationCoveragePct?: number;
  verifyMineTimeRatio?: number;
  openForkDifferential?: number;
  openAlertCount?: number;
};

export function OperatorHomePage() {
  const tipQuery = useQuery({
    queryKey: ["honest-tip"],
    queryFn: async () => {
      return await getJson<TipSummary>("/v1/block-observations/honest-tip");
    },
  });

  const tip = tipQuery.data;
  const coverage = tip?.verificationCoveragePct ?? null;
  const ratio = tip?.verifyMineTimeRatio ?? null;
  const forkDiff = tip?.openForkDifferential ?? 0;
  const alerts = tip?.openAlertCount ?? 0;

  return (
    <div className="stack">
      <div>
        <h1 className="page-title">Honest tip</h1>
        <p className="page-lede">
          Is the tip independently verified, and how does candidate work compare?
        </p>
      </div>

      <div className="panel">
        <div className="row" style={{ justifyContent: "space-between" }}>
          <div>
            <div className="metric-label">Tip height</div>
            <div className="metric-value mono">
              {tip?.tip?.height ?? (tipQuery.isLoading ? "…" : "—")}
            </div>
          </div>
          <div>
            {tip?.tip ? (
              <span className="stamp-pass" aria-label="Verified stamp">
                ● Pass stamp pending coverage
              </span>
            ) : (
              <span className="empty">
                {tipQuery.isError || tipQuery.isSuccess
                  ? "Connect node feed to establish tip"
                  : "Loading tip…"}
              </span>
            )}
          </div>
        </div>
        {tip?.tip?.blockHash ? (
          <p className="mono" style={{ marginTop: "0.75rem", fontSize: "0.8rem", color: "var(--color-mute)" }}>
            {tip.tip.blockHash}
          </p>
        ) : null}
      </div>

      <div className="grid-3">
        <div className="panel">
          <div className="metric-label">Verification coverage</div>
          <div className="metric-value">
            {coverage != null ? `${coverage.toFixed(1)}%` : "—"}
          </div>
        </div>
        <div className="panel">
          <div className="metric-label">Verify / mine ratio</div>
          <div className="metric-value">
            {ratio != null ? ratio.toFixed(3) : "—"}
          </div>
        </div>
        <div className="panel">
          <div className="metric-label">Open alerts</div>
          <div className="metric-value stamp-caution">{alerts}</div>
        </div>
      </div>

      <div className="panel">
        <div className="metric-label">Fork differential</div>
        <div className="row" style={{ marginTop: "0.35rem" }}>
          <span className="mono">{forkDiff}</span>
          <span className="empty">work vs honest tip</span>
        </div>
        <div className="fork-bar" aria-hidden>
          <span style={{ width: `${Math.min(100, Math.abs(forkDiff) * 10)}%` }} />
        </div>
      </div>

      <div className="row">
        <Link className="btn" to="/ops/verification">
          Open failed verifications
        </Link>
        <Link className="btn" to="/ops/forks">
          Open fork report
        </Link>
        <Link className="btn" to="/ops/alerts">
          Alert rail
        </Link>
      </div>
    </div>
  );
}
