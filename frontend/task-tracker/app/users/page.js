'use client'

import { useEffect, useState } from 'react';
import { fetchClient } from '../utils/fetchClient';

export default function Users() {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		loadUsers();
	}, []);

	const loadUsers = async () => {
		try {
			setLoading(true);
			setError(null);
			const data = await fetchClient('/users');
			setUsers(data);
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	if (loading) {
		return (
			<div className='flex justify-center items-center p-8'>
				<div className='text-gray-500'>Loading users...</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className='bg-red-50 dark:bg-red-900 p-4 rounded-lg'>
				<div className='text-red-800 dark:text-red-200'>
					Error loading users: {error}
				</div>
			</div>
		);
	}

	return (
		<div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
			<table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
				<thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
					<tr>
						<th
							scope='col'
							className='px-6 py-3'
						>
							Username
						</th>
						<th
							scope='col'
							className='px-6 py-3'
						>
							Email
						</th>
						<th
							scope='col'
							className='px-6 py-3'
						>
							Status
						</th>
						<th
							scope='col'
							className='px-6 py-3'
						>
							Action
						</th>
					</tr>
				</thead>
				<tbody>
					{users.length === 0 ? (
						<tr className='bg-white dark:bg-gray-800'>
							<td
								colSpan='4'
								className='px-6 py-4 text-center'
							>
								No users found
							</td>
						</tr>
					) : (
						users.map((user) => (
							<tr
								key={user.id}
								className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
							>
								<th
									scope='row'
									className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
								>
									{user.username}
								</th>
								<td className='px-6 py-4'>{user.email}</td>
								<td className='px-6 py-4'>
									<span
										className={`px-2 py-1 rounded-full text-xs font-medium ${
											user.enabled
												? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
												: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
										}`}
									>
										{user.enabled ? 'Active' : 'Inactive'}
									</span>
								</td>
								<td className='px-6 py-4'>
									<a
										href='#'
										className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
									>
										Edit
									</a>
								</td>
							</tr>
						))
					)}
				</tbody>
			</table>

			{users.length > 0 && (
				<nav
					className='flex items-center flex-column flex-wrap md:flex-row justify-between pt-4'
					aria-label='Table navigation'
				>
					<span className='text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto'>
						Showing{' '}
						<span className='font-semibold text-gray-900 dark:text-white'>
							1-10
						</span>{' '}
						of{' '}
						<span className='font-semibold text-gray-900 dark:text-white'>
							{users.length}
						</span>
					</span>
					<ul className='inline-flex -space-x-px rtl:space-x-reverse text-sm h-8'>
						<li>
							<a
								href='#'
								className='flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
							>
								Previous
							</a>
						</li>
						<li>
							<a
								href='#'
								aria-current='page'
								className='flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
							>
								1
							</a>
						</li>
						<li>
							<a
								href='#'
								className='flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
							>
								Next
							</a>
						</li>
					</ul>
				</nav>
			)}
		</div>
	);
}