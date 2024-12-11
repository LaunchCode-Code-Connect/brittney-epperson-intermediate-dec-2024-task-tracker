'use client';

import { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { fetchClient } from '../utils/fetchClient';

export default function Page() {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const [responseMessage, setResponseMessage] = useState('');
	const [loading, setLoading] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			const data = await fetchClient('/login', {
				method: 'POST',
				body: JSON.stringify(formData),
			});

			const token = data.token;
			localStorage.setItem('token', token);

			const decodedToken = jwtDecode(token);
			const username = decodedToken.sub;

			setResponseMessage(
				`Login successful! Welcome, ${username || 'User'}!`
			);
		} catch (error) {
			setResponseMessage('An error occurred: ' + error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
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
					<div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
						<div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
							<h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
								Sign in to your account
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
										Your email
									</label>
									<input
										type='email'
										name='email'
										id='email'
										className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
										placeholder='name@company.com'
										required=''
										value={formData.email}
										onChange={handleChange}
									/>
								</div>
								<div>
									<label
										htmlFor='password'
										className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
									>
										Password
									</label>
									<input
										type='password'
										name='password'
										id='password'
										placeholder='••••••••'
										className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
										required=''
										value={formData.password}
										onChange={handleChange}
									/>
								</div>
								<div className='flex items-center justify-between'>
									<div className='flex items-start'>
										<div className='flex items-center h-5'>
											<input
												id='remember'
												aria-describedby='remember'
												type='checkbox'
												className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800'
												required=''
											/>
										</div>
										<div className='ml-3 text-sm'>
											<label
												htmlFor='remember'
												className='text-gray-500 dark:text-gray-300'
											>
												Remember me
											</label>
										</div>
									</div>
									<a
										href='#'
										className='text-sm font-medium text-primary-600 hover:underline dark:text-primary-500'
									>
										Forgot password?
									</a>
								</div>
								<button
									type='submit'
									className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
								>
									{loading ? 'Submitting...' : 'Sign In'}
								</button>
								<p className='text-sm font-light text-gray-500 dark:text-gray-400'>
									Don’t have an account yet?{' '}
									<a
										href='/register'
										className='font-medium text-primary-600 hover:underline dark:text-primary-500'
									>
										Sign up
									</a>
								</p>
							</form>
							{responseMessage && <p>{responseMessage}</p>}
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
