import React from 'react'
import Banner from './Banner'
import Category from './Categories'
import Poroduct from './Poroduct'
import Service from './Service'
import Testimonials from './Testimonials'

const Home = () => {
  return (
    <div>
        <Banner/>
        <Category/>
        <Poroduct/>
        <Service/>
        <Testimonials/>
    </div>
  )
}

export default Home