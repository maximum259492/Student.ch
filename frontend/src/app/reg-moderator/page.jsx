'use client'
import React, { useState } from 'react'
import CustomSection from '@/components/custom-section/CustomSection'
import Button from '@/components/button/Button'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import { register } from '@/lib/slices/userSlice/userSlice'


const RegistrationPage = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    roleId: '',
    password: '',
    confirmPassword: ''
  })
  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      setError('Введений пароль не співпадає з підтвердженням')
      setFormData({ ...formData, password: '', confirmPassword: '' })
    } else {
      fetch('http://localhost:8080/auth/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          username: formData.username,
          password: formData.password,
          roleId: 2
        })
      })
        .then(response => {
            if (response.status === 409) {
              setError('Користувач з таким нікнеймом вже існує')
            } else if (response.status === 400) {
              setError('Помилка введених даних')
            } else if (response.status === 201 || response.status === 200) {
              alert('Ви успішно зареєструвались')
              return response.json()
            } else {
              setError('Помилка сервера')
            }
          }
        )
        .then(data => {
            const accessToken = data.access_token
            console.log(accessToken)
            localStorage.setItem('accessToken', accessToken)
            dispatch(register(data))
            router.push('/')
          }
        )
        .catch(error => {
            console.error('Error:', error)
          }
        )
    }
  }

  return (
    <CustomSection direction="col" center="items-center">
      <h1 className="text-base md:text-4xl text-primary">Реєстрація</h1>
      <form
        className="flex flex-col md:grid w-full border border-orange place-content-center md:w-3/4 bg-black-pearl md:px-2 py-2 px-0.5 gap-3 md:justify-stretch rounded-xl"
        onSubmit={handleSubmit}>
        <h2 className="text-primary text-base md:text-xl text-center mt-4">Заповніть дані нижче для початку користування
          іміджбордом.</h2>
        <div className="flex flex-col w-full md:grid md:grid-cols-2 place-items-center gap-y-1.5 px-3.5 gap-x-5">
          <label className="md:col-span-2 text-primary">Імʼя та прізвище</label>
          <input type="text" placeholder="Ім’я" name="firstName"
                 className="md:px-2 py-2 px-0.5 text-black-pearl w-full border border-primary rounded-md" required
                 value={formData.firstName}
                 onChange={handleChange} />
          <input type="text" placeholder="Прізвище" name="lastName"
                 className="md:px-2 py-2 px-0.5 border w-full text-black-pearl border-primary rounded-md"
                 required value={formData.lastName}
                 onChange={handleChange} />
        </div>
        <div className="flex flex-col md:grid gap-y-1.5 px-3.5 place-items-center ">
          <label className="text-primary">Нікнейм</label>
          <input type="text" placeholder="Нікнейм"
                 className="md:px-2 w-full py-2 px-0.5 text-black-pearl border border-primary rounded-md"
                 name="username"
                 value={formData.username}
                 onChange={handleChange}
                 required />
        </div>
        <div className="flex flex-col md:grid md:grid-cols-2 gap-x-5 gap-y-1.5 px-3.5 place-items-center">
          <label className="md:col-span-2 text-primary">Пароль</label>
          <input type="password" placeholder="Пароль" name="password" value={formData.password}
                 onChange={handleChange} className="p-2 w-full text-black-pearl border border-primary rounded-md"
                 required />
          <input type="password" placeholder="Підтвердження паролю" value={formData.confirmPassword}
                 onChange={handleChange} name="confirmPassword"
                 className="p-2 border border-primary w-full text-black-pearl rounded-md" required />
        </div>
        <div className="mt-4 w-full flex justify-center">
          <Button width="w-fit md:w-full" type="submit">Зареєструватися</Button>
        </div>
      </form>
      <div>
        {error && <p className="text-[#dc2626]">{error}</p>}
      </div>
    </CustomSection>
  )
}


export default RegistrationPage
