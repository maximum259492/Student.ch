
import { CiHeart } from 'react-icons/ci'
import { useDispatch, useSelector } from 'react-redux'
import { toggleFav, userLikes } from '@/lib/slices/userSlice/userSlice'
import { useEffect, useState } from 'react'

const AddToFav = ({ threadId }) => {
  const dispatch = useDispatch()
  const [isLiked, setIsLiked] = useState(false)


  useEffect(() => {
      fetch(
        `http://localhost:8080/thread/${threadId}/isLiked`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }
        }
      )
        .then(response => {
            if (!response.ok) {
              setIsLiked(false)
            } else {
              setIsLiked(true)
            }
          }
        )
    }
    , [])


  const handleToggleFav = () => {
    if (!isLiked) {
      fetch(`http://localhost:8080/thread/${threadId}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
      })
        .then(response => {
            if (!response.ok) {
              console.log('Помилка при додаванні до обраного')
            } else {
              setIsLiked(!isLiked)
              dispatch(toggleFav(threadId))


            }
          }
        )
    } else if (isLiked) {
      fetch(`http://localhost:8080/thread/${threadId}/unlike`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
      }).then(r =>
        setIsLiked(!isLiked)
      )
    }
  }

  return (
    <button onClick={handleToggleFav}
            className={`absolute bottom-2 right-2 w-3 h-3 ${isLiked ? 'text-peach' : 'text-orange'}`}>
      <CiHeart />
    </button>
  )
}

export default AddToFav

