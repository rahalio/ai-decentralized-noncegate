import { FormEvent, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/services/shared/infrastructure/api-client";
import { getJson } from "@/lib/api";

type Settings = {
  enabled: boolean;
  requiredHeaderFields: string[];
  redactionNote?: string;
};

export function HeaderOnlyPage() {
  const qc = useQueryClient();
  const [enabled, setEnabled] = useState(true);

  const query = useQuery({
    queryKey: ["header-only"],
    queryFn: async () => {
      const data = await getJson<Settings>(
        "/v1/block-observations/header-only-settings",
      );
      if (data) setEnabled(data.enabled);
      return data;
    },
  });

  const save = useMutation({
    mutationFn: async () => {
      await apiClient.put("/v1/block-observations/header-only-settings", {
        body: {
          enabled,
          requiredHeaderFields: [
            "height",
            "blockHash",
            "parentHash",
            "nonce",
          ],
          redactionNote: "Bodies redacted; PoW verified on headers only.",
        },
      });
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["header-only"] }),
  });

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    save.mutate();
  }

  return (
    <div className="stack">
      <div>
        <h1 className="page-title">Header-only mode</h1>
        <p className="page-lede">
          Verify without ingesting confidential transaction bodies (BR-7).
        </p>
      </div>
      <form className="panel" onSubmit={onSubmit}>
        <label className="row">
          <input
            type="checkbox"
            checked={enabled}
            onChange={(e) => setEnabled(e.target.checked)}
          />
          Enable header-only verification
        </label>
        <p className="empty">
          Required fields: height, blockHash, parentHash, nonce
          {query.data?.redactionNote ? ` — ${query.data.redactionNote}` : ""}
        </p>
        <button className="btn btn-primary" type="submit">
          Save mode
        </button>
      </form>
    </div>
  );
}
