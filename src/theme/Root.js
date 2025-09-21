import CookieBanner from "@site/src/components/CookieBanner";

export default function Root({ children }) {
  return (
    <>
      {children}
      <CookieBanner />
    </>
  );
}
