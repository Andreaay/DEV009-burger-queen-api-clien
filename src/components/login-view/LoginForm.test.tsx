import LoginForm from './log-in-view';
import { render, fireEvent, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import * as tokenRepository from "../../services/tokenRepository";

const mockUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  useNavigate: () => mockUseNavigate,
}));

describe("LoginForm Component", () => {
  it("should navigate to waiter-view on successful login", async () => {
    const authenticatedUserRole = "waiter";
    localStorage.setItem("userRole", authenticatedUserRole);

    const mockLoginResponse = { token: "your-token" };
    
    jest.spyOn(tokenRepository, "login").mockResolvedValue(mockLoginResponse);

    render(<LoginForm />);

    fireEvent.change(screen.getByPlaceholderText("ENTER EMAIL"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("ENTER PASSWORD"), {
      target: { value: "password" },
    });

    const loginButton = screen.getByText("LOGIN");
    fireEvent.click(loginButton);

    await act(async () => {});

    expect(mockUseNavigate).toHaveBeenCalledWith("/waiter-view");
  });

  it("should navigate to chef-view on successful login", async () => {
    const authenticatedUserRole = "chef";
    localStorage.setItem("userRole", authenticatedUserRole);

    const mockLoginResponse = { token: "your-token" };
    
    jest.spyOn(tokenRepository, "login").mockResolvedValue(mockLoginResponse);

    render(<LoginForm />);

    fireEvent.change(screen.getByPlaceholderText("ENTER EMAIL"), {
      target: { value: "test2@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("ENTER PASSWORD"), {
      target: { value: "password" },
    });

    const loginButton = screen.getByText("LOGIN");
    fireEvent.click(loginButton);

    await act(async () => {});

    expect(mockUseNavigate).toHaveBeenCalledWith("/chef-view");
  });
  
});
