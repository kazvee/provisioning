"use client";
import { useEffect, useState } from "react";

export function cookieConsentGiven() {
  if (typeof window === "undefined") return "undecided";
  return localStorage.getItem("cookie_consent") ?? "undecided";
}

export default function Banner() {
  const [consent, setConsent] = useState("undecided");
  const [hovered, setHovered] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    const stored = cookieConsentGiven();
    setConsent(stored);
    if (stored === "undecided") setTimeout(() => setShow(true), 100);
  }, []);

  useEffect(() => {
    if (consent === "yes") {
      (async () => {
        const ph = (await import("posthog-js")).default;
        if (!ph.__initialized) {
          ph.init("phc_Sd7Bm5c2eRz4c5ig85fG6heD9AOuoCHxlc9lmhWGoRO", {
            api_host: "https://app.posthog.com",
            persistence: "localStorage+cookie",
          });
        }
      })();
    }
  }, [consent]);

  const acceptCookies = () => {
    localStorage.setItem("cookie_consent", "yes");
    setConsent("yes");
  };

  const declineCookies = () => {
    localStorage.setItem("cookie_consent", "no");
    setConsent("no");
  };

  if (consent !== "undecided") return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: "600px",
        height: "600px",
        background: "rgba(121, 25, 183, 0.90)",
        clipPath: "polygon(100% 0, 0 0, 100% 100%)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "flex-end",
        padding: "1rem",
        color: "#fff",
        fontFamily: "'Inter', sans-serif",
        zIndex: 1000,
        transform: show
          ? "scale(1) translateY(0)"
          : "scale(0.7) translateY(-50px)",
        opacity: show ? 1 : 0,
        transition: "transform 0.5s ease-out, opacity 0.5s ease-out",
      }}
    >
      <div style={{ marginTop: "8rem", textAlign: "right" }}>
        <p style={{ marginBottom: "0.5rem", fontSize: "0.9rem" }}>
          This site uses cookies so I can tell if anyone even visits. 😄
        </p>
        <p style={{ marginBottom: "0.5rem", fontSize: "0.9rem" }}>
          Please accept cookies to help me improve. ❤️
        </p>
        <p style={{ marginBottom: "0.5rem", fontSize: "0.9rem" }}>
          See{" "}
          <a
            href="https://www.kazvee.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#fff",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            main site
          </a>{" "}
          for privacy policy.
        </p>
        <div>
          <button
            type="button"
            onMouseEnter={() => setHovered("accept")}
            onMouseLeave={() => setHovered("")}
            onClick={acceptCookies}
            style={{
              backgroundColor:
                hovered === "accept"
                  ? "rgba(5, 104, 5, 0.9)"
                  : "rgba(0, 128, 0, 0.85)",
              color: "#fff",
              border: "1px solid #fff",
              borderRadius: "4px",
              padding: "0.3rem 0.6rem",
              cursor: "pointer",
              marginRight: "0.3rem",
              fontWeight: "600",
              fontSize: "0.7rem",
              transition: "background-color 0.2s ease",
            }}
          >
            Accept 🍪
          </button>
          <button
            type="button"
            onMouseEnter={() => setHovered("decline")}
            onMouseLeave={() => setHovered("")}
            onClick={declineCookies}
            style={{
              backgroundColor:
                hovered === "decline" ? "rgba(255,255,255,0.2)" : "transparent",
              color: "#fff",
              border: "1px solid #fff",
              borderRadius: "4px",
              padding: "0.3rem 0.6rem",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "0.7rem",
              transition: "background-color 0.2s ease",
            }}
          >
            Decline ☹️
          </button>
        </div>
      </div>
    </div>
  );
}
