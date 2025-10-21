import { act, fireEvent, render, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";

// Mock data loader to be synchronous and predictable
vi.mock("@/utils/search-data", () => ({
  loadSearchData: async () => ({
    routesData: {
      bikes: [
        {
          id: "r1",
          title: "Bikes",
          description_en: "All about bikes",
          description_fi: "Kaikki polkupyöristä",
          link: "/bikes",
          alt: "bikes",
          tags: ["road", "mtb"],
        },
      ],
    },
    newsData: [
      {
        id: "n1",
        text_fi: "New bikes arrived in stock",
        text_en: "New bikes arrived in stock",
        date: "2024-01-01",
      },
    ],
  }),
}));

import SearchComponent from "../search-component";

describe("SearchComponent integration", () => {
  const { push } = useRouter();

  it("opens, searches, shows results, and navigates on click", async () => {
    render(<SearchComponent />);

    // Open search dialog
    act(() => {
      window.dispatchEvent(new Event("open-search"));
    });

    // Input appears
    const input = await screen.findByTestId("search-input");
    expect(input).toBeInTheDocument();

    // Type query (>=2 chars)
    fireEvent.change(input, { target: { value: "bik" } });

    // Debounce for 600ms
    vi.useFakeTimers();
    await act(async () => vi.advanceTimersByTime(600));
    vi.useRealTimers();

    // Result summary shows 2 results (route + news containing term)
    await screen.findByText(/2\s+resultsFound_plural/i);

    // Click the route result navigates to /bikes
    const routeLink = await screen.findByTestId("search-result-link-route-r1");
    fireEvent.click(routeLink);
    expect(push).toHaveBeenCalledWith("/bikes");
  });
});
