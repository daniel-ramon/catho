import React from "react"

interface ICard {
  className?: string
}

export const Card: React.FC<ICard> = ({ children, className }) => {
  return (
    <div className={`container mx-auto p-5 ${className}`}>
      <div className="col-span-1 rounded-md border border-gray-300 p-5">{children}</div>
    </div>
  )
}
