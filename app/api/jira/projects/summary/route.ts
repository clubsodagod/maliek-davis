import { runProtectedJiraRoute } from "../../_lib/route-helpers";
import { listJiraProjectSummaries } from "../../_lib/service";

export async function GET() {
  return runProtectedJiraRoute("read", (actor, requestId) =>
    listJiraProjectSummaries(requestId, actor),
  );
}
