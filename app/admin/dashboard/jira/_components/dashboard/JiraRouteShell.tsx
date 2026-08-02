import React from "react";
import { Box, Chip, Container, Paper, Stack, Typography } from "@mui/material";
import { JiraThemeProvider, jiraClassNames } from "../../_theme";

export interface JiraRouteShellProps {
  title: string;
  description: string;
  eyebrow?: string;
  statusLabel?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}

export function JiraRouteShell({
  title,
  description,
  eyebrow = "Jira Setup Studio",
  statusLabel,
  actions,
  children,
}: JiraRouteShellProps) {
  return (
    <JiraThemeProvider>
      <Box
        component="main"
        className={jiraClassNames.root}
        sx={{
          px: { xs: 2, md: 4 },
          py: { xs: 12, md: 14 },
        }}
      >
        <Container maxWidth="xl" disableGutters>
          <Paper className={jiraClassNames.shell}>
            <Stack
              className={jiraClassNames.shellContent}
              spacing={{ xs: 4, md: 5 }}
            >
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={3}
              justifyContent="space-between"
              alignItems={{ xs: "flex-start", md: "flex-end" }}
            >
              <Stack spacing={1.5} maxWidth={760}>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  <Chip
                    label={eyebrow}
                    size="small"
                    variant="outlined"
                  />
                  {statusLabel ? (
                    <Chip
                      label={statusLabel}
                      size="small"
                    />
                  ) : null}
                </Stack>
                <Typography component="h1" variant="h2" sx={{ lineHeight: 1 }}>
                  {title}
                </Typography>
                <Typography
                  component="p"
                  variant="body1"
                  sx={{ maxWidth: 680 }}
                >
                  {description}
                </Typography>
              </Stack>
              {actions ? (
                <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap>
                  {actions}
                </Stack>
              ) : null}
            </Stack>

            {children}
          </Stack>
        </Paper>
      </Container>
    </Box>
    </JiraThemeProvider>
  );
}
