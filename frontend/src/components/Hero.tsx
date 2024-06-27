import { ArrowRight, Sparkles } from 'lucide-react';

const Hero = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-black px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
          Lorem ipsum dolor sit amet
        </h1>
        <p className="text-xl sm:text-2xl text-black mb-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="px-6 py-3 bg-white text-green-600 rounded-full font-semibold shadow-lg hover:bg-opacity-90 transition duration-300 ease-in-out flex items-center justify-center">
            Lorem ipsum
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
          <button className="px-6 py-3 bg-green-600 text-white rounded-full font-semibold shadow-lg hover:bg-green-700 transition duration-300 ease-in-out flex items-center justify-center">
            Lorem ipsum
            <Sparkles className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;