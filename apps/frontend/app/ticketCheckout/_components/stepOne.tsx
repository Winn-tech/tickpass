'use client'

import React from 'react'
import { TicketType, SelectedTickets } from '@shared/types/eventTypes'

interface Props {
  ticketTypes: TicketType[]
  selectedTickets: SelectedTickets
  onTicketChange: (ticketId: number, quantity: number) => void
}

const TicketSelection: React.FC<Props> = ({
  ticketTypes,
  selectedTickets,
  onTicketChange
}) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Select Your Tickets</h2>

      <div className="space-y-4">
        {ticketTypes.map(ticket => (
          <div
            key={ticket.id}
            className={`flex items-center justify-between p-4 border rounded-lg ${
              ticket.available ? 'border-gray-300' : 'border-gray-200 opacity-40'
            }`}
          >
            <div>
              <h3 className="font-semibold text-lg text-gray-800">{ticket.name}</h3>
              <p className="text-primary-600 font-medium">${ticket.price}</p>
              {!ticket.available && (
                <p className="text-sm text-error-500 mt-1">Sold Out</p>
              )}
            </div>

            <select
              disabled={!ticket.available}
              value={selectedTickets[ticket.id] || 0}
              onChange={(e) => onTicketChange(ticket.id, parseInt(e.target.value))}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              <option value={0}>0</option>
              {[1, 2, 3, 4, 5].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TicketSelection
