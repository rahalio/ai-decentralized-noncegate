import { FormEvent, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getJson, postJson } from "@/lib/api";

type Webhook = {
  id: string;
  name: string;
  endpointUrl: string;
  status: string;
  pauseOnFail: boolean;
  lastGatedTipHash?: string;
};

export function WebhooksPage() {
  const qc = useQueryClient();
  const [name, setName] = useState("settlement-clearing");
  const [url, setUrl] = useState("https://settlement.example.com/hooks/noncegate");

  const query = useQuery({
    queryKey: ["webhooks"],
    queryFn: async () => {
      const data = await getJson<{ items: Webhook[] }>("/v1/webhooks");
      return data?.items ?? [];
    },
  });

  const create = useMutation({
    mutationFn: async () => {
      await postJson("/v1/webhooks", {
        name,
        endpointUrl: url,
        pauseOnFail: true,
      });
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["webhooks"] }),
  });

  const pause = useMutation({
    mutationFn: async ({ id, paused }: { id: string; paused: boolean }) => {
      await postJson(`/v1/webhooks/${id}/pause`, { paused });
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["webhooks"] }),
  });

  function onCreate(e: FormEvent) {
    e.preventDefault();
    create.mutate();
  }

  return (
    <div className="stack">
      <div>
        <h1 className="page-title">Settlement webhook board</h1>
        <p className="page-lede">
          Gate downstream settlement consumers when verification fails (BR-12).
        </p>
      </div>

      <form className="panel" onSubmit={onCreate}>
        <div className="grid-2">
          <div className="field">
            <label htmlFor="name">Consumer name</label>
            <input id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="url">Endpoint URL</label>
            <input id="url" className="mono" value={url} onChange={(e) => setUrl(e.target.value)} />
          </div>
        </div>
        <button className="btn btn-primary" type="submit">
          Register webhook
        </button>
      </form>

      <div className="panel">
        {(query.data?.length ?? 0) === 0 ? (
          <p className="empty">No consumers — register a settlement endpoint.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Pause on fail</th>
                <th>Last gated tip</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {query.data?.map((w) => (
                <tr key={w.id}>
                  <td>{w.name}</td>
                  <td>{w.status}</td>
                  <td>{w.pauseOnFail ? "yes" : "no"}</td>
                  <td className="mono">{w.lastGatedTipHash ?? "—"}</td>
                  <td>
                    <button
                      className="btn"
                      type="button"
                      onClick={() =>
                        pause.mutate({ id: w.id, paused: w.status !== "paused" })
                      }
                    >
                      {w.status === "paused" ? "Resume" : "Pause"}
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
