import React from 'react'
import { regexp } from '../../../constants/enum'
import { editUser } from '../../../services/firebase'
import { AiFillTwitterCircle, BsFacebook, BsFillTelephoneFill, FaLocationDot, MdEmail, RiInstagramFill } from '../../../utils/icons'
import IneditInput from '../../IneditInput/IneditInput'

function ProfileContact({ user, isMe }) {
  return (
    <>
      <ul className="flex flex-col gap-5 py-5">
        <li className="flex items-center gap-3">
          <MdEmail size={20} className="text-icon" />
          {isMe ? (
            <IneditInput
              options={{ isRequired: true, regexp: regexp.email }}
              value={user.email}
              updateRequest={(val) => editUser({ ...user, email: val })}
            />
          ) : (
            <span>{user.email}</span>
          )}
        </li>
        <li className="flex items-center gap-3">
          <FaLocationDot size={20} className="text-icon" />
          {isMe ? (
            <IneditInput options={{ isRequired: true }} value={user.location} updateRequest={(val) => editUser({ ...user, location: val })} />
          ) : (
            <span>{user.location}</span>
          )}
        </li>
        <li className="flex items-center gap-3">
          <BsFillTelephoneFill size={20} className="text-icon" />
          {isMe ? (
            <IneditInput
              options={{ isRequired: true, regexp: regexp.phone }}
              value={user.phone}
              updateRequest={(val) => editUser({ ...user, phone: val })}
            />
          ) : (
            <span>{user.phone}</span>
          )}
        </li>
      </ul>
      {/* social medias */}
      <ul className="flex justify-around py-5 w-3/5 mt-auto ml-auto mr-auto">
        <li>
          <a href={user.socials?.fb} tabIndex={0} className="p-1 block">
            <BsFacebook className="cursor-pointer ease-in duration-100 hover:text-fb" size={20} color="fb" />
          </a>
        </li>
        <li>
          <a href={user.socials?.tw} tabIndex={0} className="p-1 block">
            <AiFillTwitterCircle className="cursor-pointer ease-in duration-100 hover:text-twitter" size={20} color="twitter" />
          </a>
        </li>
        <li>
          <a href={user.socials?.ins} tabIndex={0} className="p-1 block">
            <RiInstagramFill className="cursor-pointer ease-in duration-100 hover:text-insta" size={20} color="insta" />
          </a>
        </li>
      </ul>
    </>
  )
}

export default ProfileContact
