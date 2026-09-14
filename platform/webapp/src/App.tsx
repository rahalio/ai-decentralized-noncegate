import type { ReactNode } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "@/components/AppShell";
import { LoginPage } from "@/pages/LoginPage";
import { OperatorHomePage } from "@/pages/OperatorHomePage";
import { PoliciesPage } from "@/pages/PoliciesPage";
import { VerificationPage } from "@/pages/VerificationPage";
import { ForksPage } from "@/pages/ForksPage";
import { AlertsPage } from "@/pages/AlertsPage";
import { WebhooksPage } from "@/pages/WebhooksPage";
import { FeedHealthPage } from "@/pages/FeedHealthPage";
import { HeaderOnlyPage } from "@/pages/HeaderOnlyPage";
import { ApprovalsPage } from "@/pages/ApprovalsPage";
import { DriftPage } from "@/pages/DriftPage";
import { AuditorHomePage } from "@/pages/AuditorHomePage";
import { AuditPacksPage } from "@/pages/AuditPacksPage";

function RequireSession({ children }: { children: ReactNode }) {
  const ok =
    typeof window !== "undefined" && localStorage.getItem("noncegate_session");
  if (!ok) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <RequireSession>
            <AppShell />
          </RequireSession>
        }
      >
        <Route index element={<Navigate to="/ops" replace />} />
        <Route path="ops" element={<OperatorHomePage />} />
        <Route path="ops/policies" element={<PoliciesPage />} />
        <Route path="ops/verification" element={<VerificationPage />} />
        <Route path="ops/forks" element={<ForksPage />} />
        <Route path="ops/alerts" element={<AlertsPage />} />
        <Route path="ops/webhooks" element={<WebhooksPage />} />
        <Route path="ops/feed" element={<FeedHealthPage />} />
        <Route path="ops/header-only" element={<HeaderOnlyPage />} />
        <Route path="compliance" element={<ApprovalsPage />} />
        <Route path="compliance/drift" element={<DriftPage />} />
        <Route path="auditor" element={<AuditorHomePage />} />
        <Route path="auditor/packs" element={<AuditPacksPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
