import { FormEvent, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getJson, postJson } from "@/lib/api";

type Pack = {
  id: string;
  periodStart: string;
  periodEnd: string;
  status: string;
  contentHash?: string;
  downloadUri?: string;
  coveragePct?: number;
  retentionWarning?: boolean;
};

export function AuditPacksPage() {
  const qc = useQueryClient();
  const [start, setStart] = useState(
    new Date(Date.now() - 7 * 86400_000).toISOString().slice(0, 16),
  );
  const [end, setEnd] = useState(new Date().toISOString().slice(0, 16));

  const query = useQuery({
    queryKey: ["audit-packs"],
    queryFn: async () => {
      const data = await getJson<{ items: Pack[] }>("/v1/audit-packs");
      return data?.items ?? [];
    },
  });

  const create = useMutation({
    mutationFn: async () => {
      await postJson("/v1/audit-packs", {
        periodStart: new Date(start).toISOString(),
        periodEnd: new Date(end).toISOString(),
      });
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["audit-packs"] }),
  });

  function onGenerate(e: FormEvent) {
    e.preventDefault();
    create.mutate();
  }

  return (
    <div className="stack">
      <div>
        <h1 className="page-title">Audit packs</h1>
        <p className="page-lede">
          Generate period evidence with content-hash attestation (BR-6, BR-11).
        </p>
      </div>

      <form className="panel" onSubmit={onGenerate}>
        <div className="grid-2">
          <div className="field">
            <label htmlFor="start">Period start</label>
            <input
              id="start"
              type="datetime-local"
              value={start}
              onChange={(e) => setStart(e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="end">Period end</label>
            <input
              id="end"
              type="datetime-local"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
            />
          </div>
        </div>
        <button className="btn btn-primary" type="submit">
          Generate pack
        </button>
      </form>

      <div className="panel">
        {(query.data?.length ?? 0) === 0 ? (
          <p className="empty">Empty period — no observations in window.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Status</th>
                <th>Coverage</th>
                <th>Content hash</th>
                <th>Retention</th>
              </tr>
            </thead>
            <tbody>
              {query.data?.map((p) => (
                <tr key={p.id}>
                  <td>{p.status}</td>
                  <td className="mono">
                    {p.coveragePct != null ? `${p.coveragePct}%` : "—"}
                  </td>
                  <td className="mono" style={{ fontSize: "0.75rem" }}>
                    {p.contentHash ?? "—"}
                  </td>
                  <td>
                    {p.retentionWarning ? (
                      <span className="stamp-caution">near window edge</span>
                    ) : (
                      "ok"
                    )}
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
