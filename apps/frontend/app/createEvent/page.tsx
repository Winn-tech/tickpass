'use client';

import { useState } from 'react';
import { Plus, ArrowRight, ArrowLeft, X } from 'lucide-react';
import { AddEventIcon } from '@/assets/addEventSVG';

type TicketClass = {
  name: string;
  price: number;
  capacity: number;
};

type FormData = {
  title: string;
  category: string;
  description: string;
  venue: string;
  imageUrl: string;
  tags: string[];
  startDate: string;
  endDate: string;
  time: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  organizerName: string;
  organizerEmail: string;
  organizerPhone: string;
  ticketClasses: TicketClass[];
};

type Step = -1 | 0 | 1 | 2;

const CATEGORIES = [
  'Conference',
  'Workshop',
  'Seminar',
  'Networking',
  'Concert',
  'Festival',
  'Sports',
  'Other'
];

export default function CreateEventPage() {
  const [currentStep, setCurrentStep] = useState<Step>(-1);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    category: '',
    description: '',
    venue: '',
    imageUrl: '',
    tags: [],
    startDate: '',
    endDate: '',
    time: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    organizerName: '',
    organizerEmail: '',
    organizerPhone: '',
    ticketClasses: []
  });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [tagInput, setTagInput] = useState('');

  const handleNext = () => {
    if (currentStep < 2) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentStep((prev) => (prev + 1) as Step);
        setIsTransitioning(false);
      }, 300);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentStep((prev) => (prev - 1) as Step);
        setIsTransitioning(false);
      }, 300);
    }
  };

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const canProceedStep1 = Boolean(formData.title.trim() && formData.category && formData.description.trim() && formData.venue.trim());
  const canProceedStep2 = Boolean(formData.startDate && formData.endDate && formData.time && formData.address.trim() && formData.city.trim() && formData.state.trim() && formData.zipCode.trim());
  const canProceedStep3 = Boolean(formData.organizerName.trim() && formData.organizerEmail.trim() && formData.organizerPhone.trim() && formData.ticketClasses.length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {currentStep === -1 ? (
          <WelcomeStep onGetStarted={handleNext} isTransitioning={isTransitioning} />
        ) : (
          <div
            className={`transition-opacity duration-300 ${
              isTransitioning ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <StepIndicator currentStep={currentStep} totalSteps={3} />
            
            <div className="bg-white rounded-2xl shadow-xl p-8 mt-8">
              {currentStep === 0 && (
                <EventDetailsStep
                  formData={formData}
                  updateFormData={updateFormData}
                  onNext={handleNext}
                  canProceed={canProceedStep1}
                  tagInput={tagInput}
                  setTagInput={setTagInput}
                />
              )}
              
              {currentStep === 1 && (
                <LocationTimeStep
                  formData={formData}
                  updateFormData={updateFormData}
                  onNext={handleNext}
                  onBack={handleBack}
                  canProceed={canProceedStep2}
                />
              )}
              
              {currentStep === 2 && (
                <OrganizerTicketsStep
                  formData={formData}
                  updateFormData={updateFormData}
                  onBack={handleBack}
                  canProceed={canProceedStep3}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function WelcomeStep({ onGetStarted, isTransitioning }: { onGetStarted: () => void; isTransitioning: boolean }) {
  return (
    <div
      className={`flex items-center justify-center min-h-screen transition-all duration-500 ${
        isTransitioning ? 'opacity-0 -translate-y-8' : 'opacity-100 translate-y-0'
      }`}
    >
      <div className="text-center">
        <AddEventIcon className="mx-auto mb-6" size={120} />
        
        <h1 className="text-3xl font-bold text-primary-900 mb-4">
          Create an Event
        </h1>
        
        <p className="text-xl text-accent-600 mb-12">
          Create an event in just three easy steps.
        </p>
        
        <button
          onClick={onGetStarted}
          className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          Get Started
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

function StepIndicator({ currentStep, totalSteps }: { currentStep: Step; totalSteps: number }) {
  const steps = ['Event Details', 'Location & Time', 'Organizer & Tickets'];
  
  return (
    <div className="flex items-center justify-between max-w-2xl mx-auto">
      {Array.from({ length: totalSteps }, (_, i) => {
        const stepNum = i;
        const isCompleted = currentStep > stepNum;
        const isCurrent = currentStep === stepNum;
        
        return (
          <div key={i} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold transition-all duration-300 ${
                  isCompleted
                    ? 'bg-accent-500 text-white'
                    : isCurrent
                    ? 'bg-primary-600 text-white ring-4 ring-primary-200'
                    : 'bg-accent-200 text-gray-500'
                }`}
              >
                {stepNum + 1}
              </div>
              <p className={`text-xs mt-2 font-medium ${isCurrent ? 'text-blue-600' : 'text-gray-500'}`}>
                {steps[stepNum]}
              </p>
            </div>
            
            {i < totalSteps - 1 && (
              <div
                className={`h-1 flex-1 mx-2 rounded transition-all duration-300 ${
                  isCompleted ? 'bg-green-500' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function EventDetailsStep({
  formData,
  updateFormData,
  onNext,
  canProceed,
  tagInput,
  setTagInput
}: {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: any) => void;
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

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-2">Event Details</h2>
      <p className="text-gray-600 mb-8">Tell us about your event</p>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
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
            <label className="block text-sm font-semibold text-gray-700 mb-2">
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
            <label className="block text-sm font-semibold text-gray-700 mb-2">
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
          <label className="block text-sm font-semibold text-gray-700 mb-2">
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
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Image URL
          </label>
          <input
            type="url"
            value={formData.imageUrl}
            onChange={(e) => updateFormData('imageUrl', e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
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
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-2">Location & Time</h2>
      <p className="text-gray-600 mb-8">When and where is your event?</p>
      
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Start Date *
            </label>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => updateFormData('startDate', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              End Date *
            </label>
            <input
              type="date"
              value={formData.endDate}
              onChange={(e) => updateFormData('endDate', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
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
          <label className="block text-sm font-semibold text-gray-700 mb-2">
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
            <label className="block text-sm font-semibold text-gray-700 mb-2">
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
            <label className="block text-sm font-semibold text-gray-700 mb-2">
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
            <label className="block text-sm font-semibold text-gray-700 mb-2">
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
          className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-200"
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

function OrganizerTicketsStep({
  formData,
  updateFormData,
  onBack,
  canProceed
}: {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: any) => void;
  onBack: () => void;
  canProceed: boolean;
}) {
  const [ticketName, setTicketName] = useState('');
  const [ticketPrice, setTicketPrice] = useState('');
  const [ticketCapacity, setTicketCapacity] = useState('');

  const addTicketClass = () => {
    if (ticketName.trim() && ticketPrice && ticketCapacity) {
      const newClass = {
        name: ticketName.trim(),
        price: parseFloat(ticketPrice),
        capacity: parseInt(ticketCapacity)
      };
      updateFormData('ticketClasses', [...formData.ticketClasses, newClass]);
      setTicketName('');
      setTicketPrice('');
      setTicketCapacity('');
    }
  };

  const removeTicketClass = (index: number) => {
    updateFormData('ticketClasses', formData.ticketClasses.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    alert('Event created successfully!');
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-2">Organizer & Tickets</h2>
      <p className="text-gray-600 mb-8">Who's organizing and what tickets are available?</p>
      
      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Organizer Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Name *
              </label>
              <input
                type="text"
                value={formData.organizerName}
                onChange={(e) => updateFormData('organizerName', e.target.value)}
                placeholder="John Doe"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.organizerEmail}
                  onChange={(e) => updateFormData('organizerEmail', e.target.value)}
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone *
                </label>
                <input
                  type="tel"
                  value={formData.organizerPhone}
                  onChange={(e) => updateFormData('organizerPhone', e.target.value)}
                  placeholder="+1234567890"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Ticket Classes *</h3>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <div className="grid grid-cols-3 gap-3 mb-3">
              <input
                type="text"
                value={ticketName}
                onChange={(e) => setTicketName(e.target.value)}
                placeholder="Class name"
                maxLength={50}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
              <input
                type="number"
                value={ticketPrice}
                onChange={(e) => setTicketPrice(e.target.value)}
                placeholder="Price"
                min="0"
                step="0.01"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
              <input
                type="number"
                value={ticketCapacity}
                onChange={(e) => setTicketCapacity(e.target.value)}
                placeholder="Capacity"
                min="1"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <button
              onClick={addTicketClass}
              type="button"
              className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all"
            >
              Add Ticket Class
            </button>
          </div>

          {formData.ticketClasses.length > 0 && (
            <div className="space-y-2">
              {formData.ticketClasses.map((ticket, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{ticket.name}</p>
                    <p className="text-sm text-gray-600">
                      ${ticket.price.toFixed(2)} • Capacity: {ticket.capacity}
                    </p>
                  </div>
                  <button
                    onClick={() => removeTicketClass(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="flex justify-between mt-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-200"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
        
        <button
          onClick={handleSubmit}
          disabled={!canProceed}
          className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200"
        >
          Create Event
        </button>
      </div>
    </div>
  );
}