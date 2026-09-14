import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getJson, postJson } from "@/lib/api";

type Policy = {
  id: string;
  version: number;
  difficulty: number;
  status: string;
  effectiveAt: string;
  proposedByUserId?: string;
};

export function ApprovalsPage() {
  const qc = useQueryClient();
  const query = useQuery({
    queryKey: ["policies-pending"],
    queryFn: async () => {
      const data = await getJson<{ items: Policy[] }>(
        "/v1/difficulty-policies?status=pendingApproval",
      );
      const items = data?.items ?? [];
      return items.filter((p) =>
        ["draft", "pendingApproval"].includes(p.status),
      );
    },
  });

  const decide = useMutation({
    mutationFn: async ({
      id,
      decision,
    }: {
      id: string;
      decision: "approve" | "reject";
    }) => {
      await postJson(`/v1/difficulty-policies/${id}/approve`, {
        decision,
        reason: decision === "reject" ? "Denied by second identity" : undefined,
      });
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["policies-pending"] }),
  });

  return (
    <div className="stack">
      <div>
        <h1 className="page-title">Dual-control approvals</h1>
        <p className="page-lede">
          Second-identity queue for difficulty proposals (BR-1, BR-8).
        </p>
      </div>
      <div className="panel">
        {(query.data?.length ?? 0) === 0 ? (
          <p className="empty">No pending policy changes.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Version</th>
                <th>Difficulty</th>
                <th>Effective</th>
                <th>Proposer</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {query.data?.map((p) => (
                <tr key={p.id}>
                  <td className="mono">v{p.version}</td>
                  <td className="mono">{p.difficulty}</td>
                  <td className="mono" style={{ fontSize: "0.75rem" }}>
                    {p.effectiveAt}
                  </td>
                  <td className="mono">{p.proposedByUserId ?? "—"}</td>
                  <td className="row">
                    <button
                      className="btn btn-primary"
                      type="button"
                      onClick={() => decide.mutate({ id: p.id, decision: "approve" })}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-danger"
                      type="button"
                      onClick={() => decide.mutate({ id: p.id, decision: "reject" })}
                    >
                      Deny
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
