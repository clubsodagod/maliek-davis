import { runProtectedJiraRoute } from "../../_lib/route-helpers";
import {
  JIRA_DASHBOARD_READ_TIMEOUT_MS,
  listJiraProjectSummaries,
} from "../../_lib/service";

export async function GET() {
  return runProtectedJiraRoute("read", (actor, requestId) =>
    listJiraProjectSummaries(requestId, actor, undefined, {
      retrySafe: false,
      timeoutMs: JIRA_DASHBOARD_READ_TIMEOUT_MS,
    }),
  );
}
