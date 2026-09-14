import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getJson, postJson } from "@/lib/api";

type Fork = {
  id: string;
  honestTipHash: string;
  candidateTipHash: string;
  workDifferential: number;
  recomputeCostEstimate?: string;
  status: string;
};

export function ForksPage() {
  const qc = useQueryClient();
  const query = useQuery({
    queryKey: ["forks"],
    queryFn: async () => {
      const data = await getJson<{ items: Fork[] }>("/v1/fork-reports");
      return data?.items ?? [];
    },
  });

  const ack = useMutation({
    mutationFn: async (forkId: string) => {
      await postJson(`/v1/fork-reports/${forkId}/acknowledge`, {});
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["forks"] }),
  });

  return (
    <div className="stack">
      <div>
        <h1 className="page-title">Fork and rewrite analysis</h1>
        <p className="page-lede">
          Candidate forks vs honest tip with cumulative work differential and recomputation cost.
        </p>
      </div>
      {(query.data?.length ?? 0) === 0 ? (
        <div className="panel empty">Single tip — no competing work.</div>
      ) : (
        <div className="stack">
          {query.data?.map((f) => (
            <div className="panel" key={f.id}>
              <div className="row" style={{ justifyContent: "space-between" }}>
                <strong className="mono">{f.status}</strong>
                <button className="btn" type="button" onClick={() => ack.mutate(f.id)}>
                  Acknowledge
                </button>
              </div>
              <p className="mono" style={{ fontSize: "0.8rem", color: "var(--color-mute)" }}>
                honest {f.honestTipHash}
                <br />
                candidate {f.candidateTipHash}
              </p>
              <div className="metric-label">Work differential</div>
              <div className="metric-value stamp-caution">{f.workDifferential}</div>
              <div className="fork-bar">
                <span style={{ width: `${Math.min(100, Math.abs(f.workDifferential) * 8)}%` }} />
              </div>
              {f.recomputeCostEstimate ? (
                <p style={{ marginBottom: 0 }}>{f.recomputeCostEstimate}</p>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
