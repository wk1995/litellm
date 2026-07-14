import { describe, expect, it, vi } from "vitest";

vi.mock("next/font/google", () => ({
  Inter: () => ({ className: "inter" }),
}));

vi.mock("./globals.css", () => ({}));

vi.mock("@/contexts/AntdGlobalProvider", () => ({
  default: ({ children }: { children: React.ReactNode }) => children,
}));

vi.mock("@/contexts/AuthContext", () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => children,
}));

vi.mock("@/contexts/ReactQueryProvider", () => ({
  default: ({ children }: { children: React.ReactNode }) => children,
}));

describe("RootLayout", () => {
  it("suppresses hydration warnings from browser-injected html attributes", async () => {
    const { default: RootLayout } = await import("./layout");

    const layout = RootLayout({ children: <main /> });

    expect(layout.type).toBe("html");
    expect(layout.props.lang).toBe("en");
    expect(layout.props.suppressHydrationWarning).toBe(true);
  });
});
