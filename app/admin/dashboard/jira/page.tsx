import { JiraDashboardModule } from "./_components/dashboard";
import { requireJiraDashboardAdmin } from "./_utils/requireJiraDashboardAdmin";
import { normalizeUnknownError } from "@/app/api/jira/_lib/errors";
import { createRequestId, logJiraFailure } from "@/app/api/jira/_lib/responses";
import { listJiraSetups } from "@/app/api/jira/_lib/service";
import type { JiraSetupList } from "./_types";

export default async function JiraTopLevelPage() {
  const actor = await requireJiraDashboardAdmin();
  const requestId = createRequestId();

  try {
    const setups = await listJiraSetups(requestId, actor);

    return <JiraDashboardModule setups={setups} />;
  } catch (error) {
    logJiraFailure(error, requestId);

    const setups: JiraSetupList = [];
    return (
      <JiraDashboardModule
        setups={setups}
        registryError={normalizeUnknownError(error).message}
      />
    );
  }
}
