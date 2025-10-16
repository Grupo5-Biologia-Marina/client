import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage";

vi.mock("../store/authStore", () => ({
  useAuthStore: vi.fn(() => ({
    setUser: vi.fn(),
  })),
}));

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});


vi.mock("../services/api", () => ({
  api: {
    post: vi.fn(),
  },
}));

describe("LoginPage", () => {
  const { api } = require("../services/api");
  const { useAuthStore } = require("../store/authStore");

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("muestra los campos de login", () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText("Correo electrónico")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Contraseña")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /iniciar sesión/i })).toBeInTheDocument();
  });

  it("realiza login exitoso y redirige", async () => {
    const mockUser = {
      id: 1,
      username: "juan",
      email: "juan@test.com",
      role: "user",
    };

    api.post.mockResolvedValueOnce({
      data: {
        token: "fakeToken",
        data: mockUser,
      },
    });

    const setUser = vi.fn();
    useAuthStore.mockReturnValue({ setUser });

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Correo electrónico"), {
      target: { value: "juan@test.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Contraseña"), {
      target: { value: "123456" },
    });
    fireEvent.click(screen.getByRole("button", { name: /iniciar sesión/i }));

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith("/auth/login", {
        email: "juan@test.com",
        password: "123456",
      });
      expect(setUser).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith("/discoveries");
    });
  });

  it("muestra error si el login falla", async () => {
    api.post.mockRejectedValueOnce({
      response: { data: { message: "Credenciales inválidas" } },
    });

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Correo electrónico"), {
      target: { value: "wrong@test.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Contraseña"), {
      target: { value: "wrongpass" },
    });
    fireEvent.click(screen.getByRole("button", { name: /iniciar sesión/i }));

    await waitFor(() => {
      expect(screen.getByText(/credenciales inválidas/i)).toBeInTheDocument();
    });
  });
});
