import React from "react";
import { Box, Chip, Container, Paper, Stack, Typography } from "@mui/material";

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
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        px: { xs: 2, md: 4 },
        py: { xs: 12, md: 14 },
        background:
          "radial-gradient(circle at 84% 8%, rgba(143, 17, 204, 0.2), transparent 34%), linear-gradient(135deg, #080910 0%, #161722 48%, #0c0d14 100%)",
        color: "#f8f7ff",
      }}
    >
      <Container maxWidth="xl" disableGutters>
        <Paper
          elevation={0}
          sx={{
            overflow: "hidden",
            borderRadius: 3,
            border: "1px solid rgba(255, 255, 255, 0.1)",
            backgroundColor: "rgba(14, 15, 24, 0.86)",
            color: "inherit",
            boxShadow: "0 24px 80px rgba(0, 0, 0, 0.36)",
          }}
        >
          <Stack spacing={{ xs: 4, md: 5 }} sx={{ p: { xs: 3, md: 5 } }}>
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
                    sx={{
                      color: "#f8f7ff",
                      border: "1px solid rgba(255, 255, 255, 0.16)",
                      backgroundColor: "rgba(255, 255, 255, 0.08)",
                    }}
                  />
                  {statusLabel ? (
                    <Chip
                      label={statusLabel}
                      size="small"
                      color="primary"
                      sx={{ color: "#081018", fontWeight: 700 }}
                    />
                  ) : null}
                </Stack>
                <Typography component="h1" variant="h2" sx={{ lineHeight: 1 }}>
                  {title}
                </Typography>
                <Typography
                  component="p"
                  variant="body1"
                  sx={{ color: "rgba(248, 247, 255, 0.72)", maxWidth: 680 }}
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
  );
}
