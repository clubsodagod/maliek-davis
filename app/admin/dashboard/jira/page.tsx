import { JiraDashboardModule } from "./_components/dashboard";
import { requireJiraDashboardAdmin } from "./_utils/requireJiraDashboardAdmin";
import { normalizeUnknownError } from "@/app/api/jira/_lib/errors";
import { createRequestId, logJiraFailure } from "@/app/api/jira/_lib/responses";
import {
  listJiraProjectSummaries,
  listJiraSetups,
} from "@/app/api/jira/_lib/service";
import type { JiraProjectSummaryList, JiraSetupList } from "./_types";

export default async function JiraTopLevelPage() {
  const actor = await requireJiraDashboardAdmin();
  const requestId = createRequestId();
  let availableProjects: JiraProjectSummaryList = [];
  let availableProjectsError: string | undefined;
  let setups: JiraSetupList = [];
  let registryError: string | undefined;

  try {
    availableProjects = await listJiraProjectSummaries(requestId, actor);
  } catch (error) {
    logJiraFailure(error, requestId);
    availableProjectsError = normalizeUnknownError(error).message;
  }

  try {
    setups = await listJiraSetups(requestId, actor);
  } catch (error) {
    logJiraFailure(error, requestId);
    registryError = normalizeUnknownError(error).message;
  }

  return (
    <JiraDashboardModule
      setups={setups}
      registryError={registryError}
      availableProjects={availableProjects}
      availableProjectsError={availableProjectsError}
    />
  );
}
