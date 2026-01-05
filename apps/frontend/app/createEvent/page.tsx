'use client';
import { useState } from 'react';
import WelcomeStep from './_components/welcomeStep';
import EventDetailsStep from './_components/eventDetailsStep';
import LocationTimeStep from './_components/locationTimeStep';
import OrganizerTicketsStep from './_components/organizerTicketStep';
import SummaryStep from './_components/summaryStep';
import { createEvent } from '../utils/eventsApi';
import { CreateEventDto } from '@shared/types/eventTypes';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;

type TicketClass = {
  name: string;
  price: number;
  capacity: number;
};

export type FormData = {
  title: string;
  category: string;
  description: string;
  venue: string;
  imageUrl: string | File;
  tags: string[];
  startDate: string | Date;
  endDate: string | Date;
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

type Step = -1 | 0 | 1 | 2 | 3;

export type UploadState = {
  isUploading: boolean;
  progress: number;
  error: string | null;
};

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
  
  const [uploadState, setUploadState] = useState<UploadState>({
    isUploading: false,
    progress: 0,
    error: null
  });

  const handleNext = () => {
    if (currentStep < 3) {
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

  const uploadImageToCloudinary = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
      formData.append('folder', 'tickets_images');

      const xhr = new XMLHttpRequest();
      
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const percentComplete = Math.round((e.loaded / e.total) * 100);
          setUploadState(prev => ({ ...prev, progress: percentComplete }));
        }
      });

      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          resolve(response.secure_url);
        } else {
          reject(new Error('Upload failed'));
        }
      });

      xhr.addEventListener('error', () => { 
        reject(new Error('Network error during upload'));
      });

      xhr.open('POST', `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`);
      xhr.send(formData);
    });
  };

  const handleFinalSubmit = async () => {
    setUploadState({ isUploading: true, progress: 0, error: null });

    const toastId = toast.loading('Creating event...');

    try {
      let finalImageUrl = formData.imageUrl;

      if (formData.imageUrl && formData.imageUrl instanceof File) {
        finalImageUrl = await uploadImageToCloudinary(formData.imageUrl);
        setFormData(prev => ({ ...prev, imageUrl: finalImageUrl }));
      }

      const finalData: CreateEventDto = {
        title: formData.title,
        category: formData.category,
        description: formData.description,
        venue: formData.venue,
        imageUrl: finalImageUrl as string,
        tags: formData.tags,
        startDate: formData.startDate,
        endDate: formData.endDate,
        time: formData.time,
        location: {
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
        },
        organizer: {
          name: formData.organizerName,
          email: formData.organizerEmail,
          phone: formData.organizerPhone,
        },
        ticketClasses: formData.ticketClasses,
      };

      await createEvent(finalData);
      
      toast.update(toastId, {
        render: 'Event created successfully!',
        type: 'success',
        isLoading: false,
        autoClose: 5000,
        closeButton: true,
      });
      setUploadState({ isUploading: false, progress: 100, error: null });
      
      // Move to summary step after successful creation
      handleNext();
    } catch (error) {

      toast.update(toastId, {
        render: error instanceof Error ? error.message : 'Failed to create event. Please try again.',
        type: 'error',
        isLoading: false,
        autoClose: 5000,
        closeButton: true,
      });
      
      setUploadState({
        isUploading: false,
        progress: 0,
        error: error instanceof Error ? error.message : 'Upload failed'
      });
    }
  };

  const handleRetry = () => {
    setUploadState({ isUploading: false, progress: 0, error: null });
  };

  const canProceedStep1 = Boolean(formData.title.trim() && formData.category && formData.description.trim() && formData.venue.trim());
  const canProceedStep2 = Boolean(formData.startDate && formData.endDate && formData.time && formData.address.trim() && formData.city.trim() && formData.state.trim() && formData.zipCode.trim());
  const canProceedStep3 = Boolean(formData.organizerName.trim() && formData.organizerEmail.trim() && formData.organizerPhone.trim() && formData.ticketClasses.length > 0);

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        
        {currentStep === -1 ? (
          <WelcomeStep onGetStarted={handleNext} isTransitioning={isTransitioning} />
        ) : currentStep === 3 ? (
          // Summary step - no step indicator
          <div
            className={`transition-opacity duration-300 ${
              isTransitioning ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 mt-8">
              <SummaryStep formData={formData} />
            </div>
          </div>
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
                  onSubmit={handleFinalSubmit}
                  uploadState={uploadState}
                  onRetry={handleRetry}
                />
              )}
            </div>
          </div>
        )}
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
                    ? 'bg-primary-700 text-white'
                    : isCurrent
                    ? 'bg-primary-400 text-white ring-4 ring-blue-200'
                    : 'bg-accent-500 text-white'
                }`}
              >
                {stepNum + 1}
              </div>
              <p className={`text-xs mt-2 font-medium ${isCurrent || isCompleted ? 'text-primary-600' : 'text-accent-500'}`}>
                {steps[stepNum]}
              </p>
            </div>

            {i < totalSteps - 1 && (
              <div
                className={`h-1 flex-1 mx-2 rounded transition-all duration-300 ${
                  isCompleted ? 'bg-primary-700' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}