export type JiraProjectTypeKey = "business" | "software";
export type JiraProjectManagementStyle = "team-managed" | "company-managed";
export type JiraProjectTemplateGroup =
  | "Software Development"
  | "Business / Project Management"
  | "Process Control";

export type JiraProjectTemplateId =
  | "software-team-kanban"
  | "software-team-scrum"
  | "software-bug-tracking"
  | "software-company-kanban"
  | "software-company-scrum"
  | "business-project-management"
  | "business-process-control"
  | "business-document-approval"
  | "business-task-tracking";

export type JiraWorkflowSelectionId = "jira-default" | "document-heavy";

export type JiraTemplateHierarchyPreview = {
  workstream: string;
  task: string;
  subtask: string;
};

export type JiraProjectTemplateOption = {
  id: JiraProjectTemplateId;
  group: JiraProjectTemplateGroup;
  name: string;
  purpose: string;
  projectTypeKey: JiraProjectTypeKey;
  projectTemplateKey: string;
  managementStyle: JiraProjectManagementStyle;
  expectedIssueTypes: readonly string[];
  hierarchyPreview: JiraTemplateHierarchyPreview;
  recommendedUseCase: string;
  pearlBoxRecommended: boolean;
};

export type JiraWorkflowOption = {
  id: JiraWorkflowSelectionId;
  name: string;
  description: string;
  compatibleManagementStyles: readonly JiraProjectManagementStyle[];
  retainsTemplateWorkflow: boolean;
};

export const JIRA_PROJECT_TEMPLATE_GROUPS = [
  "Software Development",
  "Business / Project Management",
  "Process Control",
] as const satisfies readonly JiraProjectTemplateGroup[];

export const JIRA_PROJECT_TEMPLATE_KEYS = [
  "com.pyxis.greenhopper.jira:gh-simplified-agility-kanban",
  "com.pyxis.greenhopper.jira:gh-simplified-agility-scrum",
  "com.pyxis.greenhopper.jira:gh-simplified-basic",
  "com.pyxis.greenhopper.jira:gh-simplified-kanban-classic",
  "com.pyxis.greenhopper.jira:gh-simplified-scrum-classic",
  "com.atlassian.jira-core-project-templates:jira-core-simplified-project-management",
  "com.atlassian.jira-core-project-templates:jira-core-simplified-process-control",
  "com.atlassian.jira-core-project-templates:jira-core-simplified-document-approval",
  "com.atlassian.jira-core-project-templates:jira-core-simplified-task-tracking",
] as const;

export const JIRA_WORKFLOW_SELECTION_IDS = [
  "jira-default",
  "document-heavy",
] as const;

export const JIRA_PROJECT_TEMPLATE_OPTIONS = [
  {
    id: "software-team-kanban",
    group: "Software Development",
    name: "Team-managed Kanban",
    purpose: "Continuous software delivery without required sprints.",
    projectTypeKey: "software",
    projectTemplateKey: "com.pyxis.greenhopper.jira:gh-simplified-agility-kanban",
    managementStyle: "team-managed",
    expectedIssueTypes: ["Epic", "Story", "Task", "Bug", "Subtask"],
    hierarchyPreview: {
      workstream: "Epic",
      task: "Story / Task / Bug",
      subtask: "Subtask",
    },
    recommendedUseCase: "Small software teams that manage their own flow.",
    pearlBoxRecommended: false,
  },
  {
    id: "software-team-scrum",
    group: "Software Development",
    name: "Team-managed Scrum",
    purpose: "Backlog, fixed-length sprints, velocity, and sprint reporting.",
    projectTypeKey: "software",
    projectTemplateKey: "com.pyxis.greenhopper.jira:gh-simplified-agility-scrum",
    managementStyle: "team-managed",
    expectedIssueTypes: ["Epic", "Story", "Task", "Bug", "Subtask"],
    hierarchyPreview: {
      workstream: "Epic",
      task: "Story / Task / Bug",
      subtask: "Subtask",
    },
    recommendedUseCase: "Agile software teams planning work in sprints.",
    pearlBoxRecommended: false,
  },
  {
    id: "software-bug-tracking",
    group: "Software Development",
    name: "Bug Tracking",
    purpose: "Defect capture, prioritization, investigation, and resolution.",
    projectTypeKey: "software",
    projectTemplateKey: "com.pyxis.greenhopper.jira:gh-simplified-basic",
    managementStyle: "team-managed",
    expectedIssueTypes: ["Bug", "Task", "Subtask"],
    hierarchyPreview: {
      workstream: "Bug category",
      task: "Bug / Task",
      subtask: "Subtask",
    },
    recommendedUseCase: "Focused defect queues and triage-heavy work.",
    pearlBoxRecommended: false,
  },
  {
    id: "software-company-kanban",
    group: "Software Development",
    name: "Company-managed Kanban",
    purpose: "Continuous software flow with centrally administered standards.",
    projectTypeKey: "software",
    projectTemplateKey: "com.pyxis.greenhopper.jira:gh-simplified-kanban-classic",
    managementStyle: "company-managed",
    expectedIssueTypes: ["Epic", "Story", "Task", "Bug", "Sub-task"],
    hierarchyPreview: {
      workstream: "Epic",
      task: "Story / Task / Bug",
      subtask: "Sub-task",
    },
    recommendedUseCase: "Reusable organizational software workflows.",
    pearlBoxRecommended: true,
  },
  {
    id: "software-company-scrum",
    group: "Software Development",
    name: "Company-managed Scrum",
    purpose: "Sprint planning and reporting with centralized administration.",
    projectTypeKey: "software",
    projectTemplateKey: "com.pyxis.greenhopper.jira:gh-simplified-scrum-classic",
    managementStyle: "company-managed",
    expectedIssueTypes: ["Epic", "Story", "Task", "Bug", "Sub-task"],
    hierarchyPreview: {
      workstream: "Epic",
      task: "Story / Task / Bug",
      subtask: "Sub-task",
    },
    recommendedUseCase: "Standardized sprint-based software programs.",
    pearlBoxRecommended: true,
  },
  {
    id: "business-project-management",
    group: "Business / Project Management",
    name: "Project Management",
    purpose: "Plan and track business deliverables through completion.",
    projectTypeKey: "business",
    projectTemplateKey:
      "com.atlassian.jira-core-project-templates:jira-core-simplified-project-management",
    managementStyle: "company-managed",
    expectedIssueTypes: ["Task", "Sub-task"],
    hierarchyPreview: {
      workstream: "Business outcome",
      task: "Document / deliverable task",
      subtask: "Question / execution requirement",
    },
    recommendedUseCase: "Pearl Box-style document-heavy project management.",
    pearlBoxRecommended: true,
  },
  {
    id: "business-process-control",
    group: "Process Control",
    name: "Process Control",
    purpose: "Govern repeatable process steps, controls, and handoffs.",
    projectTypeKey: "business",
    projectTemplateKey:
      "com.atlassian.jira-core-project-templates:jira-core-simplified-process-control",
    managementStyle: "company-managed",
    expectedIssueTypes: ["Task", "Sub-task"],
    hierarchyPreview: {
      workstream: "Process area",
      task: "Controlled deliverable",
      subtask: "Control question / requirement",
    },
    recommendedUseCase: "Process control and reusable organizational workflows.",
    pearlBoxRecommended: true,
  },
  {
    id: "business-document-approval",
    group: "Process Control",
    name: "Document Approval",
    purpose: "Route document work through preparation, review, and approval.",
    projectTypeKey: "business",
    projectTemplateKey:
      "com.atlassian.jira-core-project-templates:jira-core-simplified-document-approval",
    managementStyle: "company-managed",
    expectedIssueTypes: ["Task", "Sub-task"],
    hierarchyPreview: {
      workstream: "Document family",
      task: "Document draft",
      subtask: "Review question / approval requirement",
    },
    recommendedUseCase: "Document-heavy governance and approval workflows.",
    pearlBoxRecommended: true,
  },
  {
    id: "business-task-tracking",
    group: "Business / Project Management",
    name: "Task Tracking",
    purpose: "Simple tracking for operational task lists.",
    projectTypeKey: "business",
    projectTemplateKey:
      "com.atlassian.jira-core-project-templates:jira-core-simplified-task-tracking",
    managementStyle: "company-managed",
    expectedIssueTypes: ["Task", "Sub-task"],
    hierarchyPreview: {
      workstream: "Work area",
      task: "Task",
      subtask: "Sub-task",
    },
    recommendedUseCase: "Straightforward operational task coordination.",
    pearlBoxRecommended: false,
  },
] as const satisfies readonly JiraProjectTemplateOption[];

export const JIRA_WORKFLOW_OPTIONS = [
  {
    id: "jira-default",
    name: "Jira Default",
    description: "Retain the workflow supplied by the selected project template.",
    compatibleManagementStyles: ["team-managed", "company-managed"],
    retainsTemplateWorkflow: true,
  },
  {
    id: "document-heavy",
    name: "Document Heavy Workflow",
    description: "Assign the existing custom core business workflow scheme.",
    compatibleManagementStyles: ["company-managed"],
    retainsTemplateWorkflow: false,
  },
] as const satisfies readonly JiraWorkflowOption[];

export const DEFAULT_JIRA_PROJECT_TEMPLATE_ID: JiraProjectTemplateId =
  "business-process-control";
export const DEFAULT_JIRA_WORKFLOW_SELECTION_ID: JiraWorkflowSelectionId =
  "jira-default";

export function getJiraProjectTemplateById(
  id: JiraProjectTemplateId,
): JiraProjectTemplateOption {
  const template = JIRA_PROJECT_TEMPLATE_OPTIONS.find(
    (option) => option.id === id,
  );

  if (!template) {
    throw new Error(`Jira project template "${id}" is not configured.`);
  }

  return template;
}

export function findJiraProjectTemplateByKey(
  projectTemplateKey: string,
): JiraProjectTemplateOption | undefined {
  return JIRA_PROJECT_TEMPLATE_OPTIONS.find(
    (option) => option.projectTemplateKey === projectTemplateKey,
  );
}

export function getJiraWorkflowOption(
  id: JiraWorkflowSelectionId,
): JiraWorkflowOption {
  const workflow = JIRA_WORKFLOW_OPTIONS.find((option) => option.id === id);

  if (!workflow) {
    throw new Error(`Jira workflow selection "${id}" is not configured.`);
  }

  return workflow;
}

export function getWorkflowIncompatibilityReason(
  templateId: JiraProjectTemplateId,
  workflowId: JiraWorkflowSelectionId,
): string | undefined {
  const template = getJiraProjectTemplateById(templateId);
  const workflow = getJiraWorkflowOption(workflowId);

  return workflow.compatibleManagementStyles.includes(template.managementStyle)
    ? undefined
    : "Custom workflow schemes can only be assigned to company-managed projects.";
}

export function formatJiraProjectTypeKey(value: JiraProjectTypeKey): string {
  return value === "business" ? "Business" : "Software";
}

export function formatJiraManagementStyle(
  value: JiraProjectManagementStyle,
): string {
  return value === "team-managed" ? "Team-managed" : "Company-managed";
}
