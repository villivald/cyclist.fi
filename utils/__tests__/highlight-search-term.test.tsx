import { render } from "@testing-library/react";

import { highlightSearchTerm } from "../highlight-search-term";

describe("highlightSearchTerm", () => {
  const renderNodes = (nodes: React.ReactNode[]) => {
    return render(<>{nodes}</>);
  };

  it("returns original text when query is empty or whitespace", () => {
    const text = "Hello World";
    const { container } = renderNodes(highlightSearchTerm(text, " "));
    const marks = container.querySelectorAll("mark");
    expect(container.textContent).toBe(text);
    expect(marks.length).toBe(0);
  });

  it("wraps matching segments in <mark> (case-insensitive)", () => {
    const text = "Cycling is Life";
    const { container } = renderNodes(highlightSearchTerm(text, "cyc"));
    const marks = container.querySelectorAll("mark");
    expect(marks.length).toBe(1);
    expect(marks[0].textContent).toBe("Cyc");
  });

  it("highlights multiple occurrences", () => {
    const text = "bike, Bike, BIKE!";
    const { container } = renderNodes(highlightSearchTerm(text, "bike"));
    const marks = container.querySelectorAll("mark");
    expect(marks.length).toBe(3);
    expect(marks[0].textContent).toBe("bike");
    expect(marks[1].textContent).toBe("Bike");
    expect(marks[2].textContent).toBe("BIKE");
  });

  it("escapes special regex characters in query", () => {
    const text = "Does this match a+b? Yes a+b does.";
    const { container } = renderNodes(highlightSearchTerm(text, "a+b"));
    const marks = container.querySelectorAll("mark");
    expect(marks.length).toBe(2);
    expect(marks[0].textContent).toBe("a+b");
    expect(marks[1].textContent).toBe("a+b");
  });
});
