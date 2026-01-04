'use client'

import React from 'react'

const StepIndicator: React.FC<{ currentStep: number }> = ({ currentStep }) => {
  const steps = ['Tickets', 'Contact', 'Payment']

  return (
    <div className="flex justify-between mb-8">
      {steps.map((label, index) => (
        <div key={label} className="flex items-center flex-1">
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full ${
              currentStep >= index + 1
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 text-gray-600'
            }`}
          >
            {index + 1}
          </div>
          <span className="ml-3">{label}</span>
        </div>
      ))}
    </div>
  )
}

export default StepIndicator
