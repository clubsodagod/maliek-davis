import Link from "next/link";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { JiraDashboardDataSections } from "./JiraDashboardDataSections";
import { JiraRouteShell } from "./JiraRouteShell";

export function JiraDashboardShell() {
  return (
    <JiraRouteShell
      title="Jira Setup Studio"
      description="A protected admin workspace for creating, validating, previewing, executing, reviewing, and working Jira projects."
      statusLabel="V1 scaffold"
      actions={
        <Button
          component={Link}
          href="/admin/dashboard/jira/configure"
          variant="contained"
          startIcon={<Add aria-hidden="true" />}
        >
          Configure space
        </Button>
      }
    >
      <JiraDashboardDataSections />
    </JiraRouteShell>
  );
}
