'use client';

import { useState } from'react';
import { fetchClient } from '../utils/fetchClient';

export default function Page() {

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.username.trim()) {
            newErrors.username = 'Username is required';
        } else if (formData.username.length < 2 || formData.username.length > 40) {
            newErrors.username = 'Username must be between 2 and 40 characters';
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 4 || formData.password.length > 50) {
            newErrors.password = 'Password must be between 4 and 50 characters';
        }

        if (formData.password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value} = e.target;

        //Handle main form data
        if (['username', 'email', 'password'].includes(name)) {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
        //Handle password confirmation separately
        else if (name === 'confirmPassword') {
            setConfirmPassword(value);
        }
        //Clear errors
        if (errors[name]) {
            setErrors(prevErrors => ({
                ...prevErrors,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            const result = await fetchClient('/register', {
                method: 'POST',
                body: JSON.stringify(formData)
            });

            //Alert and reset form
            alert('Registration successful! Please check you email to verify your account.');
            setFormData({
                username: '',
                email: '',
                password: '',
            });
            setConfirmPassword('');
        } catch (error) {
            setErrors(prevErrors => ({
                ...prevErrors,
                form: error.message || 'Registration failed'
            }));
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
							Create an account
						</h1>
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
									required=''
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
									required=''
									value={formData.email}
									onChange={handleChange}
								/>
								{errors.email && (
									<p className='text-red-500 text-sm mt-1'>
										{errors.email}
									</p>
								)}
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
									className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
									required=''
									value={formData.password}
									onChange={handleChange}
								/>
								{errors.password && (
									<p className='text-red-500 text-sm mt-1'>
										{errors.password}
									</p>
								)}
							</div>
							<div>
								<label
									htmlFor='confirm-password'
									className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
								>
									Confirm Password
								</label>
								<input
									type='password'
									name='confirmPassword'
									id='confirm-password'
									placeholder='••••••••'
									className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
									required=''
									value={confirmPassword}
									onChange={handleChange}
								/>
								{errors.confirmPassword && (
									<p className='text-red-500 text-sm mt-1'>
										{errors.confirmPassword}
									</p>
								)}
							</div>
							{/* <div className='flex items-start'>
								<div className='flex items-center h-5'>
									<input
										id='terms'
										aria-describedby='terms'
										type='checkbox'
										className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800'
										required=''
									/>
								</div>
								<div className='ml-3 text-sm'>
									<label
										htmlFor='terms'
										className='font-light text-gray-500 dark:text-gray-300'
									>
										I accept the{' '}
										<a
											className='font-medium text-primary-600 hover:underline dark:text-primary-500'
											href='#'
										>
											Terms and Conditions
										</a>
									</label>
								</div>
							</div> */}
							{errors.form && (
								<div
									className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'
									role='alert'
								>
									{errors.form}
								</div>
							)}
							<button
								type='submit'
								disabled={isSubmitting}
								className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
							>
								{isSubmitting
									? 'Registering...'
									: 'Create an account'}
							</button>
							<p className='text-sm font-light text-gray-500 dark:text-gray-400'>
								Already have an account?{' '}
								<a
									href='#'
									className='font-medium text-primary-600 hover:underline dark:text-primary-500'
								>
									Login here
								</a>
							</p>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}
