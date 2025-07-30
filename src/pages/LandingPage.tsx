import Hero from "../components/Hero";
import FeatureSearch from "../components/FeatureCard";
// import searchIcon from "../assets/search-icon-light.png";
// import mapIcon from "../assets/map-icon-light.png";

const LandingPage = () => {
  // const handleSearchClick = () => {
  //   console.log("Search destination clicked");
  // };

  // const handleExploreClick = () => {
  //   console.log("Explore clicked");
  // };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute top-40 right-32 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse-slow delay-1000" />
        <div className="absolute bottom-32 left-1/3 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-pulse-slow delay-2000" />
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Hero section */}
          <div className="mb-20">
            <Hero />
          </div>

          {/* Feature cards - centered */}
          <div className="flex justify-center">
            <FeatureSearch></FeatureSearch>
            {/* <FeatureCard
                image={searchIcon}
                title="Search Destination"
                onClick={handleSearchClick}
                className="transform hover:rotate-1"
              />
              
              <FeatureCard
                image={mapIcon}
                title="Explore"
                onClick={handleExploreClick}
                className="transform hover:-rotate-1"
              /> */}
          </div>

          {/* Bottom decoration */}
          <div className="mt-20 text-center">
            <div className="inline-flex items-center space-x-2 text-muted-foreground">
              <div className="w-8 h-px bg-gradient-primary"></div>
              <span className="text-sm">Ready to begin your journey?</span>
              <div className="w-8 h-px bg-gradient-primary"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(hsl(var(--border))_1px,transparent_1px)] [background-size:50px_50px] opacity-10" />
    </div>
  );
};

export default LandingPage;
