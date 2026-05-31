import { http, HttpResponse } from "msw";

const mockRefreshToken = "valid-refresh-token";

export const handlers = [
  http.post("/api/auth/refresh", ({ request }) => {
    const authHeader = request.headers.get("Authorization");

    if (authHeader === `Bearer ${mockRefreshToken}`) {
      return HttpResponse.json({
        accessToken: "new-access-token-" + Date.now(),
      });
    }

    return new HttpResponse(null, { status: 401 });
  }),
];
