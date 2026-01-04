'use client'

import React from 'react'
import { ContactInfo, CountryCode } from '@shared/types/eventTypes'

interface Props {
  contactInfo: ContactInfo
  countryCodes: CountryCode[]
  emailsMatch: boolean
  onContactChange: (field: keyof ContactInfo, value: string) => void
}

const ContactInformation: React.FC<Props> = ({
  contactInfo,
  countryCodes,
  emailsMatch,
  onContactChange
}) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Contact Information</h2>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input
            placeholder="First Name"
            value={contactInfo.firstName}
            onChange={(e) => onContactChange('firstName', e.target.value)}
            className="w-full px-4 py-2 rounded-md border-gray-400 border-2"
          />
          <input
            placeholder="Last Name"
            value={contactInfo.lastName}
            onChange={(e) => onContactChange('lastName', e.target.value)}
            className="w-full px-4 py-2 rounded-md border-gray-400 border-2"
          />
        </div>

        <input
          type="email"
          placeholder="Email"
          value={contactInfo.email}
          onChange={(e) => onContactChange('email', e.target.value)}
          className="w-full px-4 py-2 rounded-md border-gray-400 border-2"
        />

        <div>
          <input
            type="email"
            placeholder="Confirm Email"
            value={contactInfo.confirmEmail}
            onChange={(e) => onContactChange('confirmEmail', e.target.value)}
            className={`w-full px-4 py-2 rounded-md border-gray-400 border-2 ${
              contactInfo.confirmEmail && !emailsMatch
                ? 'border-error-500'
                : 'border-gray-300'
            }`}
          />
          {contactInfo.confirmEmail && !emailsMatch && (
            <p className="text-sm text-error-500 mt-1">Emails do not match</p>
          )}
        </div>

        <div className="flex gap-2">
          <select
            value={contactInfo.countryCode}
            onChange={(e) => onContactChange('countryCode', e.target.value)}
            className="px-3 py-2 rounded-md border-gray-400 border-2"
          >
            {countryCodes.map(cc => (
              <option key={cc.code} value={cc.code}>
                {cc.code} ({cc.country})
              </option>
            ))}
          </select>

          <input
            placeholder="Phone Number"
            value={contactInfo.phoneNumber}
            onChange={(e) => onContactChange('phoneNumber', e.target.value)}
            className="flex-1 px-4 py-2 rounded-md border-gray-400 border-2"
          />
        </div>
      </div>
      <p className='mt-5 md:mt-7 text-shadow font-bold text-accent-400'> <span className='text-primary-600'>Note:</span> Your Ticket(s) will sent to your email address.</p>
    </div>
  )
}

export default ContactInformation
