import Hero from "../components/Hero";
import FeatureSearch from "../components/FeatureCard";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 overflow-hidden">
      {/* Main content */}
      <div className="relative z-10 container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Hero section */}
          <div className="mb-20">
            <Hero />
          </div>

          {/* Feature cards - centered */}
          <div className="relative max-w-xl mx-auto">
            <FeatureSearch></FeatureSearch>
            {/* Place this directly under your FeatureSearch or input */}
            <ul className="absolute w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg overflow-auto max-h-60 z-50">
              <li className="cursor-pointer px-4 py-2 text-gray-700 hover:bg-gray-100">
                Paris, France
              </li>
              <li className="cursor-pointer px-4 py-2 text-gray-700 hover:bg-gray-100">
                New York, USA
              </li>
              <li className="cursor-pointer px-4 py-2 text-gray-700 hover:bg-gray-100">
                Tokyo, Japan
              </li>
              <li className="cursor-pointer px-4 py-2 text-gray-700 hover:bg-gray-100">
                Sydney, Australia
              </li>
              <li className="cursor-pointer px-4 py-2 text-gray-700 hover:bg-gray-100">
                Cape Town, South Africa
              </li>
            </ul>
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
    </div>
  );
};

export default LandingPage;
