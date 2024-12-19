'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { fetchClient } from '../utils/fetchClient';

export default function ResetPassword() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const router = useRouter();
	const searchParams = useSearchParams();
	const token = searchParams.get('token');

	useEffect(() => {
		if (!token) {
			setError('Invalid or missing token');
		}
	}, [token]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setError('Passwords do not match');
			return;
		}

		try {
			const response = await fetchClient('/api/reset-password', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, newPassword: password, token }),
			});

			if (response.ok) {
				setSuccess('Password reset successfully');
				setError('');
				setTimeout(() => {
					router.push('/login');
				}, 2000);
			} else {
				const data = await response.json();
				setError(data.message || 'Error resetting password');
			}
		} catch (error) {
			setError('Error resetting password. Please try again.');
		}
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
				<div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
					<div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
						<h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
							Reset Password
						</h1>
						{error && (
							<p className='text-red-500 text-center'>{error}</p>
						)}
						{success && (
							<p className='text-green-500 text-center'>
								{success}
							</p>
						)}
						<form
							className='space-y-4 md:space-y-6'
							onSubmit={handleSubmit}
						>
							<div>
								<label
									htmlFor='email'
									className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
								>
									Your Email
								</label>
								<input
									type='email'
									name='email'
									id='email'
									className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
									placeholder='name@company.com'
									required
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div>
								<label
									htmlFor='password'
									className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
								>
									New Password
								</label>
								<input
									type='password'
									name='password'
									id='password'
									placeholder='••••••••'
									className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
									required
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
								/>
							</div>
							<div>
								<label
									htmlFor='confirm-password'
									className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
								>
									Confirm New Password
								</label>
								<input
									type='password'
									name='confirmPassword'
									id='confirm-password'
									placeholder='••••••••'
									className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
									required
									value={confirmPassword}
									onChange={(e) =>
										setConfirmPassword(e.target.value)
									}
								/>
							</div>
							<button
								type='submit'
								className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
							>
								Reset Password
							</button>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}
