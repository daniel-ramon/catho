import React from "react"

interface IContainer {
  className?: string
}

export const Container: React.FC<IContainer> = ({ children, className }) => {
  return <div className={`min-h-screen flex flex-col ${className}`}>{children}</div>
}
