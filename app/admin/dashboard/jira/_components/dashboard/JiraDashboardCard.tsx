import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowForward } from "@mui/icons-material";
import { Button, Chip, Paper, Stack, Typography } from "@mui/material";
import { jiraClassNames } from "../../_theme";

export interface JiraDashboardCardProps {
  title: string;
  description: string;
  href?: string;
  actionLabel?: string;
  statusLabel?: string;
  children?: ReactNode;
}

export function JiraDashboardCard({
  title,
  description,
  href,
  actionLabel,
  statusLabel,
  children,
}: JiraDashboardCardProps) {
  return (
    <Paper
      component="article"
      className={jiraClassNames.panel}
      sx={{
        height: "100%",
        minHeight: 220,
        p: 3,
      }}
    >
      <Stack spacing={2.5} height="100%" justifyContent="space-between">
        <Stack spacing={1.5}>
          {statusLabel ? (
            <Chip
              label={statusLabel}
              size="small"
              sx={{ alignSelf: "flex-start" }}
              variant="outlined"
            />
          ) : null}
          <Typography component="h2" variant="h4" sx={{ lineHeight: 1.05 }}>
            {title}
          </Typography>
          <Typography variant="body2">
            {description}
          </Typography>
          {children}
        </Stack>

        {actionLabel ? (
          href ? (
            <Button
              component={Link}
              href={href}
              variant="contained"
              endIcon={<ArrowForward aria-hidden="true" />}
              sx={{ alignSelf: "flex-start" }}
            >
              {actionLabel}
            </Button>
          ) : (
            <Button disabled variant="outlined" sx={{ alignSelf: "flex-start" }}>
              {actionLabel}
            </Button>
          )
        ) : null}
      </Stack>
    </Paper>
  );
}
