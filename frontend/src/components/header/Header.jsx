'use client'
import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import { LogoWB } from '../../../public'
import Link from 'next/link'
import CustomLink from '@/components/header/CustomLink'
import Button from '@/components/button/Button'
import BurgerMenu from '@/components/burger-menu/BurgerMenu'
import {logOut, isLoggedIn, selectRole, user} from '@/lib/slices/userSlice/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'

const dataLinks = [
  { title: 'Домашня', href: '/' },
  { title: 'Навчання', href: '/education' },
  { title: 'Гуртожиток', href: '/dormitory' },
  { title: 'Їдальня', href: '/food' }
]


const Header = () => {
  const dispatch = useDispatch()
  const LoggedIn = useSelector(isLoggedIn)
  console.log('Logged in: ', LoggedIn)
  const [opened, setOpened] = useState(false)
  const router = useRouter()
  const [role, setRole] = useState('')
    const currentUser = useSelector(user)

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
        if (data.role) {
          setRole(data.role)
         } else {
          setRole('')
        }
      }
    ).catch(error => {
        console.error('Error fetching data:', error)
      }
    )
  }, [currentUser])


    console.log("CURRENT USER", currentUser)

  const toggleMenu = () => {
    setOpened(!opened)
  }

  const handleLogout = () => {
    fetch('http://localhost:8080/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
      .then(response => {
        if (!response.status === 200) {
          console.log('Помилка при виході')
        } else {
          dispatch(logOut())
          setRole('')
          localStorage.clear()
          router.push('/')
        }
      })
  }
  return (
    <header
      className="w-full h-fit py-2 flex flex-row bg-black-pearl px-2 items-center justify-center border-peach border-b ">
      <div className="flex flex-row items-center justify-between w-full gap-2">
        <BurgerMenu toggle={toggleMenu} opened={opened} dataLinks={dataLinks} isLoggedIn={isLoggedIn} />
        <Link href={'/'} className="w-fit h-full mx-auto md:mx-0">
          <Image src={LogoWB} alt="logo" width={120} height={60} />
        </Link>
        <nav className="md:flex flex-row hidden  items-center max-w-[450px] gap-5 w-full justify-between">
          <ul className="list-none flex flex-row items-center gap-1 md:gap-3 lg:gap-5 justify-evenly w-full">
            {dataLinks.map((link, index) => (
              <li key={index}>
                <CustomLink href={link.href} title={link.title} key={index} />
              </li>
            ))}
          </ul>
        </nav>
        <div className="hidden sm:flex flex-row gap-1 md:gap-2 lg:gap-3 items-center">
          {role && role === 'ADMIN' ? <Button><Link href="/admin-panel">Панель адміна</Link></Button> :
            role && role === 'MODERATOR' ? <Button><Link href="/moderator-panel">Панель модератора</Link></Button> :
              null}
          {LoggedIn ? <Button onClick={(e) => handleLogout()}>Вийти</Button> :
            <Button><Link href="/login">Увійти</Link></Button>}
          {LoggedIn ? <Button><Link href="/personal-account">Особистий кабінет</Link></Button> :
            <Button><Link href="/registration">Зареєструватися</Link></Button>}

        </div>
      </div>
    </header>
  )
}

export default Header
