import Image from 'next/image';
import { FormData } from '../page';
import Link from 'next/link';

type SummaryStepProps = {
  formData: FormData;
};

export default function SummaryStep({ formData }: SummaryStepProps) {
  const formatDate = (date: string | Date) => {
    if (!date) return 'N/A';
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Event Created Successfully!
        </h2>
        <p className="text-gray-600">
          Here&apos;s a summary of your event details
        </p>
      </div>

      <div className="space-y-6">
        {/* Event Details Section */}
        <div className="border-b pb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Event Details
          </h3>
          <div className="space-y-3">
            <SummaryItem label="Title" value={formData.title} />
            <SummaryItem label="Category" value={formData.category} />
            <SummaryItem label="Description" value={formData.description} />
            <SummaryItem label="Venue" value={formData.venue} />
            {formData.tags.length > 0 && (
              <div>
                <p className="text-sm font-medium text-gray-700">Tags</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {formData.imageUrl && (
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Event Image</p>
                <Image
                  src={typeof formData.imageUrl === 'string' ? formData.imageUrl : URL.createObjectURL(formData.imageUrl)}
                  alt="Event"
                  width={640}
                  height={320}
                  unoptimized
                  className="h-48 w-full max-w-md rounded-lg object-cover"
                />
              </div>
            )}
          </div>
        </div>

        <div className="border-b pb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Location & Time
          </h3>
          <div className="space-y-3">
            <SummaryItem label="Start Date" value={formatDate(formData.startDate)} />
            <SummaryItem label="End Date" value={formatDate(formData.endDate)} />
            <SummaryItem label="Time" value={formData.time} />
            <SummaryItem label="Address" value={formData.locationAddress} />
            <SummaryItem
              label="City, State, ZIP"
              value={`${formData.locationCity}, ${formData.locationState} ${formData.locationZipCode}`}
            />
          </div>
        </div>

        {/* Organizer Section */}
        <div className="border-b pb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Organizer Information
          </h3>
          <div className="space-y-3">
            <SummaryItem label="Name" value={formData.organizerName} />
            <SummaryItem label="Email" value={formData.organizerEmail} />
            <SummaryItem label="Phone" value={formData.organizerPhone} />
          </div>
        </div>

        {/* Ticket Classes Section */}
        <div className="pb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Ticket Classes
          </h3>
          <div className="space-y-4">
            {formData.ticketClasses.map((ticket, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-4 border border-gray-200"
              >
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Class Name</p>
                    <p className="text-gray-900">{ticket.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Price</p>
                    <p className="text-gray-900">${ticket.price.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Capacity</p>
                    <p className="text-gray-900">{ticket.capacity}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center pt-6">
        <Link
          href="/"
          className="px-8 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          Back to Homepage
        </Link>
      </div>
    </div>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm font-medium text-gray-700">{label}</p>
      <p className="text-gray-900 mt-1">{value}</p>
    </div>
  );
}
