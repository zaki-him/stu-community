import React from 'react'
import SearchForm from '@/components/SearchForm';
import StartupBox, { StartupCardType } from '../../components/StartupBox';
import { STARTUP_QUERIES } from '@/sanity/lib/queries';
import { sanityFetch, SanityLive } from '@/sanity/lib/live';
import { auth } from '@/auth';

const Home = async ({ searchParams }: {searchParams: Promise<{ query?: string }>;}) => {
  const query = (await searchParams).query
  const params = { search: query || null}


  const session = await auth()
  console.log(session?.id)

  const { data: startups } =  await sanityFetch({ query: STARTUP_QUERIES, params })
  return (
    <>
      <section className='green_container'>
        <h1 className='heading'>pitch your startup, <br /> connect with entrepreneurs</h1>
        <p className='sub-heading'>Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions</p>
        <SearchForm query={query}/>
      </section>

      <section className='section_container'>
        <p className='text-3xl font-semibold'>
          {query ? `Results for "${query}"` : 'All Startups'}
        </p>
        <ul className='card_grid mt-7'>
          {startups.length > 0 ? startups.map((startup: StartupCardType) => (
            <StartupBox key={startup._id} startup={startup}/>
          )) : (<p>No startup found</p>)}
        </ul>
      </section>

      <SanityLive />
    </>
  )
}

export default Home