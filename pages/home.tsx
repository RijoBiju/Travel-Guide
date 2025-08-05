import Hero from "@/components/Hero";
import { useRouter } from "next/router";

const LandingPage = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="relative z-10 container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto flex flex-col items-center justify-center">
          <div className="mb-20">
            <Hero />
          </div>

          <div
            onClick={() => router.push(`/auth/login`)}
            className="flex items-center justify-center bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 rounded w-50 p-6 cursor-pointer"
          >
            Get Started
          </div>

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
