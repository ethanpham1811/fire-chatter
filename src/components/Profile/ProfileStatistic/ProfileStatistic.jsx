import React from 'react'

function ProfileStatistic({ user }) {
  return (
    <>
      <ul className="flex flex-1 w-full">
        <li className="flex flex-1 flex-col justify-center items-center">
          Exp (yrs)<span className="text-3xl">8</span>
        </li>
        <li className="flex flex-1 flex-col justify-center items-center">
          Projects<span className="text-3xl">100+</span>
        </li>
        <li className="flex flex-1 flex-col justify-center items-center">
          Position<span className="text-3xl">Sr.</span>
        </li>
      </ul>
      <ul className="flex flex-1 w-full">
        <li className="flex flex-1 flex-col justify-center items-center">
          Connections<span className="text-3xl">78</span>
        </li>
        <li className="flex flex-1 flex-col justify-center items-center">
          Views<span className="text-3xl">227</span>
        </li>
        <li className="flex flex-1 flex-col justify-center items-center">
          Recs<span className="text-3xl">42</span>
        </li>
      </ul>
    </>
  )
}

export default ProfileStatistic
