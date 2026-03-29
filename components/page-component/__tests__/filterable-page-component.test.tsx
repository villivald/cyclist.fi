import { fireEvent, render, screen } from "@testing-library/react";

import FilterablePageComponent from "../filterable-page-component";
import type { DataRowProps } from "../types";

vi.mock("../data-row", () => ({
  default: ({ item }: DataRowProps) => (
    <div data-testid="row">{item.title}</div>
  ),
}));

const fixtures = [
  {
    id: "bike-1",
    title: "Road Bike Hub",
    description_en: "Best road cycling resources",
    description_fi: "Parhaat maantiepyorailyresurssit",
    link: "https://example.com/bikes",
    alt: "Road bikes",
    tags: ["Road", "Training"],
  },
  {
    id: "pod-1",
    title: "Podcast Corner",
    description_en: "Interviews and stories",
    description_fi: "Haastatteluja ja tarinoita",
    link: "https://example.com/podcasts",
    alt: "Podcasts",
    tags: ["Audio"],
  },
];

describe("FilterablePageComponent", () => {
  it("shows all rows with empty query and updates summary", () => {
    render(<FilterablePageComponent data={fixtures} />);

    expect(screen.getAllByTestId("row")).toHaveLength(2);
    expect(screen.getByText("2 / 2")).toBeInTheDocument();
  });

  it("filters by title, tags and link in a case-insensitive way", () => {
    render(<FilterablePageComponent data={fixtures} />);
    const input = screen.getByRole("searchbox");

    fireEvent.change(input, { target: { value: "  road  " } });
    expect(screen.getAllByTestId("row")).toHaveLength(1);
    expect(screen.getByText("Road Bike Hub")).toBeInTheDocument();
    expect(screen.getByText("1 / 2")).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "audio" } });
    expect(screen.getAllByTestId("row")).toHaveLength(1);
    expect(screen.getByText("Podcast Corner")).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "podcasts" } });
    expect(screen.getAllByTestId("row")).toHaveLength(1);
    expect(screen.getByText("Podcast Corner")).toBeInTheDocument();
  });

  it("shows no results state when query has no matches", () => {
    render(<FilterablePageComponent data={fixtures} />);
    const input = screen.getByRole("searchbox");

    fireEvent.change(input, { target: { value: "zzz" } });
    expect(screen.queryAllByTestId("row")).toHaveLength(0);
    expect(screen.getByText("noResults")).toBeInTheDocument();
    expect(screen.getByText("0 / 2")).toBeInTheDocument();
  });
});
