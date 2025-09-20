import OriginalLayout from "@theme-original/Layout";
import CookieBanner from "@site/src/components/CookieBanner";

export default function LayoutWrapper(props) {
  return (
    <>
      <OriginalLayout {...props} />
      <CookieBanner />
    </>
  );
}
