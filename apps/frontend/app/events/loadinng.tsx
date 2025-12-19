import React from 'react'
import { SquareLoader } from "react-spinners";

const Loading:React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <SquareLoader size={50} color={"#f57c00"} loading={true} />
    </div>
  )
}

export default Loading