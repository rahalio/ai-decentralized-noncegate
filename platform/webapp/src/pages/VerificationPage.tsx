import { useQuery } from "@tanstack/react-query";
import { getJson } from "@/lib/api";

type Result = {
  id: string;
  blockId: string;
  policyId: string;
  valid: boolean;
  verifyDurationMs: number;
  failureReason?: string;
  headerOnly?: boolean;
};

export function VerificationPage() {
  const query = useQuery({
    queryKey: ["verification-results"],
    queryFn: async () => {
      const data = await getJson<{ items: Result[] }>("/v1/verification-results");
      return data?.items ?? [];
    },
  });

  return (
    <div className="stack">
      <div>
        <h1 className="page-title">Verification stream</h1>
        <p className="page-lede">
          Append-only independent PoW checks — pass stamped, fails barred.
        </p>
      </div>
      <div className="panel">
        {(query.data?.length ?? 0) === 0 ? (
          <p className="empty">No results yet. Stream lag warning if ingest is behind tip.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Result</th>
                <th>Block</th>
                <th>Policy</th>
                <th>Latency</th>
                <th>Mode</th>
              </tr>
            </thead>
            <tbody>
              {query.data?.map((r) => (
                <tr key={r.id}>
                  <td>
                    {r.valid ? (
                      <span className="stamp-pass">Pass</span>
                    ) : (
                      <span className="stamp-bar">Barred</span>
                    )}
                  </td>
                  <td className="mono">{r.blockId}</td>
                  <td className="mono">{r.policyId}</td>
                  <td className="mono">{r.verifyDurationMs}ms</td>
                  <td>{r.headerOnly ? "header-only" : "full"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
