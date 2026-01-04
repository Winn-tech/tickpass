import { ArrowRight, ArrowLeft, X, Upload, AlertCircle, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import { FormData, UploadState } from '../page';


function OrganizerTicketsStep({
  formData,
  updateFormData,
  onBack,
  canProceed,
  onSubmit,
  uploadState,
  onRetry
}: {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: any) => void;
  onBack: () => void;
  canProceed: boolean;
  onSubmit: () => void;
  uploadState: UploadState;
  onRetry: () => void;
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

  return (
    <div>
      <h2 className="text-3xl font-bold text-primary-900 mb-2">Organizer & Tickets</h2>
      <p className="text-accent-600 mb-8">Who's organizing and what tickets are available?</p>

      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Organizer Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-primary-600 mb-2">
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
                <label className="block text-sm font-semibold text-primary-600 mb-2">
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
                <label className="block text-sm font-semibold text-primary-600 mb-2">
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
          <h3 className="text-xl font-semibold text-primary-600 mb-4">Ticket Classes *</h3>
          <p className='text-accent-500'>Example: Gold, Silver, regular, general entry</p>
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
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all"
            >
              Add Ticket Class
            </button>
          </div>

          {formData.ticketClasses.length > 0 && (
            <div className="space-y-2">
              {formData.ticketClasses.map((ticket, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm border"
                >
                  <div>
                    <p className="font-medium">{ticket.name}</p>
                    <p className="text-sm text-gray-500">
                      Price: ${ticket.price.toFixed(2)} | Capacity: {ticket.capacity}
                    </p>
                  </div>
                  <button
                    onClick={() => removeTicketClass(index)}
                    className="text-red-600 hover:text-red-800 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
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
            onClick={onSubmit}
            disabled={!canProceed || uploadState.isUploading}
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200"
          >
            {uploadState.isUploading ? 'Uploading...' : 'Submit Event'}
            {uploadState.isUploading && (
              <RefreshCw className="w-5 h-5 animate-spin" />
            )}
          </button>
        </div>

        {uploadState.error && (
          <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            <p>{uploadState.error}</p>
            <button
              onClick={onRetry}
              className="ml-auto px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
            >
              Retry
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrganizerTicketsStep;