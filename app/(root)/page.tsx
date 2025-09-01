import React from 'react'
import SearchForm from '../components/SearchForm'
import StartupBox, { StartupCardType } from '../components/StartupBox';
import { client } from '@/sanity/lib/client';
import { STARTUP_QUERIES } from '@/sanity/lib/queries';

const Home = async ({ searchParams }: {searchParams: Promise<{ query?: string }>;}) => {
  const query = (await searchParams).query
  const startups =  await client.fetch(STARTUP_QUERIES)
  /*const startups = [{
    _createdAt: new Date(),
    views: 58,
    author: { _id: 1, name: 'Zou' },
    description: 'This a description',
    image: 'https://placehold.co/48x48',
    category: 'Robots',
    title: 'We Robots',
    _id: 10
  }]*/
  return (
    <>
      <section className='green_container'>
        <h1 className='heading'>pitch your startup, <br /> connect with entrepreneurs</h1>
        <p className='sub-heading'>Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions</p>
        <SearchForm query={query}/>
      </section>

      <section className='section_container'>
        <p className='text-3xl font-semibold'>
          {query ? `Results for ${query}` : 'All Startups'}
        </p>
        <ul className='card_grid mt-7'>
          {startups.length > 0 ? startups.map((startup: StartupCardType) => (
            <StartupBox key={startup._id} startup={startup}/>
          )) : (<p>No startup found</p>)}
        </ul>
      </section>
    </>
  )
}

export default Home