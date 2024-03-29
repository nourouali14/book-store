import React from 'react'

import About from './Components/About'
import Footer from './Components/Footer'
import Header from './Components/Header'
import PhotoGallery from './Components/PhotoGallery'
import RecentAddedBooks from './Components/RecentAddedBooks'
import WelcomeBox from './Components/WelcomeBox'

function Home() {
  return (
    <div>
      <Header />
      <WelcomeBox />
      <RecentAddedBooks />
      <About />
      <PhotoGallery />
      <Footer />
    </div>
  )
}

export default Home