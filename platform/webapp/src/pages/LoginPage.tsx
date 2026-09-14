import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("ops@noncegate.local");
  const [password, setPassword] = useState("sandbox-ops");
  const [error, setError] = useState<string | null>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!email || !password) {
      setError("Email and password required");
      return;
    }
    localStorage.setItem("noncegate_session", "1");
    localStorage.setItem("noncegate_role", "ops");
    navigate("/ops");
  }

  return (
    <div className="login-wrap">
      <div className="login-panel panel">
        <div className="brand">Noncegate</div>
        <h1>Hard to mine. Easy to check.</h1>
        <form onSubmit={onSubmit}>
          <div className="field" style={{ textAlign: "left" }}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
            />
          </div>
          <div className="field" style={{ textAlign: "left" }}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>
          {error ? (
            <p style={{ color: "var(--color-bar)", fontSize: "0.85rem" }}>{error}</p>
          ) : null}
          <button className="btn btn-primary" type="submit" style={{ width: "100%" }}>
            Enter gatehouse
          </button>
        </form>
        <p style={{ color: "var(--color-mute)", fontSize: "0.75rem", marginTop: "1rem" }}>
          Demo uses API-key auth under the hood. Operator session unlocks the shell.
        </p>
      </div>
    </div>
  );
}
