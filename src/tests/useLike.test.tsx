import { renderHook, act } from "@testing-library/react";
import { vi } from "vitest";

// 🔹 Mock del store
vi.mock("../store/authStore", () => ({
  useAuthStore: vi.fn(() => ({ token: "fake-token" })),
}));

// 🔹 Mock del AlertContext
const mockShowAlert = vi.fn();
vi.mock("../context/AlertContext", () => ({
  useAlertContext: vi.fn(() => ({ showAlert: mockShowAlert })),
}));

// 🔹 Mock del API
const mockGetLikeInfo = vi.fn().mockResolvedValue({
  data: { data: { likesCount: 3, isLikedByUser: false } },
});
const mockToggleLike = vi.fn().mockResolvedValue({
  data: { data: { liked: true } },
});

vi.mock("../services/api", () => ({
  getLikeInfo: (postId: number) => mockGetLikeInfo(postId),
  toggleLike: (postId: number) => mockToggleLike(postId),
}));

import { useLike } from "../hooks/useLike";
import { waitFor } from "@testing-library/react";

describe("useLike hook", () => {
  it("carga los likes iniciales correctamente", async () => {
    const { result } = renderHook(() => useLike(1));

    await waitFor(() => {
      expect(result.current.likesCount).toBe(3);
      expect(result.current.isLiked).toBe(false);
    });
  });

  it("cambia el estado al hacer toggleLike", async () => {
    const { result } = renderHook(() => useLike(1));

    await waitFor(() => expect(result.current.likesCount).toBe(3));

    act(() => {
      result.current.handleToggleLike();
    });

    await waitFor(() => {
      expect(result.current.isLiked).toBe(true);
      expect(result.current.likesCount).toBe(4);
    });
  });
});
