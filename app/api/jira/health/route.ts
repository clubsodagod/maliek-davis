import { getJiraAutomationHealth } from "../_lib/service";
import { runProtectedJiraRoute } from "../_lib/route-helpers";

export const dynamic = "force-dynamic";

export async function GET() {
  return runProtectedJiraRoute("read", (actor, requestId) =>
    getJiraAutomationHealth(requestId, actor),
  );
}
