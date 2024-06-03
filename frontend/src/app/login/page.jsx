'use client'
import React, { useState } from 'react'
import CustomSection from '@/components/custom-section/CustomSection'
import Button from '@/components/button/Button'
import { useRouter } from 'next/navigation'
import { logIn } from '@/lib/slices/userSlice/userSlice'
import { useDispatch } from 'react-redux'


const LoginPage = () => {
  const dispatch = useDispatch()
  const [userData, setUserData] = useState({
    username: '',
    password: '',
  })

  const [error, setError] = useState('');




  const handleChange = (e) => {
    const { id, value } = e.target
    e.preventDefault()
    setUserData({
      ...userData,
      [id]: value
    })
  }

  const router = useRouter()
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!userData.username || !userData.password) {
      setError('Будь ласка, заповніть всі поля');
      return;
    }

    // Clear error message
    setError('');

    // Send POST request
    fetch('http://localhost:8080/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: userData.username,
        password: userData.password
      })
    })
      //  if response status is not 200, throw an error
      .then(response => {
        if (!response.ok) {
          setError('Неправильний логін або пароль');
        } else {
          // Parse response body as JSON
          return response.json();
        }
      })
      .then(data => {
        // Access tokens from the parsed JSON data
        const accessToken = data.access_token;
        const refreshToken = data.refresh_token;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        setUserData({
          username: '',
          password: ''
        });
        dispatch(logIn({ username: userData.username, password: userData.password}));

        // Redirect to home page
        router.push('/');
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle error if necessary
      });
  };

  return (
    <CustomSection direction="col" center="items-center justify-center">
      <div className="flex flex-col items-center bg-black-pearl border border-orange gap-4 rounded-xl py-2 px-4">
        <h4 className="text-[20px] sm:text-4xl text-center text-primary">Увійти в особистий кабінет</h4>
        <form className="grid grid-cols-2 gap-x-2 gap-y-1.5 place-items-stretch w-full" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="text-primary">Нікнейм</label>
            <input type="text" id="username" className="input p-1 text-black-pearl rounded-sm"
                   onChange={handleChange} value={userData.username} />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-primary">Пароль</label>
            <input type="password" id="password" className="input text-black-pearl p-1 rounded-sm"
                   onChange={handleChange} value={userData.password} />
          </div>
          <div className="col-span-2">
            <Button type="submit" width="w-full">Увійти</Button>
          </div>
        </form>
        <div>
        {error && <p className="text-[#dc2626]">{error}</p>}
        </div>
      </div>
    </CustomSection>
  )
}

export default LoginPage
