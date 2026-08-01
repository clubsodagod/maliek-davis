import { notFound } from "next/navigation";
import { JiraSetupResultsModule } from "../../../_components/dashboard";
import { requireJiraDashboardAdmin } from "../../../_utils/requireJiraDashboardAdmin";
import { normalizeUnknownError } from "@/app/api/jira/_lib/errors";
import { createRequestId, logJiraFailure } from "@/app/api/jira/_lib/responses";
import {
  getJiraRun,
  getJiraRunReport,
  getJiraSetup,
} from "@/app/api/jira/_lib/service";

interface JiraResultsPageProps {
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

export default async function JiraResultsPage({
  params,
  searchParams,
}: JiraResultsPageProps) {
  const actor = await requireJiraDashboardAdmin();

  const { setupid } = await params;
  const { runId } = await searchParams;
  const initialRunId = getInitialRunId(runId);
  const requestId = createRequestId();

  try {
    const setup = await getJiraSetup(setupid, requestId, actor);

    if (!initialRunId) {
      return <JiraSetupResultsModule setup={setup} />;
    }

    try {
      const run = await getJiraRun(initialRunId, requestId, actor);

      if (run.setupId !== setupid) {
        return (
          <JiraSetupResultsModule
            setup={setup}
            runErrorMessage="The selected run does not belong to this setup."
          />
        );
      }

      try {
        const report = await getJiraRunReport(initialRunId, requestId, actor);

        return <JiraSetupResultsModule setup={setup} run={run} report={report} />;
      } catch (error) {
        logJiraFailure(error, requestId);
        const appError = normalizeUnknownError(error);

        return (
          <JiraSetupResultsModule
            setup={setup}
            run={run}
            runErrorMessage={appError.message}
          />
        );
      }
    } catch (error) {
      logJiraFailure(error, requestId);
      const appError = normalizeUnknownError(error);

      return (
        <JiraSetupResultsModule setup={setup} runErrorMessage={appError.message} />
      );
    }
  } catch (error) {
    logJiraFailure(error, requestId);

    const appError = normalizeUnknownError(error);
    if (appError.code === "NOT_FOUND") {
      notFound();
    }

    return (
      <JiraSetupResultsModule setupId={setupid} errorMessage={appError.message} />
    );
  }
}
