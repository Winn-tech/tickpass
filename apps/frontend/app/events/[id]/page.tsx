import Image from 'next/image'
import { getSingleEvent } from '@/app/utils/eventsApi'
import { Calendar, Clock, MapPin, User, Tag } from 'lucide-react'
import {
  formattedDate,
  formattedLocation,
} from '../../utils/eventsReusableFunctions';


const SingleEvent = async({ params, searchParams }: { params: Promise<{ slug: string }>, searchParams: Promise<{ id: string } > }) => {
    const { id } = await searchParams
    const eventDetail = await getSingleEvent(id)
    const {imageUrl, title, time, basePrice, startDate, description, category, location, organizer } = eventDetail.data
    const date = formattedDate(startDate)
    const eventlocation = formattedLocation(location)
    

    const organizerName = typeof organizer === 'object' ? organizer.name : organizer
    const organizerEmail = typeof organizer === 'object' ? organizer.email : null
    const organizerPhone = typeof organizer === 'object' ? organizer.phone : null

  return (
    <section className="min-h-screen bg-gray-50 relative">
      <div className='relative w-full h-[300px] md:h-[350px] bg-gray-200'>
          {imageUrl ? (
            <>
              <Image 
                src={imageUrl} 
                alt={title} 
                fill 
                className='object-cover'
                priority
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />
            </>
          ) : (
            <div className='w-full h-full flex items-center justify-center bg-gray-300'>
              <p className='text-gray-500 text-lg'>No image available</p>
            </div>
          )}
      </div>

      <div className='max-w-7xl mx-auto px-4 py-8 md:py-12'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        
          <div className='lg:col-span-2 space-y-6'>
            <div>
              <div className='flex items-center gap-2 mb-3'>
                <span className='inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-primary-900 rounded-full text-sm font-medium'>
                  <Tag className='w-4 h-4' />
                  {category}
                </span>
              </div>
              <h1 className='text-3xl md:text-4xl font-bold text-primary-900 mb-4'>
                {title}
              </h1>
            </div>

            <div className='bg-white rounded-lg shadow-sm border border-gray-100 p-6'>
              <h2 className='text-xl font-bold text-accent-900 mb-4'>Event Description</h2>
              <p className='text-gray-700 leading-relaxed whitespace-pre-line'>
                {description}
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <div className='flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm border border-gray-100'>
                <Calendar className='w-5 h-5 text-primary-600 mt-0.5 shrink-0' />
                <div>
                  <p className='text-xs text-accent-500 mb-1'>Date</p>
                  <p className='text-sm font-semibold text-gray-900'>{date}</p>
                </div>
              </div>
              
              <div className='flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm border border-gray-100'>
                <Clock className='w-5 h-5 text-primary-600 mt-0.5 shrink-0' />
                <div>
                  <p className='text-xs text-accent-500 mb-1'>Time</p>
                  <p className='text-sm font-semibold text-gray-900'>{time}</p>
                </div>
              </div>
              
              <div className='flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm border border-gray-100'>
                <MapPin className='w-5 h-5 text-primary-600 mt-0.5 shrink-0' />
                <div>
                  <p className='text-xs text-accent-500 mb-1'>Location</p>
                  <p className='text-sm font-semibold text-gray-900'>{eventlocation}</p>
                </div>
              </div>
            </div>

            <div className='bg-white rounded-lg shadow-sm border border-gray-100 p-6'>
              <h2 className='text-xl font-bold text-accent-900 mb-4'>Organizer</h2>
              <div className='flex items-start gap-4'>
                <div className='w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0'>
                  <User className='w-6 h-6 text-white' />
                </div>
                <div>
                  <p className='font-semibold text-gray-900'>{organizerName}</p>
                  <p className='text-sm text-gray-500 mb-2'>Event Organizer</p>
                  {organizerEmail && (
                    <p className='text-sm text-gray-600'>
                      <span className='font-medium'>Email:</span> {organizerEmail}
                    </p>
                  )}
                  {organizerPhone && (
                    <p className='text-sm text-gray-600'>
                      <span className='font-medium'>Phone:</span> {organizerPhone}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className='lg:col-span-1 ' >
            <div className='bg-white rounded-lg shadow-lg border border-gray-200 p-6 lg:sticky lg:top-6'>
              <div className='mb-6'>
                <p className='text-sm text-accent-500 mb-1'>Starting from</p>
                <p className='text-4xl font-bold text-primary-900'>
                  ₦{basePrice.toLocaleString()}
                </p>
              </div>

              <div className='space-y-4 mb-6 py-6 border-y border-gray-100'>
                <div className='flex items-center justify-between text-sm'>
                  <span className='text-gray-600 flex items-center gap-2'>
                    <Calendar className='w-4 h-4' />
                    Date
                  </span>
                  <span className='font-medium text-gray-900'>{date}</span>
                </div>
                
                <div className='flex items-center justify-between text-sm'>
                  <span className='text-gray-600 flex items-center gap-2'>
                    <Clock className='w-4 h-4' />
                    Time
                  </span>
                  <span className='font-medium text-gray-900'>{time}</span>
                </div>
                
                <div className='flex items-center justify-between text-sm'>
                  <span className='text-gray-600 flex items-center gap-2'>
                    <MapPin className='w-4 h-4' />
                    Location
                  </span>
                  <span className='font-medium text-gray-900'>{eventlocation}</span>
                </div>
              </div>

              <button className='w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg'>
                Reserve a Spot
              </button>

              <p className='text-xs text-accent-500 text-center mt-4'>
                You won't be charged yet
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='fixed bottom-[50vh] right-3 rounded w-fit block md:hidden bg-accent-500/90 py-4 px-6 shadow-lg cursor-pointer hover:scale-x-500 transition-all duration-200'>
          <div className='flex gap-2 w-fit items-center'>
              <p className='flex flex-col'>
                  <span>Starting from:</span>
                  <span className='text-primary-400 font-medium'> ₦{basePrice.toLocaleString()}</span>
              </p>
                <p className='font-bold text-white text-xl'>Reserve a Spot</p>
          </div>
      </div>
    </section>
  )
}

export default SingleEvent