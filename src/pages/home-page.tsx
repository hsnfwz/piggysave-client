import Auth0Features from "../components/auth0-features";
import HeroBanner from "../components/hero-banner";
import PageLayout from "../components/page-layout";

function HomePage() {
  return (
    <PageLayout>
      <HeroBanner />
      <Auth0Features />
    </PageLayout>
  );
};

export default HomePage;
