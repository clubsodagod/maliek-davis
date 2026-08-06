import { runProtectedJiraRoute } from "../../_lib/route-helpers";
import { listJiraSetupSummaries } from "../../_lib/service";

export const dynamic = "force-dynamic";

export async function GET() {
  return runProtectedJiraRoute("read", async (actor, requestId) => {
    return listJiraSetupSummaries(requestId, actor);
  });
}
