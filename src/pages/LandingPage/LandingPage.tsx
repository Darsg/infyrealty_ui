function LandingPage() {
  return (
    <div className="w-screen h-screen overflow-hidden bg-white dark:bg-gray-900">
      <div className="flex flex-col justify-center items-center w-full h-full lg:flex-row">
        <div className="hidden w-full h-full lg:w-1/2 bg-brand-950 dark:bg-white/5 lg:flex items-center justify-center">
          {/* Add any content inside this div if needed */}
          <p className="text-white">Full Screen Content</p>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
