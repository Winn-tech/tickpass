import { AddEventIcon } from '@/assets/addEventSVG';
import { ArrowRight } from 'lucide-react';


function WelcomeStep({ onGetStarted, isTransitioning }: { onGetStarted: () => void; isTransitioning: boolean }) {
  return (
    <div
      className={`flex items-center justify-center h-fit transition-all duration-500 ${
        isTransitioning ? 'opacity-0 -translate-y-8' : 'opacity-100 translate-y-0'
      }`}
    >
      <div className="text-center">
        <AddEventIcon className="mx-auto mb-4" size={120} />

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Create an Event
        </h1>

        <p className="text-xl text-gray-600 mb-6">
          Create an event in just three easy steps.
        </p>

        <button
          onClick={onGetStarted}
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          Get Started
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default WelcomeStep;