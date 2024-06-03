import React from 'react'
import CustomLink from '@/components/header/CustomLink'
import { dataLinks } from '@/components/header/Header'
import Button from '@/components/button/Button'
import Link from 'next/link'
import { isLoggedIn, logOut } from '@/lib/slices/userSlice/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'

const BurgerMenu = ({ toggle, opened, dataLinks, isLoggedIn }) => {

  const dispatch = useDispatch()
  const router = useRouter()
  const isLoggedInState = useSelector(state => state.user.isLoggedIn);


  const handleLogout = () => {
    fetch('http://localhost:8080/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
      .then(response => {
        if (!response.ok) {
          console.log('Помилка при виході')
        } else {
          localStorage.clear()
          dispatch(logOut())
          router.push('/')
        }
      })
  }
  return (
    <div className="relative z-40 cursor-pointer py-1 md:hidden" onClick={toggle}>
      <div
        className={`relative z-50 block h-[2px] w-5 bg-primary content-[''] before:absolute before:top-[-0.35rem] before:z-50 before:block before:h-full before:w-full before:bg-primary before:transition-all before:duration-200 before:ease-out before:content-[''] after:absolute after:right-0 after:bottom-[-0.35rem] after:block after:h-full after:w-full after:bg-primary after:transition-all after:duration-200 after:ease-out after:content-[''] ${opened && 'bg-transparent before:top-[0rem] bg-opacity-0 before:w-full before:rotate-45 before:transform after:bottom-[0] after:w-full after:-rotate-45 after:transform'}`}
      >
        <nav
          className={`relative z-50 top-[27px] w-screen flex flex-col items-center gap-2 h-fit px-2 py-3 -translate-x-[100%] opacity-0 bg-black-pearl ${opened && '-translate-x-[8px] opacity-100'} transition-all duration-200`}>
          <ul className="flex flex-col w-screen items-center gap-1 ">
            {dataLinks.map((link, index) => (
              <li key={index}>
                <CustomLink href={link.href} title={link.title} key={index} />
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-1 md:gap-2 lg:gap-3 items-center">
            {isLoggedInState ? <Button onClick={(e) => handleLogout()}>Вийти</Button> :
              <Button><Link href="/login">Увійти</Link></Button>}
            {isLoggedInState ? null : <Button><Link href="/registration">Зареєструватися</Link></Button>}
          </div>
        </nav>
      </div>
    </div>
  )
}

export default BurgerMenu
