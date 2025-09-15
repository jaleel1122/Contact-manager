import React from 'react';
import { Link } from 'react-router-dom';



const ContactCard = ({ contact, index, onDelete, onEdit }) => {
  return (
    <div className=''>
      <li className="list-row transition-colors hover:bg-base-200/60">
        <div className="text-3xl md:text-4xl font-thin opacity-30 tabular-nums w-10 text-right md:w-12">
          {String(index + 1).padStart(2, '0')}
        </div>

        <div className="shrink-0">
          {contact.image ? (
            <img className="size-10 md:size-12 rounded-box border border-base-200 object-cover" src={contact.image} alt="contact" />
          ) : (
            <svg className="user-icon size-10 md:size-12 rounded-box border border-base-200" viewBox="0 0 24 24">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
            </svg>
          )}
        </div>

        <div className="list-col-grow">
          <Link to={`/contact/${contact.id}`} className="block">
            <div className="font-medium leading-tight">
              {contact.firstName || contact.lastName
                ? <div>{contact.firstName} {contact.lastName}</div>
                : <div>{contact.name}</div>
              }
            </div>
            <div className="text-xs md:text-[13px] uppercase font-semibold opacity-60 truncate">{contact.email}</div>
            <div className="text-xs md:text-[13px] uppercase font-semibold opacity-60">{contact.phone}</div>
          </Link>
        </div>

        <div className="flex items-center gap-0.1">
          <button className="btn btn-square btn-ghost hover:bg-base-200 transition-colors" onClick={onEdit} aria-label="Edit">
            <svg
  xmlns="http://www.w3.org/2000/svg"
  width="20"
  height="20"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
  className="feather feather-edit"
>
  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
</svg>

          </button>
          <button className="btn btn-square btn-ghost hover:bg-base-200 transition-colors" onClick={onDelete} aria-label="Delete">
 <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"           /* <-- thicker stroke */
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-trash-2 w-5 h-5 text-gray-800"
  >
    <path d="M3 6h18" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6" />
    <path d="M14 11v6" />
    <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
  </svg>
            </button>
        </div>
      </li>
    </div>
  );
};

export default ContactCard;
