import { createTheme, type Theme } from "@mui/material/styles";

export const jiraClassNames = {
  root: "jira-setup-studio",
  shell: "jira-setup-studio__shell",
  shellContent: "jira-setup-studio__shell-content",
  panel: "jira-setup-studio__panel",
  panelCompact: "jira-setup-studio__panel-compact",
  interactivePanel: "jira-setup-studio__interactive-panel",
  emptyState: "jira-setup-studio__empty-state",
  metricTile: "jira-setup-studio__metric-tile",
  choiceCard: "jira-setup-studio__choice-card",
  choiceCardSelected: "jira-setup-studio__choice-card-selected",
  accordion: "jira-setup-studio__accordion",
  dropZone: "jira-setup-studio__drop-zone",
  jsonPreview: "jira-setup-studio__json-preview",
  hierarchyBranch: "jira-setup-studio__hierarchy-branch",
  clippedText: "jira-setup-studio__clipped-text",
  progressDense: "jira-setup-studio__progress-dense",
  progressRoomy: "jira-setup-studio__progress-roomy",
  progressTall: "jira-setup-studio__progress-tall",
} as const;

export function createJiraTheme(baseTheme: Theme): Theme {
  return createTheme(baseTheme, {
    components: {
      MuiPaper: {
        defaultProps: {
          elevation: 0,
        },
      },
      MuiAccordion: {
        defaultProps: {
          disableGutters: true,
          elevation: 0,
        },
        styleOverrides: {
          root: {
            "&::before": {
              display: "none",
            },
          },
        },
      },
      MuiButtonBase: {
        styleOverrides: {
          root: {
            "&:focus-visible": {
              outline: "2px solid currentColor",
              outlineOffset: 2,
            },
          },
        },
      },
      MuiLinearProgress: {
        styleOverrides: {
          root: {
            borderRadius: baseTheme.shape.borderRadius,
          },
        },
      },
    },
  });
}

export function getJiraGlobalStyles(theme: Theme) {
  const border = `1px solid ${theme.palette.divider}`;
  const dashedBorder = `1px dashed ${theme.palette.divider}`;

  return {
    [`.${jiraClassNames.root}`]: {
      minHeight: "100vh",
    },
    [`.${jiraClassNames.shell}`]: {
      overflow: "hidden",
      border,
      borderRadius: theme.shape.borderRadius * 3,
    },
    [`.${jiraClassNames.shellContent}`]: {
      padding: theme.spacing(3),
      [theme.breakpoints.up("md")]: {
        padding: theme.spacing(5),
      },
    },
    [`.${jiraClassNames.panel}`]: {
      border,
      borderRadius: theme.shape.borderRadius * 2,
    },
    [`.${jiraClassNames.panelCompact}`]: {
      border,
      borderRadius: theme.shape.borderRadius,
    },
    [`.${jiraClassNames.interactivePanel}`]: {
      border,
      borderRadius: theme.shape.borderRadius,
      color: "inherit",
      display: "block",
      textDecoration: "none",
      transition: theme.transitions.create(["transform", "border-color"], {
        duration: theme.transitions.duration.shorter,
      }),
    },
    [`.${jiraClassNames.interactivePanel}:hover`]: {
      transform: "translateY(-1px)",
    },
    [`.${jiraClassNames.interactivePanel}:focus-visible`]: {
      outline: "2px solid currentColor",
      outlineOffset: 2,
    },
    [`.${jiraClassNames.emptyState}`]: {
      border: dashedBorder,
      borderRadius: theme.shape.borderRadius,
    },
    [`.${jiraClassNames.metricTile}`]: {
      border,
      borderRadius: theme.shape.borderRadius,
      minHeight: 128,
    },
    [`.${jiraClassNames.choiceCard}`]: {
      alignItems: "stretch",
      border,
      borderRadius: theme.shape.borderRadius,
      color: "inherit",
      justifyContent: "flex-start",
      textAlign: "left",
      transition: theme.transitions.create("border-color", {
        duration: theme.transitions.duration.shorter,
      }),
      width: "100%",
    },
    [`.${jiraClassNames.choiceCardSelected}`]: {
      outline: "2px solid currentColor",
      outlineOffset: 2,
    },
    [`.${jiraClassNames.accordion}`]: {
      border,
      borderRadius: theme.shape.borderRadius,
    },
    [`.${jiraClassNames.dropZone}`]: {
      border: dashedBorder,
      display: "grid",
      minHeight: 156,
      placeItems: "center",
      textAlign: "center",
    },
    [`.${jiraClassNames.jsonPreview}`]: {
      border,
      borderRadius: theme.shape.borderRadius,
      fontFamily:
        'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
      fontSize: "0.8125rem",
      lineHeight: 1.55,
      margin: 0,
      maxHeight: 320,
      overflow: "auto",
      padding: theme.spacing(2),
      whiteSpace: "pre-wrap",
      wordBreak: "break-word",
    },
    [`.${jiraClassNames.hierarchyBranch}`]: {
      borderLeft: `3px solid ${theme.palette.divider}`,
    },
    [`.${jiraClassNames.clippedText}`]: {
      display: "-webkit-box",
      overflow: "hidden",
      WebkitBoxOrient: "vertical",
      WebkitLineClamp: 2,
    },
    [`.${jiraClassNames.progressDense}`]: {
      height: 6,
    },
    [`.${jiraClassNames.progressRoomy}`]: {
      height: 8,
    },
    [`.${jiraClassNames.progressTall}`]: {
      height: 10,
    },
  };
}
