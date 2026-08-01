import Link from "next/link";
import { Alert, Button } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import type { JiraSetupRecord } from "../../_types";
import { JiraRouteShell } from "./JiraRouteShell";
import { JiraSetupRouteNav } from "./JiraSetupRouteNav";
import { JiraSetupRunClient } from "./JiraSetupRunClient";

type LoadedRunProps = {
  setup: JiraSetupRecord;
  initialRunId?: string;
  setupId?: never;
  errorMessage?: never;
};

type ErrorRunProps = {
  setup?: never;
  setupId: string;
  errorMessage: string;
  initialRunId?: string;
};

export type JiraSetupRunModuleProps = LoadedRunProps | ErrorRunProps;

export function JiraSetupRunModule(props: JiraSetupRunModuleProps) {
  const setupId = props.setup ? props.setup.id : props.setupId;

  return (
    <JiraRouteShell
      title="Setup Run"
      description="Start and monitor execution for a confirmed setup."
      statusLabel={`Setup ${setupId}`}
      actions={
        <>
          <Button
            component={Link}
            href="/admin/dashboard/jira"
            variant="outlined"
            startIcon={<ArrowBack aria-hidden="true" />}
          >
            Jira hub
          </Button>
          <JiraSetupRouteNav setupId={setupId} activeRoute="run" />
        </>
      }
    >
      {"errorMessage" in props ? (
        <Alert severity="error" icon={false}>
          {props.errorMessage}
        </Alert>
      ) : (
        <JiraSetupRunClient
          setup={props.setup}
          initialRunId={props.initialRunId}
        />
      )}
    </JiraRouteShell>
  );
}
