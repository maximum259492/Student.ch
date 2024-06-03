'use client'
import React, { useEffect, useState } from 'react'
import ThreadGlobal from '@/components/threads/ThreadGlobal'
import { useSelector } from 'react-redux'
import { selectLatestStudyThread, selectStudyThreads } from '@/lib/slices/study-threads/studyThreadsSlice'
import {selectHiddenThreads} from "@/lib/slices/threadSlice/threadSlice";


const FoodPage = () => {
  const [fetchedData, setFetchedData] = useState()
  const [error, setError] = useState(null) // Track potential errors
  const newStudyThreads = useSelector(selectLatestStudyThread)
  const allStudyThreads = useSelector(selectStudyThreads)
    const hiddenThreads = useSelector(selectHiddenThreads);


  useEffect(() => {
    const fetchData = async () => {
      setError(null) // Clear any previous errors


      try {
        const response = await fetch('http://localhost:8080/thread/all/1', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('accessToken') ? `Bearer ${localStorage.getItem('accessToken')}` : '',
          }
        })

        if (!response.ok) {
          console.log("Помилка при завантаженні даних " + response.statusText)
          setError(response.statusText) // Set error message
        } else {
          const data = await response.json()
          setFetchedData(data)
        }
      } catch (error) {
        console.error("Error fetching data:", error)
        setError("Error fetching threads") // Set generic error message
      }
    }

    fetchData()
  }, [allStudyThreads.length, newStudyThreads, hiddenThreads.length])


  const  studyThreads = fetchedData || []


  console.log("Fetch data", studyThreads)
  return (
    <section className="grid md:grid-cols-2 gap-y-1.5 gap-x-1.5">
      {error ? (
        <p>Error: {error}</p>
      ) : (
        studyThreads.length > 0 && studyThreads.map((element, index) => (
          <ThreadGlobal
            text={element.text}
            title={element.title}
            date={element.date}
            id={element.id}
            username={element.author.username}
            imageData={element.imageData}
            role = {element.author.role.name}
          />
        ))
      )}
    </section>
  )
}

export default FoodPage
