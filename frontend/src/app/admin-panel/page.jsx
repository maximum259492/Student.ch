'use client'
import React, { useEffect, useState } from 'react'
import CustomSection from '@/components/custom-section/CustomSection'
import {useDispatch, useSelector} from 'react-redux'
import { isLoggedIn } from '@/lib/slices/userSlice/userSlice'
import { TableBase } from '@/components/tables/TableBase'
import { router } from 'next/client'
import { useRouter } from 'next/navigation'
import {banUser, selectBannedUsers} from "@/lib/slices/userBanSlice/userBanSlice";
import {selectModerators, selectUsers} from "@/lib/slices/userModeratorSlice/userModeratorSlice";


const AdminPanel = () => {
  const loggedIn = useSelector(isLoggedIn)
  const [users, setUsers] = useState([])
  const router = useRouter()
    const dispatch = useDispatch

    const bannedUsers = useSelector (selectBannedUsers)
    const usersArray = useSelector (selectUsers  )
    const  moderatorsArray = useSelector (selectModerators)




  if (!loggedIn) {
    router.push('/')
  }

  useEffect(() => {
    fetch('http://localhost:8080/me/role', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('accessToken') ? `Bearer ${localStorage.getItem('accessToken')}` : '',
      },
    }).then(response => {
        if (response.status !== 200) {
          console.log('Щось пішло не так' + response.statusText)
        } else {
          return response.json()
        }
      }
    ).then(data => {
        if (data.role !== 'ADMIN') {
          router.push('/')
        }
      }
    ).catch(error => {
        console.error('Error fetching data:', error)
      }
    )
  }, [])

  useEffect(() => {
      fetch('http://localhost:8080/users/admin/all_users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('accessToken') ? `Bearer ${localStorage.getItem('accessToken')}` : '',
        },
      }).then(response => {
        if (response.status !== 200) {
          console.log('Щось пішло не так' + response.statusText)
        } else {
          return response.json()
        }
      }
      ).then(data => {
        setUsers(data)


      }
      ).catch(error => {
        console.error('Error fetching data:', error)
      })
    }
    , [bannedUsers.length, usersArray.length, moderatorsArray.length])

  console.log("bannedUsers", bannedUsers)

console.log("users", users)
  return (
    <CustomSection direction="col" center="items-center">
      {users && users.length > 0 && (
        <div
        className="border border-orange rounded-[16px] p-2.5 justify-center items-center flex flex-col gap-2 bg-black-pearl/70">
        <h4 className="text-primary text-3xl gap-10">Панель адміністратора</h4>
        <TableBase type="users" data={users} />
      </div>
      )}
    </CustomSection>
  )


}

export default AdminPanel
