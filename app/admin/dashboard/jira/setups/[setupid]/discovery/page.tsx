import { notFound } from "next/navigation";
import { JiraDiscoveryModule } from "../../../_components/dashboard";
import { requireJiraDashboardAdmin } from "../../../_utils/requireJiraDashboardAdmin";
import { normalizeUnknownError } from "@/app/api/jira/_lib/errors";
import { createRequestId, logJiraFailure } from "@/app/api/jira/_lib/responses";
import { getJiraDiscovery, getJiraSetup } from "@/app/api/jira/_lib/service";

interface JiraDiscoveryPageProps {
  params: Promise<{
    setupid: string;
  }>;
}

export default async function JiraDiscoveryPage({ params }: JiraDiscoveryPageProps) {
  const actor = await requireJiraDashboardAdmin();
  const { setupid } = await params;
  const requestId = createRequestId();

  try {
    await getJiraSetup(setupid, requestId, actor);
    const response = await getJiraDiscovery(setupid, requestId, actor);
    return <JiraDiscoveryModule response={response} />;
  } catch (error) {
    logJiraFailure(error, requestId);
    const appError = normalizeUnknownError(error);
    if (appError.code === "NOT_FOUND") {
      notFound();
    }

    return <JiraDiscoveryModule setupId={setupid} errorMessage={appError.message} />;
  }
}
