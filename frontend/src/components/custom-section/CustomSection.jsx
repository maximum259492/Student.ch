import React from 'react'

const CustomSection = ({ children, direction = 'col', center = '' }) => {
  return (
    <section className={`px-1 py-5 md:px-3.5 lg:px-5 gap-5 flex flex-${direction} ${center}`}>
      {children}
    </section>
  )
}

export default CustomSection
