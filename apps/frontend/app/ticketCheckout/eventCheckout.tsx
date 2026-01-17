'use client'
import React, { useState, useMemo, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import TicketSelection from './_components/stepOne'
import ContactInformation from './_components/stepTwo'
import Payment from './_components/stepThree'
import StepIndicator from './_components/stepIndicator'
import OrderSummary from './_components/orderSummary'
import ConfirmationModal from './_components/confirmationModal'
import {getTicketDetails} from '../utils/eventsApi'

import {
  TicketType,
  ContactInfo,
  CountryCode,
  SelectedTickets
} from '../../../shared/types/eventTypes'

const EventCheckout: React.FC = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const eventId = searchParams.get('id') || ''
  const [currentStep, setCurrentStep] = useState<number>(1)
  const [selectedTickets, setSelectedTickets] = useState<SelectedTickets>({})
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    firstName: '',
    lastName: '',
    email: '',
    confirmEmail: '',
    countryCode: '+1',
    phoneNumber: ''
  })
  const [showExitConfirm, setShowExitConfirm] = useState(false)
  const [showTimeoutModal, setShowTimeoutModal] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(600)
  const [ticketTypes, setTicketTypes] = useState<TicketType[]>([])
  const [eventTitle, setEventTitle] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    if (!eventId) return
    
    setIsLoading(true)
    getTicketDetails(eventId)
      .then(response => {
        console.log(response);
        if (response.status === 'success' && response.data) {
          const tickets: TicketType[] = response.data.ticketClasses.map((ticket: any, index: number) => ({
            id: index + 1,
            name: ticket.name,
            price: ticket.price,
            available: ticket.sold < ticket.capacity 
          }))
          
          setTicketTypes(tickets)
          setEventTitle(response.data.title)
        }
      })
      .catch(err => {
        console.error(err);
        // Optionally show an error message to the user
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [eventId])

  useEffect(() => {
    if (timeRemaining <= 0) {
      setShowTimeoutModal(true)
      return
    }

    const timer = setInterval(() => {
      setTimeRemaining(prev => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeRemaining])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`
  }

  const handleCloseClick = () => {
    setShowExitConfirm(true)
  }

  const handleGoHome = () => {
    router.push('/')
  }

  const countryCodes: CountryCode[] = [
    { code: '+234', country: 'NG' },
    { code: '+233', country: 'GH' },
  ]

  const handleTicketChange = (ticketId: number, quantity: number) => {
    setSelectedTickets(prev => {
      const updated = { ...prev }
      if (quantity === 0) {
        delete updated[ticketId]
      } else {
        updated[ticketId] = quantity
      }
      return updated
    })
  }

  const handleContactChange = (
    field: string,
    value: string
  ) => {
    setContactInfo(prev => ({ ...prev, [field]: value }))
  }

  const subtotal = useMemo(() => {
    return Object.entries(selectedTickets).reduce((sum, [id, qty]) => {
      const ticket = ticketTypes.find(t => t.id === Number(id))
      return sum + (ticket ? ticket.price * qty : 0)
    }, 0)
  }, [selectedTickets, ticketTypes])

  const total = subtotal

  const isStep1Valid = Object.keys(selectedTickets).length > 0

  const isStep2Valid =
    contactInfo.firstName.trim() !== '' &&
    contactInfo.lastName.trim() !== '' &&
    contactInfo.email === contactInfo.confirmEmail &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactInfo.email) &&
    contactInfo.phoneNumber.trim() !== ''

  const emailsMatch = contactInfo.email === contactInfo.confirmEmail

  const canContinue = () => {
    if (currentStep === 1) return isStep1Valid
    if (currentStep === 2) return isStep2Valid
    return true
  }

  const handleContinue = () => {
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1)
    } else {
      alert('Order submitted!')
    }
  }

  if (!eventId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold text-error-500 mb-4">
            Invalid Event
          </h2>
          <p className="text-gray-600 mb-6">
            No event ID provided. Please select an event to continue.
          </p>
          <button
            onClick={handleGoHome}
            className="px-6 py-2 bg-primary-700 text-white rounded-lg"
          >
            Go to Events
          </button>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-700 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading event details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <ConfirmationModal
        isOpen={showExitConfirm}
        title="Are you sure you want to leave?"
        message="Your ticket reservation will be released."
        confirmText="Leave"
        cancelText="Stay"
        onConfirm={handleGoHome}
        onCancel={() => setShowExitConfirm(false)}
        confirmDanger
      />

      <ConfirmationModal
        isOpen={showTimeoutModal}
        title="Time Expired"
        message="Your reservation has expired."
        confirmText="Go Home"
        cancelText=""
        onConfirm={handleGoHome}
        onCancel={() => {}}
      />
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary-700">
              Event Checkout
            </h1>
            {eventTitle && (
              <p className="text-gray-600 mt-2 capitalize">{eventTitle}</p>
            )}
          </div>

          <div className="flex items-center gap-4">
            <span
              className={`font-mono ${
                timeRemaining < 60 ? 'text-error-500' : 'text-gray-800'
              }`}
            >
              {formatTime(timeRemaining)}
            </span>

            <button
              onClick={handleCloseClick}
              className="w-10 h-10 rounded-full bg-white border"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
            <StepIndicator currentStep={currentStep} />
            {currentStep === 1 && (
              <TicketSelection
                ticketTypes={ticketTypes}
                selectedTickets={selectedTickets}
                onTicketChange={handleTicketChange}
              />
            )}

            {currentStep === 2 && (
              <ContactInformation
                contactInfo={contactInfo}
                countryCodes={countryCodes}
                emailsMatch={emailsMatch}
                onContactChange={handleContactChange}
              />
            )}

            {currentStep === 3 && <Payment total={total} />}
          </div>

          <OrderSummary
            selectedTickets={selectedTickets}
            ticketTypes={ticketTypes}
            subtotal={subtotal}
            total={total}
            currentStep={currentStep}
            canContinue={canContinue()}
            onContinue={handleContinue}
          />
        </div>
      </div>
    </div>
  )
}

export default EventCheckout