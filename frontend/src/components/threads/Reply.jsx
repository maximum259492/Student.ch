import React from 'react'
import { useSelector } from 'react-redux'
import { isLoggedIn } from '@/lib/slices/userSlice/userSlice'


export const Reply = ({
                       username,
                       date,
                       id,
                       text,
                        commentId,
                        role
                     }) => {


  const loggedIn = useSelector(isLoggedIn)

  return (
    <article
      className="w-fit max-w-[500px] border-brown border h-fit max-h-[250px] bg-black-pearl p-2  gap-3 flex flex-row rounded-xl shadow-md">
      {/*Text block */}
      <div className="w-fit flex flex-col">
        <div className="post-actions flex flex-row justify-between gap-1.5 items-center">
          <div className="flex flex-row gap-1 items-center justify-end">
              {
                  role && role === "MODERATOR" ?
                      <p className="text-[10px] text-[#FFFF00]">{username}</p> :
                      role && role === "ADMIN" ?
                          <p className="text-[10px] text-[#FF0000]">{username}</p> :
                          <p className="text-[10px] text-primary">{username}</p>

              }
              <p className="text-[10px] text-primary">{date.slice(0, 10)}</p>
            <span className="text-[10px] text-red-500">{`Reply to: ` +commentId}</span>
          </div>
        </div>
        <div>
          <p className="text-[14px] text-ellipsis text-primary">
            {text}
          </p>
        </div>
      </div>
    </article>
  )
}

export default Reply
