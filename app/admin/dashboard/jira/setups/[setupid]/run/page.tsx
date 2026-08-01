import { notFound } from "next/navigation";
import { JiraSetupRunModule } from "../../../_components/dashboard";
import { requireJiraDashboardAdmin } from "../../../_utils/requireJiraDashboardAdmin";
import { normalizeUnknownError } from "@/app/api/jira/_lib/errors";
import { createRequestId, logJiraFailure } from "@/app/api/jira/_lib/responses";
import { getJiraSetup } from "@/app/api/jira/_lib/service";

interface JiraRunPageProps {
  params: Promise<{
    setupid: string;
  }>;
  searchParams: Promise<{
    runId?: string | string[];
  }>;
}

function getInitialRunId(
  runId: string | string[] | undefined,
): string | undefined {
  if (Array.isArray(runId)) return runId[0];
  return runId;
}

export default async function JiraRunPage({
  params,
  searchParams,
}: JiraRunPageProps) {
  const actor = await requireJiraDashboardAdmin();
  const { setupid } = await params;
  const { runId } = await searchParams;
  const initialRunId = getInitialRunId(runId);
  const requestId = createRequestId();

  try {
    const setup = await getJiraSetup(setupid, requestId, actor);

    return <JiraSetupRunModule setup={setup} initialRunId={initialRunId} />;
  } catch (error) {
    logJiraFailure(error, requestId);

    const appError = normalizeUnknownError(error);
    if (appError.code === "NOT_FOUND") {
      notFound();
    }

    return (
      <JiraSetupRunModule
        setupId={setupid}
        errorMessage={appError.message}
        initialRunId={initialRunId}
      />
    );
  }
}
