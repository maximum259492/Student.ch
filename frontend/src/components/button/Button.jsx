import React from 'react'

const Button = ({ children, width = 'fit-content', type = '', onClick = null }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-primary text-[14px] md:text-[16px] lg:text-[18px] text-black-pearl px-2 md:px-3 py-1 ${width}  ${type}} rounded-lg hover:bg-black-pearl hover:border-orange border hover:text-primary transition-all duration-200`}>{children}</button>
  )
}

export default Button
