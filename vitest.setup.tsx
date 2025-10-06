import "@testing-library/jest-dom/vitest";

// Clear all mocks before each test to avoid leakage between tests
beforeEach(() => {
  vi.clearAllMocks();
});

vi.mock("next/navigation", () => {
  const push = vi.fn();
  return {
    useRouter: () => ({ push }),
  };
});

vi.mock("next-intl", () => ({
  useTranslations: () => (k: string) => k,
  useLocale: () => "en",
}));

// Polyfill dialog methods for jsdom
(() => {
  const DialogCtor = globalThis.HTMLDialogElement;
  if (!DialogCtor) return;
  const proto = DialogCtor.prototype;
  if (typeof proto.showModal !== "function") {
    proto.showModal = function showModal(this: HTMLDialogElement) {
      this.setAttribute("open", "");
    } as HTMLDialogElement["showModal"];
  }
  if (typeof proto.close !== "function") {
    proto.close = function close(this: HTMLDialogElement) {
      this.removeAttribute("open");
    } as HTMLDialogElement["close"];
  }
})();
