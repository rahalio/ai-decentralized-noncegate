import { Link } from "react-router-dom";

export function AuditorHomePage() {
  return (
    <div className="stack">
      <div>
        <h1 className="page-title">Auditor evidence portal</h1>
        <p className="page-lede">
          Period packs of policy versions, verification results, and alert resolutions.
        </p>
      </div>
      <div className="panel">
        <p>
          Noncegate wordmark seals every evidence-bearing export so boards know whose
          independent check they are citing.
        </p>
        <Link className="btn btn-primary" to="/auditor/packs">
          Open audit packs
        </Link>
      </div>
    </div>
  );
}
