'use client'

import { useState } from 'react';
import { fetchClient } from '../utils/fetchClient';

const ForgotPassword = () => {
	const [email, setEmail] = useState('');
	const [responseMessage, setResponseMessage] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setResponseMessage('');

		try {
			const response = await fetchClient('/forgot-password', {
				method: 'POST',
				body: email,
				headers: {
					'Content-Type': 'text/plain',
				},
			});

			const responseBody = await response.text();
			console.log('Response status:', response.status);
			console.log('Response body:', responseBody);

			if (response.ok) {
				setResponseMessage(
					'Password reset link has been sent to your email.'
				);
			} else {
				setResponseMessage(
					'Error sending reset link. Please try again.'
				);
			}
		} catch (error) {
			console.error('Error:', error);
			setResponseMessage('Error sending reset link. Please try again.');
		}

		setLoading(false);
	};

	return (
		<section className='bg-gray-50 dark:bg-gray-900'>
			<div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
				<a
					href='#'
					className='flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white'
				>
					<img
						className='w-8 h-8 mr-2'
						src='https://img.icons8.com/?size=100&id=fPpX3ra4WRD6&format=png&color=000000'
						alt='logo'
					/>
					Task Tracker
				</a>
				<div className='w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
					<div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
						<h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
							Forgot Your Password?
						</h1>
						<form
							className='space-y-4 md:space-y-6'
							onSubmit={handleSubmit}
						>
							<div>
								<label
									htmlFor='email'
									className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
								>
									Enter your email
								</label>
								<input
									type='email'
									id='email'
									name='email'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
									placeholder='name@company.com'
									className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
								/>
							</div>
							<button
								type='submit'
								className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
							>
								{loading ? 'Submitting...' : 'Send Reset Link'}
							</button>
						</form>
						{responseMessage && <p>{responseMessage}</p>}
					</div>
				</div>
			</div>
		</section>
	);
};

export default ForgotPassword;
