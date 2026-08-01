import { JiraSetupPreviewModule } from "../../../_components/dashboard";
import { requireJiraDashboardAdmin } from "../../../_utils/requireJiraDashboardAdmin";
import { notFound } from "next/navigation";
import { normalizeUnknownError } from "@/app/api/jira/_lib/errors";
import { createRequestId, logJiraFailure } from "@/app/api/jira/_lib/responses";
import { getJiraSetup } from "@/app/api/jira/_lib/service";

interface JiraPreviewPageProps {
  params: Promise<{
    setupid: string;
  }>;
}

export default async function JiraPreviewPage({ params }: JiraPreviewPageProps) {
  const actor = await requireJiraDashboardAdmin();

  const { setupid } = await params;
  const requestId = createRequestId();

  try {
    const setup = await getJiraSetup(setupid, requestId, actor);

    return <JiraSetupPreviewModule setup={setup} />;
  } catch (error) {
    logJiraFailure(error, requestId);

    const appError = normalizeUnknownError(error);
    if (appError.code === "NOT_FOUND") {
      notFound();
    }

    return (
      <JiraSetupPreviewModule setupId={setupid} errorMessage={appError.message} />
    );
  }
}
