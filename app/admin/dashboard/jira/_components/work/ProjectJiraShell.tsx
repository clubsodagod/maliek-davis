import Link from "next/link";
import type { ReactNode } from "react";
import { Button, Stack } from "@mui/material";
import { ArrowBack, Dashboard, FormatListBulleted } from "@mui/icons-material";
import { JiraRouteShell } from "../dashboard/JiraRouteShell";
import { projectJiraPath, projectWorkPath } from "../../_utils/workRouting";

export interface ProjectJiraShellProps {
  projectKey: string;
  title: string;
  description: string;
  statusLabel?: string;
  children: ReactNode;
}

export function ProjectJiraShell({
  projectKey,
  title,
  description,
  statusLabel,
  children,
}: ProjectJiraShellProps) {
  return (
    <JiraRouteShell
      title={title}
      description={description}
      eyebrow={`Jira ${projectKey}`}
      statusLabel={statusLabel}
      actions={
        <Stack direction="row" spacing={1.25} flexWrap="wrap" useFlexGap>
          <Button
            component={Link}
            href="/admin/dashboard/jira"
            variant="outlined"
            startIcon={<ArrowBack aria-hidden="true" />}
          >
            Jira hub
          </Button>
          <Button
            component={Link}
            href={projectJiraPath(projectKey)}
            variant="outlined"
            startIcon={<Dashboard aria-hidden="true" />}
          >
            Summary
          </Button>
          <Button
            component={Link}
            href={projectWorkPath(projectKey)}
            variant="contained"
            startIcon={<FormatListBulleted aria-hidden="true" />}
          >
            Work
          </Button>
        </Stack>
      }
    >
      {children}
    </JiraRouteShell>
  );
}
