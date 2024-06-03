'use client';
import {
	Inter, Mohave, Moul, Roboto, Poppins,
} from 'next/font/google';
import './globals.css';
import Header from '@/components/header/Header';
import React from 'react';
import {store} from '@/lib/store';
import {Provider} from 'react-redux';

const inter = Poppins({
	weight: '400', style: 'normal', display: 'block', subsets: ['latin'],
});

// Export const metadata = {
//   title: 'Student.ch - home page',
//   description: 'Student.ch - imageboard for students'
// }

export default function RootLayout({children}) {
	return (
		<Provider store={store}>
			<html lang='en'>
				<body className={`${inter.className} flex flex-col items-center `}>
					<Header />
					<main className='w-full min-h-[90vh] flex flex-col px-2 sm:px-3.5 md:px-5'>
						{children}
					</main>
				</body>
			</html>
		</Provider>
	);
}
