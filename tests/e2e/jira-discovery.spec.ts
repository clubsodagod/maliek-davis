import { expect, test } from "@playwright/test";

const setupId = process.env.JIRA_E2E_SETUP_ID;
const unauthorizedSetupId = process.env.JIRA_E2E_UNAUTHORIZED_SETUP_ID;

test.skip(!setupId, "Set JIRA_E2E_SETUP_ID and JIRA_E2E_STORAGE_STATE to run Jira discovery E2E flows.");

test.describe("Jira guided discovery", () => {
  test("starts or resumes discovery for a seeded setup", async ({ page }) => {
    await page.goto(`/admin/dashboard/jira/setups/${setupId}/discovery`);
    await expect(page.getByRole("heading", { name: "Guided Discovery" })).toBeVisible();

    const startButton = page.getByRole("button", { name: "Start Guided Discovery" });
    if (await startButton.isVisible()) {
      await page.getByLabel("Standard discovery").check();
      await startButton.click();
    }

    await expect(page.getByRole("tab", { name: /Project Foundation/i })).toBeVisible();
  });

  test("can answer, process, and approve the current section", async ({ page }) => {
    await page.goto(`/admin/dashboard/jira/setups/${setupId}/discovery`);

    const firstAnswer = page.getByLabel("Answer").first();
    await firstAnswer.fill("E2E confirmed answer for the current discovery question.");
    await page.getByRole("button", { name: "Save" }).first().click();
    await expect(page.getByText(/The answer indicates|E2E confirmed/i)).toBeVisible();

    await page.getByRole("button", { name: "Process section" }).click();
    await expect(page.getByText(/ready for approval|needs clarification|Assumptions/i)).toBeVisible();

    const approve = page.getByRole("button", { name: "Approve section" });
    if (await approve.isEnabled()) {
      await approve.click();
      await expect(page.getByText(/approved/i)).toBeVisible();
    }
  });

  test("supports manual plan edits and chat patch previews after plan generation", async ({ page }) => {
    await page.goto(`/admin/dashboard/jira/setups/${setupId}/discovery`);

    const generatePlan = page.getByRole("button", { name: "Generate plan" });
    if (await generatePlan.isEnabled()) {
      await generatePlan.click();
    }

    await page.getByLabel("Summary").fill("E2E manual workstream");
    await page.getByRole("button", { name: "Add" }).click();
    await expect(page.getByText("E2E manual workstream")).toBeVisible();

    await page.getByLabel("Change request").fill("Add a task for launch communication.");
    await page.getByRole("button", { name: "Preview" }).click();
    await expect(page.getByText(/Structured patch|ready/i)).toBeVisible();
  });

  test("redirects to setup preview after final approval", async ({ page }) => {
    await page.goto(`/admin/dashboard/jira/setups/${setupId}/discovery`);
    const finalApproval = page.getByRole("button", { name: "Final approval" });
    test.skip(!(await finalApproval.isEnabled()), "Seeded setup is not ready for final approval.");

    await finalApproval.click();
    await expect(page).toHaveURL(new RegExp(`/admin/dashboard/jira/setups/${setupId}/preview$`));
    await expect(page.getByRole("heading", { name: "Setup Preview" })).toBeVisible();
  });
});

test("blocks unauthorized setup access when a foreign setup id is provided", async ({ page }) => {
  test.skip(!unauthorizedSetupId, "Set JIRA_E2E_UNAUTHORIZED_SETUP_ID to verify ownership blocking.");

  await page.goto(`/admin/dashboard/jira/setups/${unauthorizedSetupId}/discovery`);
  await expect(page.getByRole("heading", { name: /not found/i })).toBeVisible();
});
