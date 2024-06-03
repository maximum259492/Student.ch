import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addDormThread } from '@/lib/slices/dorm-threads/dormThreadsSlice';
import { addFoodThread } from '@/lib/slices/food-threads/foodThreadsSlice';
import { addStudyThread } from '@/lib/slices/study-threads/studyThreadsSlice';

const CreateThreadButton = ({ category }) => {
  let categoryId = 0;
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [thread, setThread] = useState({
    title: '',
    text: '',
    image: null,
  });


  const handleInputChange = (e) => {
    const { name, value, files, type } = e.target;
    if (type === 'file') {
      setThread({
        ...thread,
        image: files[0],
      });

    } else {
      setThread({
        ...thread,
        [name]: value,
      });
    }
    }



  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, text, image } = thread;
    const threadData = { title, text, image };

    switch (category) {
      case 'food':
        categoryId = 3;
        dispatch(addFoodThread(threadData));
        break;
      case 'dorm':
        categoryId = 2;
        dispatch(addDormThread(threadData));
        break;
      case 'study':
        categoryId = 1;
        dispatch(addStudyThread(threadData));
        break;
      default:
        alert('Unknown category');
    }


    const formData = new FormData();
    formData.append('title', thread.title);
    formData.append('text', thread.text);
    formData.append('themeId', categoryId);
    if (image) { // Check if image is selected before appending
      formData.append('image', image);
    }

    console.log("Image: ", thread.image);

    axios.post('http://localhost:8080/thread/create', formData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        'Content-Type': 'multipart/form-data',
      }
    })
      .then((response) => {
        if (response.status === 200) {
          setIsOpen(false);
          thread.title = '';
          thread.text = '';
          thread.image = null;
        if (category === 'food') {
          dispatch(addFoodThread(threadData));
        } else if (category === 'dorm') {
          dispatch(addDormThread(threadData));
        } else if (category === 'study') {
          dispatch(addStudyThread(threadData));
        }

      } else {
        alert('Помилка при створенні треду');
      }
      })
      .catch((error) => {
        // Handle error
        console.error('Error:', error);
      });
  }


  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative flex flex-col w-full items-center">
      <button
        className="bg-black-pearl hover:bg-black-pearl/50 text-primary border-peach border font-bold py-2 px-4 rounded"
        onClick={handleOpen}
      >
        Створити тред
      </button>
      {isOpen && (
        <div className="absolute top-full bg-black-pearl mt-1 w-full max-w-[400px] p-4 border border-orange z-50 rounded shadow-lg bg-white">
          <form className="flex flex-col items-center" onSubmit={handleSubmit}>
            <div className="mb-4 w-full">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Заголовок
              </label>
              <input
                type="text"
                name="title"
                onChange={handleInputChange}
                required
                value={thread.title}
                className="shadow text-black-pearl appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="w-full">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Текст
              </label>
              <textarea
                name="text"
                required
                value={thread.text}
                onChange={handleInputChange}
                className="shadow text-black-pearl appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                rows="3"
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Додати зображення
              </label>
              <input
                type="file"
                onChange={handleInputChange}
                className="appearance-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Запостити!
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CreateThreadButton;
