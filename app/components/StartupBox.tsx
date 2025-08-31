import { formatDate } from '@/lib/utils'
import { EyeIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const StartupBox = ({startup}) => {
  const { _id, title, author: { _id: authorId, name }, _createdAt, category, image, description, views } = startup
  return (
    <li className='startup-card'>
      <div className='flex justify-between items-center w-full '>
        <p className='startup-card_date'>
          {formatDate(_createdAt)}
        </p>
        <div className='flex gap-1 items-center'>
          <EyeIcon className='size-5 text-[var(--color-green)]' />
          <p>{views}</p>
        </div>
      </div>

      <div className='flex justify-between mt-5 gap-5'>
        <div className='flex-1'>
          <Link href={`/user/${authorId}`}>
            <p className='text-md font-semibold line-clamp-2'>
              {name}
            </p>
          </Link>
          <Link href={`/startup/${_id}`}>
            <p className='text-xl font-bold line-clamp-2'>{title}</p>
          </Link>
        </div>
        <Link href={`/user/${authorId}`}>
          <Image src={'https://placehold.co/48x48'} alt='' width={48} height={48} className='rounded-full' />
        </Link>
      </div>

      <Link href={`/startup/${_id}`}>
        <h3 className='font-semibold text-neutral-400'>{description}</h3>
        <img src={image} alt="" className='w-full h-40'/>
      </Link>

      <div className='flex justify-between items-center mt-3'>
          <Link href={`/?query=${category.toLowerCase()}`}>
            <p className='font-semibold hover:text-[var(--color-green)] transition-all duration-500'>{category}</p>
          </Link>
          <button className='py-2 px-4 bg-black text-white rounded-full'>
            <Link href={`/startup/${_id}`}>
              Details
            </Link>
          </button>
        </div>
    </li>
  )
}

export default StartupBox