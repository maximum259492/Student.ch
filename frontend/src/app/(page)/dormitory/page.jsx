'use client'
import React, { useEffect, useState } from 'react'
import ThreadGlobal from '@/components/threads/ThreadGlobal'
import { useSelector } from 'react-redux'
import { selectDormThreads, selectLatestDormThread } from '@/lib/slices/dorm-threads/dormThreadsSlice'
import {selectHiddenThreads} from "@/lib/slices/threadSlice/threadSlice";


const FoodPage = () => {
  const [fetchedData, setFetchedData] = useState()
  const [error, setError] = useState(null) // Track potential errors
  const newDormThread = useSelector(selectLatestDormThread)
  const allDormThreads = useSelector(selectDormThreads)
    const hiddenThreads = useSelector(selectHiddenThreads);

  useEffect(() => {
    const fetchData = async () => {
      setError(null) // Clear any previous errors


      try {
        const response = await fetch('http://localhost:8080/thread/all/2', {
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
  }, [allDormThreads.length, newDormThread, hiddenThreads.length])


  const  dormThreads = fetchedData || []


  console.log("Fetch data", dormThreads)
  return (
    <section className="grid md:grid-cols-2 gap-y-1.5 gap-x-1.5">
      {error ? (
        <p>Error: {error}</p>
      ) : (
        dormThreads.length > 0 && dormThreads.map((element, index) => (
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
