import { auth } from '@/auth'
import { signIn, signOut } from '@/auth'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Navbar = async () => {
  const session = await auth()
  console.log(session)

  return (
    <header className='px-5 py-6 bg-white font-work-sans'>
      <nav className='flex justify-between items-center'>
        <Link href='/'>
          <Image src={'/logo.png'} alt='' width={144} height={30}/>
        </Link>
        <div className='flex items-center gap-5 text-black'>
          {session && session?.user?.id ? (
            <>
              <Link href='/startup/create'>
                <span>Create</span>
              </Link>
              <form action={async () => {
                "use server"
                await signOut({redirectTo: '/'})
              }}>
                <button type='submit' className='cursor-pointer'>LogOut</button>
              </form>
              <Link href={`user/${session?.user?.id}`} className='p-1'>
                <img src={session?.user?.image!} alt="" className='size-8 rounded-full'/>
              </Link>
            </>
          ) : (
            <form action={async () => {
              "use server"
              await signIn('github' , { redirectTo: "/" })
            }}>
              <button type='submit' className='cursor-pointer'>
                LogIn
              </button>
            </form>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Navbar