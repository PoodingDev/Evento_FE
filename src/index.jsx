import "./index.css";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";

function enableMocking() {
  if (process.env.NODE_ENV !== "development") {
    return Promise.resolve();
  }

  return import("./mocks/browser")
    .then(({ worker }) => {
      return worker
        .start({
          serviceWorker: {
            url: "/mockServiceWorker.js", // 서비스 워커 등록 경로 명시
            options: {
              scope: "/", // 모든 경로에서 서비스 워커 적용
            },
          },
          onUnhandledRequest: "bypass", // 가로채지 못한 요청은 실제 서버로 전달
        })
        .then(() => {
          console.log("[MSW] Mocking started");
        });
    })
    .catch((error) => {
      console.error("Failed to start service worker:", error);
    });
}

function initializeApp() {
  // 서비스 워커 등록 시도와 관계없이 App을 렌더링합니다.
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<App />);

  // 개발 환경에서만 서비스 워커를 활성화
  if (process.env.NODE_ENV === "development") {
    enableMocking().then(() => {
      navigator.serviceWorker.getRegistration().then((registration) => {
        if (registration) {
          console.log("Service Worker successfully registered:", registration);
        } else {
          console.log("Service Worker registration failed");
        }
      });
    });
  }
}

initializeApp();

// 페이지가 다시 보여질 때 서비스 워커 상태 확인 및 필요 시 재등록
window.addEventListener("pageshow", () => {
  if (process.env.NODE_ENV === "development") {
    console.log("Service Worker Check:");
    navigator.serviceWorker.getRegistration().then((registration) => {
      if (!registration) {
        console.log(
          "No Service Worker is controlling the page, re-registering...",
        );
        enableMocking().then(() => {
          navigator.serviceWorker.ready.then((newRegistration) => {
            if (newRegistration) {
              console.log(
                "Service Worker successfully re-registered:",
                newRegistration,
              );
            } else {
              console.log("Service Worker re-registration failed");
            }
          });
        });
      } else {
        console.log("Service Worker is currently controlling the page");
      }
    });
  }
});
