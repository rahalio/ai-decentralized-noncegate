import { FormEvent, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getJson, postJson } from "@/lib/api";

type Policy = {
  id: string;
  version: number;
  difficulty: number;
  leadingZeroTarget?: number;
  status: string;
  effectiveAt: string;
  driftDetected?: boolean;
};

export function PoliciesPage() {
  const qc = useQueryClient();
  const [difficulty, setDifficulty] = useState("24");
  const [zeros, setZeros] = useState("4");
  const [effectiveAt, setEffectiveAt] = useState(
    new Date(Date.now() + 3600_000).toISOString().slice(0, 16),
  );

  const listQuery = useQuery({
    queryKey: ["policies"],
    queryFn: async () => {
      const data = await getJson<{ items: Policy[] }>("/v1/difficulty-policies");
      return data?.items ?? [];
    },
  });

  const createMut = useMutation({
    mutationFn: async () => {
      await postJson("/v1/difficulty-policies", {
        difficulty: Number(difficulty),
        leadingZeroTarget: Number(zeros),
        effectiveAt: new Date(effectiveAt).toISOString(),
      });
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["policies"] }),
  });

  function onPropose(e: FormEvent) {
    e.preventDefault();
    createMut.mutate();
  }

  return (
    <div className="stack">
      <div>
        <h1 className="page-title">Difficulty policies</h1>
        <p className="page-lede">
          Versioned targets with dual-control approval. Rollback is a new version only.
        </p>
      </div>

      <div className="grid-2">
        <form className="panel" onSubmit={onPropose}>
          <h2 style={{ marginTop: 0, fontFamily: "var(--font-display)", fontSize: "1.1rem" }}>
            Propose change
          </h2>
          <div className="field">
            <label htmlFor="diff">Difficulty</label>
            <input id="diff" className="mono" value={difficulty} onChange={(e) => setDifficulty(e.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="zeros">Leading zero target</label>
            <input id="zeros" className="mono" value={zeros} onChange={(e) => setZeros(e.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="eff">Effective at</label>
            <input
              id="eff"
              type="datetime-local"
              value={effectiveAt}
              onChange={(e) => setEffectiveAt(e.target.value)}
            />
          </div>
          <button className="btn btn-primary" type="submit" disabled={createMut.isPending}>
            Propose (awaits second identity)
          </button>
        </form>

        <div className="panel">
          <h2 style={{ marginTop: 0, fontFamily: "var(--font-display)", fontSize: "1.1rem" }}>
            Version timeline
          </h2>
          {(listQuery.data?.length ?? 0) === 0 ? (
            <p className="empty">No active policy — blocking for verification coverage.</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Version</th>
                  <th>Difficulty</th>
                  <th>Status</th>
                  <th>Effective</th>
                </tr>
              </thead>
              <tbody>
                {listQuery.data?.map((p) => (
                  <tr key={p.id}>
                    <td className="mono">v{p.version}</td>
                    <td className="mono">{p.difficulty}</td>
                    <td>
                      {p.driftDetected ? (
                        <span className="stamp-caution">drift</span>
                      ) : (
                        p.status
                      )}
                    </td>
                    <td className="mono" style={{ fontSize: "0.75rem" }}>
                      {p.effectiveAt}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
