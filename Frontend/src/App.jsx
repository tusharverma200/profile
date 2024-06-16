import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import ProfileForm from './Components/ProfileForm'
import Navbar from './Components/Navbar'

function App() {


  return (
    <div>
      <Navbar />
      <div className="py-10">
        <ProfileForm />
      </div>
    </div>
  )
}

export default App
