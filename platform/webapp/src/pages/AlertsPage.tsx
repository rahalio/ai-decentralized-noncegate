import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getJson, postJson } from "@/lib/api";

type Alert = {
  id: string;
  alertType: string;
  severity: string;
  status: string;
  message: string;
};

export function AlertsPage() {
  const qc = useQueryClient();
  const query = useQuery({
    queryKey: ["alerts"],
    queryFn: async () => {
      const data = await getJson<{ items: Alert[] }>("/v1/alerts");
      return data?.items ?? [];
    },
  });

  const ack = useMutation({
    mutationFn: (id: string) => postJson(`/v1/alerts/${id}/ack`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["alerts"] }),
  });

  return (
    <div className="stack">
      <div>
        <h1 className="page-title">Alert queue</h1>
        <p className="page-lede">
          Invalid nonce, policy drift, hash-rate cliffs, and fork detections.
        </p>
      </div>
      <div className="panel">
        {(query.data?.length ?? 0) === 0 ? (
          <p className="empty">Integrity healthy — no open anomalies.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Severity</th>
                <th>Type</th>
                <th>Status</th>
                <th>Message</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {query.data?.map((a) => (
                <tr key={a.id}>
                  <td className="stamp-caution">{a.severity}</td>
                  <td className="mono">{a.alertType}</td>
                  <td>{a.status}</td>
                  <td>{a.message}</td>
                  <td>
                    <button className="btn" type="button" onClick={() => ack.mutate(a.id)}>
                      Ack
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
