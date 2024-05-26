import { render, screen } from "@testing-library/react";
import { LoginForm } from "./LoginForm";

describe("LoginForm", () => {
    it("should render the login form", () => {
        const { getByLabelText } = render(<LoginForm />);
        expect(screen.getByRole("button", { name: "/login/i" })).toBeInTheDocument();
        expect(getByLabelText("username or email")).toBeInTheDocument();
        expect(getByLabelText("password")).toBeInTheDocument();
    });
});
