import axios from "axios";

export async function requestSocialLogin(provider, accessToken) {
  const response = await axios.post("/api/auth/social-login", {
    provider: provider,
    access_token: accessToken,
  });
  return response.data;
}
