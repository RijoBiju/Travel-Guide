const Hero = () => {
  return (
    <div className="relative text-center space-y-8">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-secondary/10 rounded-full blur-3xl animate-pulse-slow delay-1000" />
        <div className="absolute top-1/2 right-1/3 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse-slow delay-2000" />
      </div>

      {/* Logo placeholder */}
      <div className="relative z-10 flex justify-center mb-6">
        <div className="w-20 h-20 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-glow">
          <div className="w-12 h-12 rounded-xl bg-background/20 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-primary-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="relative z-10">
        <h1 className="text-6xl md:text-7xl font-bold text-foreground mb-5">
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text inline-block p-2">
            Explore
          </span>
          <br />
          <span className="text-foreground">The World</span>
        </h1>

        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Discover amazing destinations and search for your perfect getaway with
          our intuitive platform
        </p>
      </div>
    </div>
  );
};

export default Hero;
