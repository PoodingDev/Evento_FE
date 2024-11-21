import axios from "axios";
import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function LoginPostCode() {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const authorizationCode = searchParams.get("code");
    if (authorizationCode) {
      postCode(authorizationCode);
    }
  }, [searchParams]);

  function postCode(authCode) {
    axios
      .post("https://run.mocky.io/v3/your-mock-api-id", {
        //실제 우리 백엔드 uri로 수정
        code: authCode,
        platform: "google",
      })
      .then((response) => {
        console.log("응답:", response.data);
        localStorage.setItem("authToken", response.data.token);
      })
      .catch((error) => {
        console.error("에러:", error);
      });
  }
  return <div>LoginPostCode</div>;
}
