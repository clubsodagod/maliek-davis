import { JiraConfigureSetupModule } from "../_components/dashboard";
import type { JiraAutomationReadiness } from "../_utils/setupBuilder";
import { requireJiraAdmin } from "@/app/api/jira/_lib/auth";
import { normalizeUnknownError } from "@/app/api/jira/_lib/errors";
import { createRequestId, logJiraFailure } from "@/app/api/jira/_lib/responses";
import { getJiraAutomationHealth } from "@/app/api/jira/_lib/service";

async function getJiraReadiness(): Promise<JiraAutomationReadiness> {
  const requestId = createRequestId();

  try {
    const actor = await requireJiraAdmin();
    await getJiraAutomationHealth(requestId, actor);
    return {
      status: "ready",
    };
  } catch (error) {
    logJiraFailure(error, requestId);
    return {
      status: "unavailable",
      message: normalizeUnknownError(error).message,
    };
  }
}

export default async function ConfigureJiraEntityPage() {
  const readiness = await getJiraReadiness();

  return (
    <JiraConfigureSetupModule
      projectSummaries={[]}
      automationReadiness={readiness}
    />
  );
}
