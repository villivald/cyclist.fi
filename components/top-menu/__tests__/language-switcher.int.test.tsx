import { fireEvent, render, screen } from "@testing-library/react";

const setUserLocaleMock = vi.fn();
vi.mock("services/locale", () => ({
  __esModule: true,
  setUserLocale: (...args: unknown[]) => setUserLocaleMock(...args),
}));

import LanguageSwitcher from "../language-switcher";

describe("LanguageSwitcher integration", () => {
  it("toggles locale on click and updates aria-label text", () => {
    render(<LanguageSwitcher />);

    const button = screen.getByTestId("language-toggle-button");
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(setUserLocaleMock).toHaveBeenCalledWith("fi");
  });
});
