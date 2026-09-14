import { NavLink, Outlet } from "react-router-dom";

const ops = [
  { to: "/ops", label: "Honest tip", end: true },
  { to: "/ops/policies", label: "Difficulty policies" },
  { to: "/ops/verification", label: "Verification stream" },
  { to: "/ops/forks", label: "Fork reports" },
  { to: "/ops/alerts", label: "Alert queue" },
  { to: "/ops/webhooks", label: "Settlement webhooks" },
  { to: "/ops/feed", label: "Node feed health" },
  { to: "/ops/header-only", label: "Header-only mode" },
];

const compliance = [
  { to: "/compliance", label: "Approvals inbox", end: true },
  { to: "/compliance/drift", label: "Policy drift" },
];

const auditor = [
  { to: "/auditor", label: "Evidence portal", end: true },
  { to: "/auditor/packs", label: "Audit packs" },
];

function Group({
  title,
  items,
}: {
  title: string;
  items: Array<{ to: string; label: string; end?: boolean }>;
}) {
  return (
    <div className="nav-group">
      <div className="nav-label">{title}</div>
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
        >
          {item.label}
        </NavLink>
      ))}
    </div>
  );
}

export function AppShell() {
  return (
    <div className="shell">
      <aside className="shell-nav">
        <div className="brand">
          Noncegate
          <small>PoW assurance gatehouse</small>
        </div>
        <Group title="Operator" items={ops} />
        <Group title="Compliance" items={compliance} />
        <Group title="Auditor" items={auditor} />
        <div style={{ marginTop: "auto" }}>
          <NavLink
            to="/login"
            className="nav-link"
            onClick={() => localStorage.removeItem("noncegate_session")}
          >
            Sign out
          </NavLink>
        </div>
      </aside>
      <main className="shell-main">
        <Outlet />
      </main>
    </div>
  );
}
