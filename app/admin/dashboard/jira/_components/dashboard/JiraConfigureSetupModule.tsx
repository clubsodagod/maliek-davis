import Link from "next/link";
import { Button } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { JiraHybridSetupBuilder } from "./JiraHybridSetupBuilder";
import { JiraRouteShell } from "./JiraRouteShell";
import type {
  JiraAutomationReadiness,
  JiraProjectSummary,
} from "../../_utils/setupBuilder";

export type JiraConfigureSetupModuleProps = {
  projectSummaries?: JiraProjectSummary[];
  automationReadiness?: JiraAutomationReadiness;
};

export function JiraConfigureSetupModule({
  projectSummaries = [],
  automationReadiness = { status: "unavailable", message: "Jira automation is unavailable." },
}: JiraConfigureSetupModuleProps) {
  return (
    <JiraRouteShell
      title="Configure Jira Space"
      description="Create a new Jira space through a focused setup flow with staged imports, automatic validation, and autosave."
      statusLabel="Decision tree"
      actions={
        <Button
          component={Link}
          href="/admin/dashboard/jira"
          variant="outlined"
          startIcon={<ArrowBack aria-hidden="true" />}
        >
          Jira hub
        </Button>
      }
    >
      <JiraHybridSetupBuilder
        projectSummaries={projectSummaries}
        automationReadiness={automationReadiness}
      />
    </JiraRouteShell>
  );
}
