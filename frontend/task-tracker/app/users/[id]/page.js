'use client';

import { useState, useEffect } from 'react';
import { fetchClient } from '../../utils/fetchClient';
import { useRouter, useParams } from 'next/navigation';

export default function UserPage() {
	const [formData, setFormData] = useState({
		username: '',
		newPassword: '',
	});
	const [confirmPassword, setConfirmPassword] = useState('');
	const [errors, setErrors] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const router = useRouter();
	const { id } = useParams();

	useEffect(() => {
		if (id) {
			// Fetch user data from backend
			async function fetchUserData(userId) {
				try {
					const response = await fetchClient(`/users/${userId}`);
					setFormData({
						username: response.username,
						newPassword: '',
					});
				} catch (error) {
					setErrors({ form: 'Failed to fetch user data' });
				}
			}
			fetchUserData(id);
		}
	}, [id]);

	const validateForm = () => {
		const newErrors = {};

		if (!formData.username.trim()) {
			newErrors.username = 'Username is required';
		}

		if (formData.newPassword && formData.newPassword !== confirmPassword) {
			newErrors.confirmPassword = 'Passwords do not match';
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!validateForm()) {
			return;
		}

		setIsSubmitting(true);

		const payload = { username: formData.username };
		if (formData.newPassword) {
			payload.password = formData.newPassword;
		}

		try {
			await fetchClient(`/users/${id}`, {
				method: 'PUT',
				body: JSON.stringify(payload),
			});
			alert('User updated successfully');
			router.push('/users'); // Redirect to users list or another page
		} catch (error) {
			setErrors({ form: error.message });
		} finally {
			setIsSubmitting(false);
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
							Update User
						</h1>
						{errors.form && (
							<p className='text-red-500 text-center'>
								{errors.form}
							</p>
						)}
						<form
							className='space-y-4 md:space-y-6'
							onSubmit={handleSubmit}
						>
							<div>
								<label
									htmlFor='username'
									className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
								>
									Your Username
								</label>
								<input
									type='text'
									name='username'
									id='username'
									className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
									placeholder='Display Name'
									required
									value={formData.username}
									onChange={handleChange}
								/>
								{errors.username && (
									<p className='text-red-500 text-sm mt-1'>
										{errors.username}
									</p>
								)}
							</div>
							<div>
								<label
									htmlFor='newPassword'
									className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
								>
									New Password
								</label>
								<input
									type='password'
									name='newPassword'
									id='newPassword'
									placeholder='••••••••'
									className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
									value={formData.newPassword}
									onChange={handleChange}
								/>
							</div>
							<div>
								<label
									htmlFor='confirmPassword'
									className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
								>
									Confirm New Password
								</label>
								<input
									type='password'
									name='confirmPassword'
									id='confirmPassword'
									placeholder='••••••••'
									className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
									value={confirmPassword}
									onChange={(e) =>
										setConfirmPassword(e.target.value)
									}
								/>
								{errors.confirmPassword && (
									<p className='text-red-500 text-sm mt-1'>
										{errors.confirmPassword}
									</p>
								)}
							</div>
							<button
								type='submit'
								disabled={isSubmitting}
								className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
							>
								{isSubmitting ? 'Updating...' : 'Update User'}
							</button>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}
