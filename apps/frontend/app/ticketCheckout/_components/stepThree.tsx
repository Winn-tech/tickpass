'use client'

import React from 'react'

const Payment: React.FC<{ total: number }> = ({ total }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Payment Method</h2>

      <div className="bg-gray-50 border rounded-lg p-6">
        <div className="flex justify-between text-lg font-semibold">
          <span>Total Amount:</span>
          <span className="text-primary-600">&#8358;{total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}

export default Payment
