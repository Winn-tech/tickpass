'use client';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { DayPicker, DateRange } from 'react-day-picker';
import { useState } from 'react';
import 'react-day-picker/dist/style.css';
import { FormData } from '../page';

function LocationTimeStep({
  formData,
  updateFormData,
  onNext,
  onBack,
  canProceed
}: {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: any) => void;
  onNext: () => void;
  onBack: () => void;
  canProceed: boolean;
}) {
  const [range, setRange] = useState<DateRange | undefined>();
  const [showPicker, setShowPicker] = useState(false);

  const handleRangeSelect = (selectedRange: DateRange | undefined) => {
    if (selectedRange) {
      setRange(selectedRange);

      if (selectedRange.from) {
        updateFormData('startDate', selectedRange.from.toISOString().split('T')[0]);
      }

      if (selectedRange.to) {
        updateFormData('endDate', selectedRange.to.toISOString().split('T')[0]);
      }
    }
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h2 className="text-3xl font-bold text-primary-900 mb-2">Location & Time</h2>
      <p className="text-accent-600 mb-8">When and where is your event?</p>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-primary-600 mb-2">
            Event Dates *
          </label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                value={typeof formData.startDate === 'string' ? formData.startDate : formData.startDate?.toISOString().split('T')[0] || ''}
                onFocus={() => setShowPicker(true)}
                placeholder="Start Date"
                readOnly
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all cursor-pointer"
              />
            </div>
            <div>
              <input
                type="text"
                value={typeof formData.endDate === 'string' ? formData.endDate : formData.endDate?.toISOString().split('T')[0] || ''}
                onFocus={() => setShowPicker(true)}
                placeholder="End Date"
                readOnly
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all cursor-pointer"
              />
            </div>
          </div>

          {showPicker && (
            <div className="border border-gray-300 rounded-lg p-4 bg-white mt-4 relative">
              <button
                onClick={() => setShowPicker(false)}
                className="absolute top-1 right-2 text-white hover:text-gray-600 bg-blue-400 px-4 py-2 rounded-md cursor-pointer"
              >
                Set
              </button>
              <DayPicker
                mode="range"
                selected={range}
                onSelect={handleRangeSelect}
                disabled={{ before: today }}
                numberOfMonths={2}
                modifiersClassNames={{
                  selected: 'bg-blue-600 text-white hover:bg-blue-700 rounded-md',
                  disabled: 'text-gray-600 cursor-not-allowed opacity-50',
                  range_middle: 'bg-blue-100',
                  range_start: 'bg-blue-600 text-white',
                  range_end: 'bg-blue-600 text-white'
                }}
                className="mx-auto"
              />
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-primary-600 mb-2">
            Time *
          </label>
          <input
            type="time"
            value={formData.time}
            onChange={(e) => updateFormData('time', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-primary-600 mb-2">
            Street Address *
          </label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => updateFormData('address', e.target.value)}
            placeholder="123 Main Street"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-primary-600 mb-2">
              City *
            </label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => updateFormData('city', e.target.value)}
              placeholder="City"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-primary-600 mb-2">
              State *
            </label>
            <input
              type="text"
              value={formData.state}
              onChange={(e) => updateFormData('state', e.target.value)}
              placeholder="State"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-primary-600 mb-2">
              Zip Code *
            </label>
            <input
              type="text"
              value={formData.zipCode}
              onChange={(e) => updateFormData('zipCode', e.target.value)}
              placeholder="12345"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 text-primary-600 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-200"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <button
          onClick={onNext}
          disabled={!canProceed}
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200"
        >
          Next
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default LocationTimeStep;
