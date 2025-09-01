import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <>
      <div className="navbar bg-base-100 shadow-sm justify-center mb-1.5 relative">
        <Link to='/' className="btn btn-ghost text-[35px] font-bold">
          Contact Manager
        </Link>
        <Link to="/addcontacts">
          <div className="absolute right-6 top-1/2 -translate-y-1/2">
            <button className="btn btn-primary btn-wide">Add Contacts</button>
          </div>
        </Link>
      </div>
    </>
  )
}

export default Header