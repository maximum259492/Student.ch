import React from 'react'
import Link from 'next/link'

const CustomLink = ({ href, title }) => {
  return (
    <Link href={href}
          className="text-primary text-[14px] md:text-[20px] after:content-[''] relative after:rounded-[16px] transition-all after:duration-300 after:absolute after:w-0 after:h-0.5 hover:after:w-full after:bg-primary after:-bottom-1 after:left-0 font-bold">{title}
    </Link>
  )
}

export default CustomLink
