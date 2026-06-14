import { beforeEach, describe, expect, it, vi } from "vitest";

const fetchThreadMock = vi.fn();

vi.mock("@/services/comments/service", () => ({
  commentService: {
    fetchThread: fetchThreadMock,
  },
}));

const loadRouteHandler = () => import("../route");

const makeContext = (slug: string) => ({
  params: Promise.resolve({ slug }),
});

describe("GET /api/comments/[slug]", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();

    fetchThreadMock.mockResolvedValue({
      slug: "shops/item-1",
      comments: [
        {
          id: "comment123",
          slug: "shops/item-1",
          content: "Great shop",
          authorName: "Alex",
          deviceId: "device-secret-id-12345678",
          createdAt: "2026-06-13T10:00:00.000Z",
          updatedAt: "2026-06-13T10:00:00.000Z",
        },
      ],
    });
  });

  it("does not expose deviceId in the public thread response", async () => {
    const { GET } = await loadRouteHandler();
    const response = await GET(
      new Request("http://localhost/api/comments/shops/item-1"),
      makeContext("shops/item-1"),
    );
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.ok).toBe(true);
    expect(data.thread.comments).toHaveLength(1);
    expect(data.thread.comments[0]).toEqual({
      id: "comment123",
      slug: "shops/item-1",
      content: "Great shop",
      authorName: "Alex",
      createdAt: "2026-06-13T10:00:00.000Z",
      updatedAt: "2026-06-13T10:00:00.000Z",
    });
    expect(data.thread.comments[0]).not.toHaveProperty("deviceId");
  });
});
