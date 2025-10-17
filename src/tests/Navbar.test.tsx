import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, vi, beforeEach } from "vitest";
import Navbar from "../components/Navbar";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    Link: ({ children, to }: any) => <a href={to}>{children}</a>,
  };
});

const mockClearToken = vi.fn();
vi.mock("../store/authStore", () => ({
  useAuthStore: (selector: any) => selector({
    userId: 1,
    clearToken: mockClearToken,
  }),
}));

describe("Navbar - Logout", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("hace logout al hacer clic en 'Cerrar Sesión'", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const logoutButton = screen.getByText("Cerrar Sesión");
    fireEvent.click(logoutButton);

    expect(mockClearToken).toHaveBeenCalledTimes(1);

    expect(mockNavigate).toHaveBeenCalledWith("/discoveries");
  });
});
