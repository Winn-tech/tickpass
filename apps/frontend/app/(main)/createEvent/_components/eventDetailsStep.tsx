'use client';
import Image from 'next/image';
import { ArrowRight, X } from 'lucide-react';
import { FormData, UpdateFormData } from '../page';

function EventDetailsStep({
  formData,
  updateFormData,
  onNext,
  canProceed,
  tagInput,
  setTagInput
}: {
  formData: FormData;
  updateFormData: UpdateFormData;
  onNext: () => void;
  canProceed: boolean;
  tagInput: string;
  setTagInput: (value: string) => void;
}) {
  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      updateFormData('tags', [...formData.tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    updateFormData('tags', formData.tags.filter(t => t !== tag));
  };
  const CATEGORIES = [
    'All events',
   'Technology and Innovation',
   'Sports, Fitness and Wellness',
   'Comedy and Entertainment',
   'Business and Networking',
   'Art and Culture',
   'Spirituality and Religion',
   'Food and Vibes',
   'Dinner and Dinner Parties',
   'Music and Concerts',
   'Education and Workshops'
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold text-primary-900 mb-2">Event Details:</h2>
      <p className="text-accent-600 mb-8">Tell us about your event</p>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-primary-600 mb-2">
            Event Title *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => updateFormData('title', e.target.value)}
            placeholder="Enter event title"
            maxLength={150}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-primary-600 mb-2">
              Category *
            </label>
            <select
              value={formData.category}
              onChange={(e) => updateFormData('category', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            >
              <option value="">Select a category</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat.toLowerCase()}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-primary-600 mb-2">
              Venue *
            </label>
            <input
              type="text"
              value={formData.venue}
              onChange={(e) => updateFormData('venue', e.target.value)}
              placeholder="Venue name"
              maxLength={200}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-primary-600 mb-2">
            Description *
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => updateFormData('description', e.target.value)}
            placeholder="Describe your event"
            maxLength={2000}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
          />
          <p className="text-sm text-gray-500 mt-1">
            {formData.description.length}/2000 characters
          </p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-primary-600 mb-2">
            Event Image
          </label>
          {formData.imageUrl ? (
            <div className="relative w-full h-48 border-2 border-green-400 rounded-xl overflow-hidden bg-gray-50">
              <Image
                src={URL.createObjectURL(formData.imageUrl as File)}
                alt="Event preview"
                fill
                unoptimized
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/50 bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer px-4 py-2 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-600 transition-all"
                >
                  Change Image
                </label>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    updateFormData('imageUrl', '');
                  }}
                  className="ml-2 px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all"
                >
                  Remove
                </button>
              </div>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={(e) => updateFormData('imageUrl', e.target.files?.[0] ?? '')}
                className="hidden"
              />
            </div>
          ) : (
            <label
              htmlFor="image-upload"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all duration-200 hover:border-blue-400 group"
            >
              <svg className="w-8 h-8 mb-2 text-gray-400 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="text-sm text-gray-500 font-medium">
                <span className="text-blue-500">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF up to 10MB</p>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={(e) => updateFormData('imageUrl', e.target.files?.[0] ?? '')}
                className="hidden"
              />
            </label>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Tags
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              placeholder="Add a tag"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
            <button
              onClick={addTag}
              type="button"
              className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-all"
            >
              Add
            </button>
          </div>
          {formData.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {formData.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                >
                  {tag}
                  <button onClick={() => removeTag(tag)} className="hover:text-blue-900">
                    <X className="w-4 h-4" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end mt-8">
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


export default EventDetailsStep;
