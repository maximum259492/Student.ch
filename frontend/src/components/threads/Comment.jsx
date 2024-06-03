import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isLoggedIn } from '@/lib/slices/userSlice/userSlice'
import Reply from '@/components/threads/Reply'
import {
  addCommentReply,
  selectCommentReplies,
  selectLatestCommentReply
} from '@/lib/slices/commentReplySlice/commentReplySlice'


const Comment = ({
                       username,
                       date,
                       id,
                       imageData,
                       text,
    role
                     }) => {


  const loggedIn = useSelector(isLoggedIn)
  const [showReplyForm, setShowReplyForm] = useState(false)
  const [commentReply, setCommentReply] = useState('')
  const [fetchedCommentReply, setFetchedCommentReply] = useState([])
  const dispatch = useDispatch()
  const newCommentReply = useSelector(selectLatestCommentReply)
  const allCommentReply = useSelector(selectCommentReplies)

  useEffect(() => {
      fetch(`http://localhost:8080/comment/reply/get/${id}  `, {
        method: 'GET',
      }).then(response => response.json())
        .then(data => {
          setFetchedCommentReply(data)
          console.log('Дані успішно завантажені: ', data)
        }).catch(error => {
        console.error('Error fetching data:', error)
      })
    }
    , [allCommentReply.length, newCommentReply])

  const handleInputChange = e => {
    const { name, value } = e.target
    setCommentReply(value)
  }

  const handleCommentReply = e => {
    e.preventDefault()
    fetch(`http://localhost:8080/comment/reply/create/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('accessToken') ? `Bearer ${localStorage.getItem('accessToken')}` : '',
      },
      body: JSON.stringify({ text: commentReply })
    }).then(response => {
        if (!response.status === 200) {
          alert('Помилка при додаванні коментаря')
        } else {
          dispatch(addCommentReply(commentReply))
          setCommentReply('')
          setShowReplyForm(false)
        }
      }
    )
  }

  console.log("COMMENT REPLY", useSelector(selectCommentReplies))



  return (
    <div>
    <article
      className="w-fit max-w-[500px] border-peach border h-fit max-h-[250px] bg-black-pearl p-2  gap-3 flex flex-row rounded-xl shadow-md">
      {imageData &&
        <div className="w-max h-max">
          <img src={`data:image/png;base64,${imageData}`} alt="Post image"
               className="rounded-md max-w-[150px] max-h-[150px] object-cover aspect-square" />
        </div>

      }
      {/*Text block */}
      <div className="w-fit flex flex-col">
        <div className="post-actions flex flex-row justify-between gap-1.5 items-center">
          <div className="flex flex-row gap-1.5 items-center ">
            {loggedIn &&
              <button
                onClick={() => setShowReplyForm(!showReplyForm)}
                className="text-[10px] text-primary  text-white font-bold rounded after:content-[''] relative after:rounded-[16px] transition-all after:duration-300 after:absolute after:w-0 after:h-[1px] hover:after:w-full after:bg-primary after:bottom-0 after:left-0">
                Відповісти
              </button>
            }
          </div>
          <div className="flex flex-row gap-1 items-center justify-end">
              {role&& role === "USER" ?
                  <p className="text-[10px] text-primary">{username}</p> :

                  role && role === "MODERATOR" ?
                      <p className="text-[10px] text-[#FFFF00]">{username}</p> :
                      role && role === "ADMIN" ?
                          <p className="text-[10px] text-[#FF0000]">{username}</p> :
                          null

              }
            <p className="text-[10px] text-primary">{date.slice(0, 10)}</p>
            <span className="text-[10px] text-red-500">{id}</span>
          </div>
        </div>
        <div>
          <p className="text-[14px] text-ellipsis text-primary">
            {text}
          </p>
        </div>

        {showReplyForm && (
          <form
            className="bg-black-pearl flex flex-col z-30 p-2 border-orange border rounded shadow-lg"
            onSubmit={handleCommentReply}>
                    <textarea name="text" value={commentReply} onChange={handleInputChange} placeholder="Ваш коментар..."
                              className="text-[10px] text-black-pearl p-1 rounded border border-peach w-48" />
            <button type="submit"
                    className="bg-black-pearl/80 border border-orange hover:bg-blue-700 text-white text-[10px] font-bold py-1 px-2 rounded">
              Відповісти
            </button>
          </form>
        )}
      </div>
    </article>

      {fetchedCommentReply.map((element, index) => (

          <Reply
            username={element.author?.username}
            date={element.date}
            text={element.text}
            imageData={element.imageData}
            key={index}
            commentId={id}
            role={element.author?.role.name}

          />
        ))}
    </div>
  )
}

export default Comment
