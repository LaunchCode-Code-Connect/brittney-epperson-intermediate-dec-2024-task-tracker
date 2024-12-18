'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { fetchClient } from '../utils/fetchClient';

export default function VerifyEmailPage() {
	const [status, setStatus] = useState('verifying');
	const [message, setMessage] = useState('');
	const searchParams = useSearchParams();

	useEffect(() => {
		const token = searchParams.get('token');

		const verifyEmail = async () => {
			if (!token) {
				setStatus('error');
				setMessage('No verification token provided');
				return;
			}

			try {
				await fetchClient(`/verify-email?token=${token}`, {
					method: 'POST',
				});

				setStatus('success');
				setMessage('Email verified successfully! You can now log in.');
			} catch (error) {
				setStatus('error');
				setMessage(error.message || 'Email verification failed');
			}
		};

		verifyEmail();
	}, [searchParams]);

	return (
		<div className='flex items-center justify-center min-h-screen bg-gray-50'>
			<div className='w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-md'>
				{status === 'verifying' && (
					<div className='text-center'>
						<p className='text-xl'>Verifying your email...</p>
					</div>
				)}

				{status === 'success' && (
					<div className='text-center text-green-600'>
						<h2 className='text-2xl font-bold mb-4'>
							Email Verified!
						</h2>
						<p>{message}</p>
						<a href='/login'>Login</a>
					</div>
				)}

				{status === 'error' && (
					<div className='text-center text-red-600'>
						<h2 className='text-2xl font-bold mb-4'>
							Verification Failed
						</h2>
						<p>{message}</p>
					</div>
				)}
			</div>
		</div>
	);
}
