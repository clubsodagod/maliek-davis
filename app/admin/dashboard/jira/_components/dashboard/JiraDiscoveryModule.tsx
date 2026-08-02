import Link from "next/link";
import { Alert, Button } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import type { DiscoveryResponse } from "../../_types";
import { JiraRouteShell } from "./JiraRouteShell";
import { JiraSetupRouteNav } from "./JiraSetupRouteNav";
import { JiraDiscoveryWorkspace } from "./JiraDiscoveryWorkspace";

type LoadedDiscoveryProps = {
  response: DiscoveryResponse;
  setupId?: never;
  errorMessage?: never;
};

type ErrorDiscoveryProps = {
  response?: never;
  setupId: string;
  errorMessage: string;
};

export type JiraDiscoveryModuleProps = LoadedDiscoveryProps | ErrorDiscoveryProps;

export function JiraDiscoveryModule(props: JiraDiscoveryModuleProps) {
  const setupId = props.response ? props.response.session.setupId : props.setupId;

  return (
    <JiraRouteShell
      title="Guided Discovery"
      description="Answer the project-discovery sections, review the normalized plan, then generate the Jira setup preview."
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
          <JiraSetupRouteNav setupId={setupId} activeRoute="discovery" />
        </>
      }
    >
      {"errorMessage" in props ? (
        <Alert severity="error" icon={false}>
          {props.errorMessage}
        </Alert>
      ) : (
        <JiraDiscoveryWorkspace initialResponse={props.response} />
      )}
    </JiraRouteShell>
  );
}
