import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { SignupForm } from "./SignupForm";

describe("Sign up form", () => {
    it("should have no error messages when the form is first rendered", () => {
        const { container } = render(
            <MemoryRouter>
                <SignupForm />
            </MemoryRouter>,
        );
        const errorMessages = container.querySelectorAll(".validation-error");
        errorMessages.forEach((errorMessage) => {
            expect(errorMessage.textContent).toBe("");
        });
    });

    it("should disable the submit button when input values are invalid", async () => {
        const { getByPlaceholderText, getByRole } = render(
            <MemoryRouter>
                <SignupForm />
            </MemoryRouter>,
        );

        const usernameInput = getByPlaceholderText(/enter username/i);
        const emailInput = getByPlaceholderText(/enter email/i);
        const passwordInput = getByPlaceholderText(/enter password/i);
        const confirmPasswordInput = getByPlaceholderText(/confirm password/i);
        const submitButton = getByRole("button", { name: /sign up/i });

        // Simulate invalid user input
        await userEvent.type(usernameInput, "us");
        await userEvent.type(emailInput, "invalid-email");
        await userEvent.type(passwordInput, "short");
        await userEvent.type(confirmPasswordInput, "mismatch");

        // Assert the submit button is disabled
        expect(submitButton).toBeDisabled();
    });

    it("should enable the submit button when input values are valid", async () => {
        const { getByPlaceholderText, getByRole } = render(
            <MemoryRouter>
                <SignupForm />
            </MemoryRouter>,
        );

        const usernameInput = getByPlaceholderText(/enter username/i);
        const emailInput = getByPlaceholderText(/enter email/i);
        const passwordInput = getByPlaceholderText(/enter password/i);
        const confirmPasswordInput = getByPlaceholderText(/confirm password/i);
        const submitButton = getByRole("button", { name: /sign up/i });

        // Simulate valid user input
        await userEvent.type(usernameInput, "validUsername");
        await userEvent.type(emailInput, "valid@example.com");
        await userEvent.type(passwordInput, "ValidPassword1!");
        await userEvent.type(confirmPasswordInput, "ValidPassword1!");

        // Assert the submit button is enabled
        expect(submitButton).not.toBeDisabled();
    });

    it("should display error messages when input values are invalid", async () => {
        const { getByPlaceholderText, getByText } = render(
            <MemoryRouter>
                <SignupForm />
            </MemoryRouter>,
        );

        const usernameInput = getByPlaceholderText(/enter username/i);
        const emailInput = getByPlaceholderText(/enter email/i);

        await userEvent.type(usernameInput, "us");
        await userEvent.type(usernameInput, "us!");
        expect(getByText(/username needs only letters and numbers/i)).toBeInTheDocument();
        await userEvent.type(usernameInput, "UsernameWithMoreThan25Characters");
        expect(getByText(/username needs at most 25 characters/i)).toBeInTheDocument();

        await userEvent.type(emailInput, "invalid-email");
        expect(getByText(/email must be valid/i)).toBeInTheDocument();
    });
});
