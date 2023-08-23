import React from 'react'
import { AiFillTwitterCircle } from 'react-icons/ai'
import { BsFacebook, BsFillTelephoneFill } from 'react-icons/bs'
import { FaLocationDot } from 'react-icons/fa6'
import { MdEmail } from 'react-icons/md'
import { RiInstagramFill } from 'react-icons/ri'

function ProfileContact({ user }) {
  return (
    <>
      <ul className="flex flex-col gap-5 py-5">
        <li className="flex items-center gap-3">
          <MdEmail size={20} className="text-icon" />
          <span>{user.email}</span>
        </li>
        <li className="flex items-center gap-3">
          <FaLocationDot size={20} className="text-icon" />
          <span>{user.location || 'Ho Chi Minh, Vietnam'}</span>
        </li>
        <li className="flex items-center gap-3">
          <BsFillTelephoneFill size={20} className="text-icon" />
          <span>{user.phone || '(+84) 091-6731-590'}</span>
        </li>
      </ul>
      {/* social medias */}
      <ul className="flex justify-around py-5 w-3/5 mt-auto ml-auto mr-auto">
        <li>
          <BsFacebook className="cursor-pointer ease-in duration-100 hover:text-fb" size={20} color="fb" />
        </li>
        <li>
          <AiFillTwitterCircle className="cursor-pointer ease-in duration-100 hover:text-twitter" size={20} color="twitter" />
        </li>
        <li>
          <RiInstagramFill className="cursor-pointer ease-in duration-100 hover:text-insta" size={20} color="insta" />
        </li>
      </ul>
    </>
  )
}

export default ProfileContact
