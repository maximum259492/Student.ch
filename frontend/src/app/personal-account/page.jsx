'use client'
import React, {useEffect, useState} from 'react'
import CustomSection from '@/components/custom-section/CustomSection'
import Link from 'next/link'
import {useSelector, useDispatch} from 'react-redux'
import {user, userLikes, changeUsername, logOut} from '@/lib/slices/userSlice/userSlice'
import {router} from 'next/client'
import {useRouter} from 'next/navigation'
import ThreadGlobal from '@/components/threads/ThreadGlobal'
import {resetThreadId, saveThreadId} from '@/lib/slices/threadSlice/threadSlice'
import {TableBase} from "@/components/tables/TableBase";
import {selectUnhiddenThreads} from "@/lib/slices/hiddenThreadsSlice/hiddenThreadsSlice";

const PersonalAccountPage = () => {
    const userData = useSelector (user)
    const [userLikesData, setUserLikesData] = useState ([])
    const [hiddenThreads, setHiddenThreads] = useState ([])
    const [username, setUsername] = useState (userData.username)
    const [editMode, setEditMode] = useState (false)
    const dispatch = useDispatch ()
    const router = useRouter ()
    const unhiddenThreads = useSelector (selectUnhiddenThreads)

    const [fetchedData, setFetchedData] = useState ({
            username : '',
            firstName : '',
            lastName : '',
        }
    )

    const handleEditToggle = () => {
        setEditMode (!editMode)
    }

    const handleChangeUsername = () => {
        if (username !== userData.username) {
            fetch ('http://localhost:8080/me/edit_username', {
                method : 'PATCH',
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${localStorage.getItem ('accessToken')}`
                },
                body : JSON.stringify ({
                    newUsername : username
                }),

            }).then (response => {
                if (!response.ok) {
                    console.log ('Помилка при зміні імені')
                } else {
                    localStorage.removeItem ('accessToken')
                    localStorage.removeItem ('refreshToken')
                    localStorage.removeItem ('username')
                    localStorage.removeItem ('password')
                    dispatch (changeUsername (username))
                    setEditMode (false)
                    router.push ('/login')
                }
            })
        }
    }


    const handleUsernameChange = (e) => {
        setUsername (e.target.value)
    }


    useEffect (() => {
        fetch ('http://localhost:8080/me/info', {
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${localStorage.getItem ('accessToken')}`
            }
        })
            .then (response => {
                    if (!response.ok) {
                        console.log ('Помилка при завантаженні даних')
                    } else {
                        return response.json ()
                    }
                }
            )
            .then (response => {

                setFetchedData (
                    {
                        username : response.username,
                        firstName : response.firstName,
                        lastName : response.lastName
                    }
                )


            })
            .then (fetch ('http://localhost:8080/me/likedThreads', {
                    method : 'GET',
                    headers : {
                        'Content-Type' : 'application/json',
                        'Authorization' : `Bearer ${localStorage.getItem ('accessToken')}`
                    }
                }).then (response => response.json ())
                    .then (response => setUserLikesData (response)
                    )
            )
    }, [])

    useEffect (() => {
        fetch ("http://localhost:8080/thread/getAllHiddenThreads", {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                Authorization : `Bearer ${localStorage.getItem ("accessToken")}`,
            },

        }).then ((response) => {
            if (!response.ok) {
                console.log ("Помилка при завантаженні даних");
            } else {
                return response.json ();
            }
        })
            .then ((response) => {
                setHiddenThreads (response);
            });
    }, [unhiddenThreads.length]);

    const handleThreadClick = (e) => {
        dispatch (resetThreadId ());
        dispatch (saveThreadId (e.target.innerText));
    }
    return (
        <CustomSection direction="col" center="items-center justify-center">
            <h4 className="text-primary md:text-4xl text-base">Ваші данні</h4>
            <div
                className="flex bg-black-pearl bg-opacity-30 border border-orange flex-col relative w-full h-fit px-1.5 md:px-3.5 py-2 items-center rounded-xl gap-2">
                <div className="flex flex-col sm:flex-row justify-evenly w-full gap-1">
                    <div className="flex flex-col gap-1.5 items-center">
                        <h6 className="text-peach text-sm">Ваше імʼя та прізвище</h6>
                        <span className="text-primary text-base">{fetchedData.firstName} {fetchedData.lastName}</span>
                    </div>
                    <div className="flex flex-col gap-1.5 items-center">
                        <h6 className="text-peach text-sm">Ваш нікнейм</h6>
                        {editMode ? (
                            <div className="flex flex-col gap-2 items-center">
                                <input
                                    type="text"
                                    value={username}
                                    onChange={handleUsernameChange}
                                    className="text-black-pearl rounded-[12px] border border-peach outline-0 px-1 py-0.5 text-base"
                                    autoFocus
                                />
                                <button
                                    onClick={handleChangeUsername}
                                    className="text-primary text-[12px] hover:text-peach bg-black-pearl rounded-xl border-orange border px-1 py-1 transition-all duration-200 font-bold sm:absolute right-2 top-2">
                                    Зберегти
                                </button>
                                <button
                                    onClick={handleEditToggle}
                                    className="text-primary text-[12px] hover:text-peach bg-black-pearl rounded-xl border-orange border px-1 py-1 transition-all duration-200 font-bold sm:absolute right-[80px] top-2">
                                    Скасувати
                                </button>
                            </div>
                        ) : (
                            <div onClick={handleEditToggle} className="flex flex-col gap-2 items-center">
                                <span className="text-primary text-base">{fetchedData.username}</span>
                                <button
                                    className="text-primary text-[12px] hover:text-peach bg-black-pearl rounded-xl border-orange border px-1 py-1 transition-all duration-200 font-bold sm:absolute right-2 top-2">
                                    Редагувати
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col w-full justify-evenly items-center  gap-3">
                        <h6 className="text-peach text-xl text-center">Ваші вподобайки</h6>
                        <TableBase type={'likedThreads'} data={userLikesData}/>
                    </div>
                    <div className="flex flex-col w-full justify-evenly items-center  gap-3">
                        <h6 className="text-peach text-xl text-center">Приховані треди</h6>
                        <TableBase type={'hiddenThreads'} data={hiddenThreads}/>
                    </div>
                </div>
            </div>
        </CustomSection>
    )
}

export default PersonalAccountPage
