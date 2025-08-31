import React from 'react'
import SearchForm from '../components/SearchForm'
import StartupBox from '../components/StartupBox';

const Home = async ({ searchParams }: {searchParams: Promise<{ query?: string }>;}) => {
  const query = (await searchParams).query
  const startups = [{
    _createdAt: 'today',
    views: 58,
    author: { _id: 1 },
    description: 'This a description',
    image: '',
    category: 'Robots',
    title: 'We Robots'
  }]
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
          {startups.length > 0 ? startups.map((startup,index) => (
            <StartupBox key={index}/>
          )) : (<p>No startup found</p>)}
        </ul>
      </section>
    </>
  )
}

export default Home