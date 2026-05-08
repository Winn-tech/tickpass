'use client'

import React from 'react'
import { TicketType, SelectedTickets } from '@shared/types/eventTypes'

interface Props {
  selectedTickets: SelectedTickets
  ticketTypes: TicketType[]
  total: number
  currentStep: number
  canContinue: boolean
  onContinue: () => void
}

const OrderSummary: React.FC<Props> = ({
  selectedTickets,
  ticketTypes,
  total,
  currentStep,
  canContinue,
  onContinue
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md sticky top-8">
      <h3 className="text-xl font-semibold mb-4">Order Summary</h3>

      <div className="space-y-2">
        {Object.entries(selectedTickets).map(([id, qty]) => {
          const ticket = ticketTypes.find(t => t.id === Number(id))
          if (!ticket) return null
          return (
            <div key={id} className="flex justify-between text-sm">
              <span>{Number(qty)} × {ticket.name}</span>
              <span>&#8358;{(ticket.price * Number(qty)).toFixed(2)}</span>
            </div>
          )
        })}
      </div>

      <div className="border-t mt-4 pt-4">
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>&#8358;{total.toFixed(2)}</span>
        </div>
      </div>

      <button
        disabled={!canContinue}
        onClick={onContinue}
        className={`w-full mt-6 py-3 rounded-md ${
          canContinue
            ? 'bg-primary-600 text-white'
            : 'bg-gray-300 text-gray-500'
        }`}
      >
        {currentStep === 3 ? 'Complete Order' : 'Continue'}
      </button>
    </div>
  )
}

export default OrderSummary
