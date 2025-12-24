'use client'
import { ChevronDown, X, Calendar } from 'lucide-react'
import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'



const Filter = () => {
  const router = useRouter();
  const [category, setCategory] = useState('All events')
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 })
  const [dateRange, setDateRange] = useState({ start: '', end: '' })
  const [quickDate, setQuickDate] = useState('')
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState<'min' | 'max' | null>(null)
  const sliderRef = useRef<HTMLDivElement>(null)

  const slugify = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

  const searchParams = useSearchParams()

const updateQueryParams = (updates: Record<string, string | null>) => {
  const params = new URLSearchParams(searchParams.toString())

  Object.entries(updates).forEach(([key, value]) => {
    if (!value) params.delete(key)
    else params.set(key, value)
  })

  router.push(`/events?${params.toString()}`)
}

  const categories = [
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
    'Education and Workshops',
    'Others',
  ]

  const getValueFromPosition = useCallback((clientX: number) => {
    if (!sliderRef.current) return 0
    
    const slider = sliderRef.current
    const rect = slider.getBoundingClientRect()
    let percentage = (clientX - rect.left) / rect.width
    percentage = Math.max(0, Math.min(1, percentage))
    return Math.round(percentage * 100000)
  }, [])

  const handleDragStart = useCallback((type: 'min' | 'max', e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(type)
  }, [])

  const handleDragMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDragging || !sliderRef.current) return
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const newValue = getValueFromPosition(clientX)
    
    if (isDragging === 'min') {
      setPriceRange(prev => ({
        ...prev,
        min: Math.min(Math.max(0, newValue), prev.max - 1000)
      }))
    } else {
      setPriceRange(prev => ({
        ...prev,
        max: Math.max(Math.min(100000, newValue), prev.min + 1000)
      }))
    }
  }, [isDragging, getValueFromPosition])

  const handleDragEnd = useCallback(() => {
    setIsDragging(null)
  }, [])

  // Add event listeners when dragging starts
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleDragMove)
      document.addEventListener('mouseup', handleDragEnd)
      document.addEventListener('touchmove', handleDragMove)
      document.addEventListener('touchend', handleDragEnd)
      
      return () => {
        document.removeEventListener('mousemove', handleDragMove)
        document.removeEventListener('mouseup', handleDragEnd)
        document.removeEventListener('touchmove', handleDragMove)
        document.removeEventListener('touchend', handleDragEnd)
      }
    }
  }, [isDragging, handleDragMove, handleDragEnd])

  // Prevent default touch behavior
  useEffect(() => {
    const preventDefault = (e: TouchEvent) => {
      if (isDragging) e.preventDefault()
    }
    
    document.addEventListener('touchmove', preventDefault, { passive: false })
    
    return () => {
      document.removeEventListener('touchmove', preventDefault)
    }
  }, [isDragging])

 const handleCategorySelect = (selectedCategory: string) => {
  setCategory(selectedCategory)

  updateQueryParams({
    category:
      selectedCategory === 'All events'
        ? null
        : slugify(selectedCategory),
  })

  setActiveFilter(null)
}


  const handlePriceApply = () => {
  updateQueryParams({
    'price[gte]': priceRange.min.toString(),
    'price[lte]': priceRange.max.toString(),
  })
  setActiveFilter(null)
}

const handlePriceClear = () => {
  setPriceRange({ min: 0, max: 100000 })

  updateQueryParams({
    'price[gte]': null,
    'price[lte]': null,
  })
}

 const handleDateApply = () => {
  updateQueryParams({
    'date[start]': dateRange.start || null,
    'date[end]': dateRange.end || null,
  })
  setActiveFilter(null)
}

const handleDateClear = () => {
  setDateRange({ start: '', end: '' })
  setQuickDate('')

  updateQueryParams({
    'date[start]': null,
    'date[end]': null,
  })
}


  const handleQuickDate = (option: string) => {
    setQuickDate(option)
    setDateRange({ start: '', end: '' })
  }

  const closeModal = () => {
    setActiveFilter(null)
  }

  const getDisplayPrice = () => {
    if (priceRange.min === 0 && priceRange.max === 100000) return 'Price'
    return `₦${priceRange.min.toLocaleString()} - ₦${priceRange.max.toLocaleString()}`
  }

  const getDisplayDate = () => {
    if (quickDate) return quickDate
    if (dateRange.start && dateRange.end) return `${dateRange.start} - ${dateRange.end}`
    return 'Date'
  }

  return (
    <section className='relative'>
      <div className='flex gap-5 flex-wrap'>
        <button 
          onClick={() => setActiveFilter(activeFilter === 'category' ? null : 'category')}
          className={`flex items-center gap-3 border-2 px-4 py-2 rounded-xl cursor-pointer transition-all ${
            activeFilter === 'category' 
              ? 'border-accent-400 bg-accent-400 text-white' 
              : 'border-accent-400 hover:bg-accent-50'
          }`}
        >
          <span className='font-bold'>{category}</span>
          <ChevronDown className={`transition-transform ${activeFilter === 'category' ? 'rotate-180' : ''}`} />
        </button>

        <button 
          onClick={() => setActiveFilter(activeFilter === 'price' ? null : 'price')}
          className={`flex items-center gap-3 border-2 px-4 py-2 rounded-xl cursor-pointer transition-all ${
            activeFilter === 'price' 
              ? 'border-accent-400 bg-accent-400 text-white' 
              : 'border-accent-400 hover:bg-accent-50'
          }`}
        >
          <span className='font-bold'>{getDisplayPrice()}</span>
          <ChevronDown className={`transition-transform ${activeFilter === 'price' ? 'rotate-180' : ''}`} />
        </button>

        <button 
          onClick={() => setActiveFilter(activeFilter === 'date' ? null : 'date')}
          className={`flex items-center gap-3 border-2 px-4 py-2 rounded-xl cursor-pointer transition-all ${
            activeFilter === 'date' 
              ? 'border-accent-400 bg-accent-400 text-white' 
              : 'border-accent-400 hover:bg-accent-50'
          }`}
        >
          <span className='font-bold'>{getDisplayDate()}</span>
          <ChevronDown className={`transition-transform ${activeFilter === 'date' ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {activeFilter && (
        <div 
          className='fixed inset-0 bg-black/50 z-40 animate-fadeIn'
          onClick={closeModal}
        />
      )}

      {/* Category Modal */}
      {activeFilter === 'category' && (
        <div className='fixed bottom-0 left-0 right-0 md:left-1/2 md:-translate-x-1/2 md:w-1/2 md:max-w-2xl bg-white rounded-t-3xl shadow-2xl z-50 animate-slideUp max-h-[80vh] overflow-hidden'>
          <div className='sticky top-0 bg-white border-b border-gray-200 px-6 py-4'>
            <div className='flex items-center justify-between'>
              <h3 className='text-xl font-bold text-gray-900'>Category</h3>
              <button onClick={closeModal} className='p-2 hover:bg-gray-100 rounded-full transition-colors'>
                <X className='w-6 h-6' />
              </button>
            </div>
          </div>
          <div className='px-6 py-4 space-y-2 overflow-y-auto max-h-[calc(80vh-80px)]'>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategorySelect(cat)}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                  category === cat
                    ? 'bg-accent-400 text-white font-semibold'
                    : 'hover:bg-gray-100 text-gray-700 border border-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Price Modal */}
      {activeFilter === 'price' && (
        <div className='fixed bottom-0 left-0 right-0 md:left-1/2 md:-translate-x-1/2 md:w-1/2 md:max-w-2xl bg-white rounded-t-3xl shadow-2xl z-50 animate-slideUp'>
          <div className='px-6 py-4 border-b border-gray-200'>
            <div className='flex items-center justify-between mb-6'>
              <h3 className='text-xl font-bold text-gray-900'>Price</h3>
              <button onClick={closeModal} className='p-2 hover:bg-gray-100 rounded-full transition-colors'>
                <X className='w-6 h-6' />
              </button>
            </div>

            {/* Dual Thumb Price Range Slider */}
            <div className='mb-8'>
              <div className='relative pt-8 pb-6' ref={sliderRef}>
                {/* Track Background */}
                <div className='absolute w-full h-2 bg-gray-200 rounded-lg top-1/2 -translate-y-1/2'></div>
                
                {/* Selected Range Track */}
                <div 
                  className='absolute h-2 bg-orange-500 rounded-lg top-1/2 -translate-y-1/2'
                  style={{
                    left: `${(priceRange.min / 100000) * 100}%`,
                    right: `${100 - (priceRange.max / 100000) * 100}%`
                  }}
                ></div>
                
                {/* Min Thumb */}
                <div 
                  className='absolute top-1/2 -translate-y-1/2' 
                  style={{ left: `${(priceRange.min / 100000) * 100}%` }}
                >
                  <div className='relative'>
                    <div 
                      className={`w-6 h-6 bg-white border-2 border-orange-500 rounded-full shadow-lg cursor-pointer transform -translate-x-1/2 hover:scale-110 transition-transform ${
                        isDragging === 'min' ? 'scale-110 ring-4 ring-orange-200' : ''
                      }`}
                      onMouseDown={(e) => handleDragStart('min', e)}
                      onTouchStart={(e) => handleDragStart('min', e)}
                    >
                      <div className='absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs font-semibold px-2 py-1 rounded whitespace-nowrap'>
                        ₦{priceRange.min.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Max Thumb */}
                <div 
                  className='absolute top-1/2 -translate-y-1/2' 
                  style={{ left: `${(priceRange.max / 100000) * 100}%` }}
                >
                  <div className='relative'>
                    <div 
                      className={`w-6 h-6 bg-white border-2 border-orange-500 rounded-full shadow-lg cursor-pointer transform -translate-x-1/2 hover:scale-110 transition-transform ${
                        isDragging === 'max' ? 'scale-110 ring-4 ring-orange-200' : ''
                      }`}
                      onMouseDown={(e) => handleDragStart('max', e)}
                      onTouchStart={(e) => handleDragStart('max', e)}
                    >
                      <div className='absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs font-semibold px-2 py-1 rounded whitespace-nowrap'>
                        ₦{priceRange.max.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Value Labels */}
              <div className='flex justify-between text-sm text-gray-500 mt-6'>
                <span>₦0</span>
                <span>₦100,000</span>
              </div>
            </div>

            {/* Price Inputs */}
            <div className='flex items-center gap-4 mb-6'>
              <div className='flex-1'>
                <label className='text-sm text-gray-500 mb-2 block'>Minimum amount</label>
                <input
                  type='number'
                  min='0'
                  max='100000'
                  value={priceRange.min}
                  onChange={(e) => {
                    const value = Number(e.target.value)
                    setPriceRange({ 
                      ...priceRange, 
                      min: Math.min(Math.max(0, value), priceRange.max - 1000) 
                    })
                  }}
                  className='w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-lg font-semibold focus:outline-none focus:border-accent-400'
                />
              </div>
              <span className='text-gray-400 mt-8'>—</span>
              <div className='flex-1'>
                <label className='text-sm text-gray-500 mb-2 block'>Maximum amount</label>
                <input
                  type='number'
                  min='0'
                  max='100000'
                  value={priceRange.max}
                  onChange={(e) => {
                    const value = Number(e.target.value)
                    setPriceRange({ 
                      ...priceRange, 
                      max: Math.max(Math.min(100000, value), priceRange.min + 1000) 
                    })
                  }}
                  className='w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-lg font-semibold focus:outline-none focus:border-accent-400'
                />
              </div>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className='px-6 py-4 flex items-center justify-between'>
            <button
              onClick={handlePriceClear}
              className='text-gray-700 font-semibold text-lg hover:text-gray-900'
            >
              Clear
            </button>
            <button
              onClick={handlePriceApply}
              className='bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-xl transition-colors'
            >
              Apply
            </button>
          </div>
        </div>
      )}

      {/* Date Modal */}
      {activeFilter === 'date' && (
        <div className='fixed bottom-0 left-0 right-0 md:left-1/2 md:-translate-x-1/2 md:w-1/2 md:max-w-2xl bg-white rounded-t-3xl shadow-2xl z-50 animate-slideUp'>
          <div className='px-6 py-4 border-b border-gray-200'>
            <div className='flex items-center justify-between mb-6'>
              <h3 className='text-xl font-bold text-gray-900'>Date</h3>
              <button onClick={closeModal} className='p-2 hover:bg-gray-100 rounded-full transition-colors'>
                <X className='w-6 h-6' />
              </button>
            </div>

            {/* Quick Date Options */}
            <div className='flex gap-3 mb-6 overflow-x-auto pb-2'>
              {['Today', 'Tomorrow', 'This weekend'].map((option) => (
                <button
                  key={option}
                  onClick={() => handleQuickDate(option)}
                  className={`px-6 py-2 rounded-full whitespace-nowrap transition-all ${
                    quickDate === option
                      ? 'bg-gray-900 text-white'
                      : 'border-2 border-gray-300 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>

            {/* Date Inputs */}
            <div className='flex items-center gap-4 mb-6'>
              <div className='flex-1'>
                <div className='relative'>
                  <Calendar className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5' />
                  <input
                    type='date'
                    value={dateRange.start}
                    onChange={(e) => {
                      setDateRange({ ...dateRange, start: e.target.value })
                      setQuickDate('')
                    }}
                    placeholder='Start Date'
                    className='w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-accent-400 text-gray-600'
                  />
                </div>
              </div>
              <span className='text-gray-400'>to</span>
              <div className='flex-1'>
                <div className='relative'>
                  <Calendar className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5' />
                  <input
                    type='date'
                    value={dateRange.end}
                    onChange={(e) => {
                      setDateRange({ ...dateRange, end: e.target.value })
                      setQuickDate('')
                    }}
                    placeholder='End Date'
                    className='w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-accent-400 text-gray-600'
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className='px-6 py-4 flex items-center justify-between'>
            <button
              onClick={handleDateClear}
              className='text-gray-700 font-semibold text-lg hover:text-gray-900'
            >
              Clear
            </button>
            <button
              onClick={handleDateApply}
              className='bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-xl transition-colors'
            >
              Apply
            </button>
          </div>
        </div>
      )}

      <p className='my-5 text-accent-300 text-2xl font-bold'>
        {category === 'All events' ? 'Popular Events' : category}
      </p>

      <style jsx>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </section>
  )
}

export default Filter