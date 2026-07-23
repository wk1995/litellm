import { render } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ComplianceUI from "./ComplianceUI";

vi.mock("@/data/compliancePrompts", () => ({
  getFrameworks: () => [
    {
      name: "Test Framework",
      icon: "shield",
      description: "Test framework",
      categories: [
        {
          name: "Test Category",
          icon: "shield",
          description: "Test category",
          prompts: [
            {
              id: "prompt-1",
              framework: "Test Framework",
              category: "Test Category",
              categoryIcon: "shield",
              categoryDescription: "Test category",
              prompt: "Test prompt",
              expectedResult: "fail",
            },
          ],
        },
      ],
    },
  ],
}));

vi.mock("@/components/networking", () => ({
  getGuardrailsList: vi.fn().mockResolvedValue({ guardrails: [] }),
  testPoliciesAndGuardrails: vi.fn(),
}));

vi.mock("@/components/policies/PolicySelector", () => ({
  default: () => <div data-testid="policy-selector" />,
  getPolicyOptionEntries: () => [],
}));

vi.mock("@/components/llm_calls/chat_completion", () => ({
  makeOpenAIChatCompletionRequest: vi.fn(),
}));

describe("ComplianceUI", () => {
  beforeEach(() => {
    Element.prototype.scrollIntoView = vi.fn();
  });

  it("should not nest interactive buttons in framework rows", () => {
    const { container } = render(<ComplianceUI accessToken={null} />);

    expect(container.querySelector("button button")).toBeNull();
  });
});
