'use client'
import React, {useEffect, useState} from 'react'
import {
    resetThreadId,
    saveThreadId,
    hideThread,
    threadSlice,
    selectThreadId, changeIsInThread, selectIsInThread, changeIsNotInThread
} from '@/lib/slices/threadSlice/threadSlice'
import {useDispatch} from 'react-redux'
import Link from 'next/link'
import {useSelector} from 'react-redux'
import {isLoggedIn} from '@/lib/slices/userSlice/userSlice'
import AddToFav from '@/components/button/AddToFav'
import axios from 'axios'
import {addComment, selectComments} from '@/lib/slices/commentSlice/commentSlice'
import ImageModal from "@/components/threads/ImageModal";


const ThreadGlobal = ({
                          text,
                          title,
                          date,
                          id,
                          username,
                          imageData,
                          role
                      }) => {


    const [showReplyForm, setShowReplyForm] = useState (false)
    const [reply, setReply] = useState ({
        text : '',
        image : null
    })
    const [isImageModalOpen, setIsImageModalOpen] = useState (false);
    const [selectedImage, setSelectedImage] = useState (null);

    const fakeReplies = ['11', '12', '13', '1488', '1337']


    const handleInputChange = e => {
        const {name, value, files, type} = e.target
        setReply ({
            ...reply,
            [name] : type === 'file' ? files[0] : value
        })
    }

    const handleReply = e => {
        const {image, text} = reply
        const formData = new FormData ()
        formData.append ('text', reply.text)
        if (image) { // Check if image is selected before appending
            formData.append ('image', image)
        }
        e.preventDefault ()
        axios.post (`http://localhost:8080/comment/${id}/create`, formData, {
            headers : {
                'Authorization' : `Bearer ${localStorage.getItem ('accessToken')}`,
                'Content-Type' : 'multipart/form-data'
            }
        }).then (response => {
            if (response.status !== 200) {

            } else {
                dispatch (addComment (reply.text))
                setReply ({
                    text : '',
                    image : null
                })
                setShowReplyForm (false)

            }
        })
    }
    const dispatch = useDispatch ()
    console.log ("comment", useSelector (selectComments))

    const handleImageClick = imageSrc => {
        setSelectedImage (imageSrc);
        setIsImageModalOpen (true);
    };

    const closeModal = () => {
        setIsImageModalOpen (false);
        setSelectedImage (null);
    };

    const handleThreadClick = () => {
        dispatch (resetThreadId ())
        dispatch (saveThreadId (id))
    }
    const handleBackClick = () => {

        dispatch (resetThreadId ())
    }

    const handleHideThread = (id) => {
        fetch (`http://localhost:8080/thread/${id}/hide`, {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${localStorage.getItem ('accessToken')}`
            }
        }).then (response => {
                if (!response.ok) {
                    console.log ('Помилка при сховуванні')
                } else {
                    dispatch (hideThread (id))
                    console.log ('Тред сховано')

                }
            }
        )
    }


    return (
        <article
            className="w-full md:w-fit relative items-center md:items-start max-w-max border-orange border-[1px] h-fit md:max-h-[250px] bg-black-pearl p-2  gap-3 flex flex-col md:flex-row rounded-xl shadow-md">
            {useSelector (isLoggedIn) &&
                <AddToFav threadId={id}/>
            }
            {imageData &&
                <div className="w-max h-max">
                    <img src={`data:image/png;base64,${imageData}`} alt="Post image"
                         className="rounded-md max-w-[150px] max-h-[150px] object-cover aspect-square"
                         onClick={() => handleImageClick (`data:image/png;base64,${imageData}`)}/>


                </div>

            }
            <div className="w-fit flex flex-col gap-2 pr-5">
                <div className="post-actions flex flex-col sm:flex-row justify-between gap-1.5 items-center">
                    <div className="flex flex-row gap-1.5 items-center ">

                        <div className="relative flex">
                            {useSelector (isLoggedIn) &&
                                <button
                                    onClick={() => setShowReplyForm (!showReplyForm)}
                                    className="text-[10px] text-primary  text-white font-bold rounded after:content-[''] relative after:rounded-[16px] transition-all after:duration-300 after:absolute after:w-0 after:h-[1px] hover:after:w-full after:bg-primary after:bottom-0 after:left-0">
                                    Відповісти
                                </button>
                            }
                            {showReplyForm && (
                                <form
                                    className="absolute top-[22px]  bg-black-pearl flex flex-col z-30 p-2 border-orange border rounded shadow-lg"
                                    onSubmit={handleReply}>
                    <textarea name="text" value={reply.text} onChange={handleInputChange} placeholder="Ваш коментар..."
                              className="text-[10px] text-black-pearl p-1 rounded border border-peach w-48"/>
                                    <input type="file" name="image" onChange={handleInputChange}
                                           className="text-[10px] my-1"/>
                                    <button type="submit"
                                            className="bg-black-pearl/80 border border-orange hover:bg-blue-700 text-white text-[10px] font-bold py-1 px-2 rounded">
                                        Відповісти
                                    </button>
                                </form>
                            )}
                        </div>

                        {useSelector (isLoggedIn) &&
                            <button
                                onClick={() => handleHideThread (id)}
                                className="text-[10px]  text-primary font-bold rounded after:content-[''] relative after:rounded-[16px] transition-all after:duration-300 after:absolute after:w-0 after:h-[1px] hover:after:w-full after:bg-primary after:bottom-0 after:left-0">
                                Сховати
                            </button>
                        }
                        {!useSelector (selectIsInThread) && (
                            <Link href={`/${id}`} onClick={handleThreadClick}
                                  className=" whitespace-pre text-[10px] text-primary font-bold rounded after:content-[''] relative after:rounded-[16px] transition-all after:duration-300 after:absolute after:w-0 after:h-[1px] hover:after:w-full after:bg-primary after:bottom-0 after:left-0">
                                У тред
                            </Link>
                        )}
                        {useSelector (selectIsInThread) && (
                            <Link href="/" onClick={handleBackClick}
                                  className=" whitespace-pre text-[10px] text-primary font-bold rounded after:content-[''] relative after:rounded-[16px] transition-all after:duration-300 after:absolute after:w-0 after:h-[1px] hover:after:w-full after:bg-primary after:bottom-0 after:left-0">
                                Назад
                            </Link>
                        )}
                    </div>
                    <div className="flex flex-row gap-3 items-center justify-end">
                        {role && role === "USER" ?
                            <p className="text-[10px] text-primary">{username}</p> :

                            role && role === "MODERATOR" ?
                                <p className="text-[10px] text-[#FFFF00]">{username}</p> :
                                role && role === "ADMIN" ?
                                    <p className="text-[10px] text-[#FF0000]">{username}</p> :
                                    null

                        }
                        <p className="text-[10px] text-primary">{date && date.slice (0, 10)}</p>
                        {/*<span className="text-[10px] text-primary">{id}</span>*/}
                    </div>
                </div>
                <div className="flex flex-col items-center md:items-start gap-1.5">
                    {title &&
                        <h4 className="text-[18px] text-center md:text-start font-bold text-primary">{title}</h4>
                    }
                    <p className="text-[14px] text-ellipsis text-primary">
                        {text}
                    </p>
                </div>
                {/*<div className="flex gap-1 items-center justify-start">*/}
                {/*  {fakeReplies.map((reply, index) => (*/}
                {/*    <p className="text-[10px] text-primary">123</p>*/}
                {/*  ))}*/}
                {/*</div>*/}
                {isImageModalOpen && (
                    <ImageModal isOpen={isImageModalOpen} onClose={closeModal} imageSrc={selectedImage}/>
                )}
            </div>
        </article>
    )
}

export default ThreadGlobal
