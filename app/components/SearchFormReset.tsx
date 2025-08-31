"use client"

import { X } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const ResetBtn = () => {
  const form = document.querySelector('.search-form') as HTMLFormElement
  if(form) form.reset()
  return (
    <Link href={'/'}>
      <button className='rounded-full bg-black p-2 cursor-pointer'>
        <X className="text-white size-5"/>
      </button>
    </Link>
  )
}

export default ResetBtn