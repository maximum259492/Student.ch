'use client';
import CustomSection from '@/components/custom-section/CustomSection';
import ThreadGlobal from '@/components/threads/ThreadGlobal';
import React, {useEffect, useState} from 'react';
import {changeIsNotInThread, selectHiddenThreads} from '@/lib/slices/threadSlice/threadSlice';
import {useDispatch, useSelector} from 'react-redux';

export default function Home() {
	const [fetchedData, setFetchedData] = useState([]);
	const dispatch = useDispatch();
	const hiddenThreads = useSelector(selectHiddenThreads);
	useEffect(() => {
		const fetchData = async () => {
			await fetch('http://localhost:8080/thread/latest', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: localStorage.getItem('accessToken') ? `Bearer ${localStorage.getItem('accessToken')}` : '',
				},
			}).then(response => response.json())
				.then(data => {
					setFetchedData(data);
					console.log('Дані успішно завантажені');
				}).catch(error => {
					console.error('Error fetching data:', error);
				});
		};

		fetchData();
	}, [hiddenThreads.length]);

	console.log('HIdden threads', hiddenThreads);

	useEffect(() => {
		dispatch(changeIsNotInThread());
	}, []);

	const latestThreads = fetchedData || [];

	return (
		<CustomSection direction={'col'}>
			<div className='w-full flex flex-col justify-around md:max-h-[240px] text-center gap-2'>
				<h1 className='text-base md:text-4xl text-center font-bold text-primary whitespace-pre'>Вітаємо на
          студент.ч!</h1>
				<h4 className='text-xl text-primary '>Дослідіть студентське життя від гуртожитку до дипломної роботи!</h4>
				<p className='text-base hidden md:block text-[#fff] opacity-80 leading-8'>Іміджборд для всіх: від студентів до
          викладачів,
          кожен може
          висказати та запитати будь-що і будь коли!</p>
			</div>
			<div className='w-full h-full flex flex-col gap-3 items-center justify-end'>
				<h4 className='text-primary text-base md:text-2xl'>Останні треди</h4>
				<div className='w-full h-full gap-2 flex flex-col justify-end'>
					{latestThreads.map((data, index) => (
						<ThreadGlobal title={data.title} text={data.text} imageData={data.imageData} key={index} username={data.author.username} id={data.id} role = {data.author.role.name} />
					))}
				</div>
			</div>
		</CustomSection>
	);
}
