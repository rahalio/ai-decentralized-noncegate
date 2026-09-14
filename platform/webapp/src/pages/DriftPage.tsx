import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getJson } from "@/lib/api";

type Policy = {
  id: string;
  version: number;
  status: string;
  driftDetected?: boolean;
  liveNetworkDifficulty?: number;
  difficulty: number;
};

type Alert = {
  id: string;
  alertType: string;
  message: string;
  status: string;
};

export function DriftPage() {
  const policies = useQuery({
    queryKey: ["policies-drift"],
    queryFn: async () => {
      const data = await getJson<{ items: Policy[] }>("/v1/difficulty-policies");
      return (data?.items ?? []).filter((p) => p.driftDetected);
    },
  });

  const alerts = useQuery({
    queryKey: ["alerts-drift"],
    queryFn: async () => {
      const data = await getJson<{ items: Alert[] }>("/v1/alerts");
      return (data?.items ?? []).filter((a) => a.alertType === "policyDrift");
    },
  });

  return (
    <div className="stack">
      <div>
        <h1 className="page-title">Policy drift</h1>
        <p className="page-lede">
          Live network difficulty diverging from the approved active version.
        </p>
      </div>
      <div className="panel">
        {(policies.data?.length ?? 0) === 0 && (alerts.data?.length ?? 0) === 0 ? (
          <p className="empty">No drift detected against approved policy.</p>
        ) : (
          <>
            {policies.data?.map((p) => (
              <p key={p.id}>
                <span className="stamp-caution">Drift</span>{" "}
                <span className="mono">
                  policy v{p.version} target {p.difficulty} vs live{" "}
                  {p.liveNetworkDifficulty ?? "?"}
                </span>
              </p>
            ))}
            {alerts.data?.map((a) => (
              <p key={a.id}>
                Alert {a.status}: {a.message}
              </p>
            ))}
          </>
        )}
        <Link className="btn" to="/compliance">
          Open dual-control queue
        </Link>
      </div>
    </div>
  );
}
