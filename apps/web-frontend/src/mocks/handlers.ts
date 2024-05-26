import { http, HttpResponse } from "msw";

export const handlers = [
    http.post(`${import.meta.env.VITE_API_URL}/users`, () => {
        return HttpResponse.json({
            jwtToken: "fake-jwt-token",
        });
    }),
];
