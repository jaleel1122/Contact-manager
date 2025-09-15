// import React from 'react'
// import { Link } from 'react-router-dom'

// const Header = () => {
//   return (
//     <>
//       <div className="navbar bg-base-100/90 backdrop-blur supports-[backdrop-filter]:bg-base-100/75 shadow-sm sticky top-0 z-20 transition-colors">
//         <div className="max-w-6xl mx-auto w-full px-4">
//           <div className="flex items-center justify-between gap-3 py-2">
//             <Link to='/' className="btn btn-ghost px-1 normal-case text-2xl md:text-3xl font-extrabold tracking-tight ">
//               Contact Manager
//             </Link>
//             <Link to="/addcontacts" className="shrink-0">
//               <button className="btn btn-primary btn-sm md:btn-md shadow-sm hover:shadow">
//                 Add Contact
//               </button>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default Header



import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header
      className="sticky top-0 z-30 
                 bg-gradient-to-r from-green-900/90 via-green-900/90 to-green-900/90
                 backdrop-blur-md supports-[backdrop-filter]:bg-opacity-80 shadow-xl"
    >
      <div className="max-w-6xl mx-auto w-full px-6">
        <nav className="flex items-center justify-between py-4">
          {/* Logo / Title */}
          <Link
            to="/"
            className="relative text-3xl md:text-4xl font-extrabold tracking-tight 
                       text-green-50 drop-shadow-md
                       hover:text-lime-300 transition-all duration-300 group"
          >
            Contact Manager
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-lime-300
                             transition-all duration-300 group-hover:w-full"></span>
          </Link>

          {/* Add Contact Button */}
          <Link to="/addcontacts">
            <button
              className="relative overflow-hidden rounded-xl 
                         bg-gradient-to-r from-green-200 to-green-300 
                         text-green-900 font-semibold
                         px-5 py-2 md:px-6 md:py-2.5 shadow-md backdrop-blur-sm
                         hover:from-lime-400 hover:to-emerald-500 hover:text-white
                         hover:shadow-xl hover:-translate-y-0.5 
                         transition-all duration-300"
            >
              Add Contact
            </button>
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
