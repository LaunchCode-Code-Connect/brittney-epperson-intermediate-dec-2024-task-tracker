'use client';

import { useEffect, useState } from 'react';
import { fetchClient } from '../utils/fetchClient';
import { useRouter } from 'next/navigation';

export default function Users() {
	const router = useRouter();
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [userToDelete, setUserToDelete] = useState(null);

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

	const handleEditUser = (userId) => {
        router.push(`/users/${userId}`);
    };

	const handleDeleteUser = (userId) => {
		setUserToDelete(userId);
		setShowModal(true);
	};

	const confirmDelete = async () => {
		setShowModal(false);
		if (!userToDelete) return;

		try {
			const response = await fetchClient(`/users/${userToDelete}`, {
				method: 'DELETE',
			});
		} catch (error) {
			alert('Error deleting user:', error);
		} finally {
			setUserToDelete(null);
			loadUsers();
		}
	};

	const cancelDelete = () => {
		setShowModal(false);
		setUserToDelete(null);
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
		<div className='p-10'>
			<h2 className='pb-10 text-4xl font-bold text-center text-gray-900 dark:text-white'>
				Users{' '}
			</h2>
			<div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
				<table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
					<thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
						<tr>
							<th
								scope='col'
								className='px-6 py-3'
							>
								ID
							</th>
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
									<td className='px-6 py-4'>{user.id}</td>
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
											{user.enabled
												? 'Active'
												: 'Inactive'}
										</span>
									</td>
									<td className='px-6 py-4'>
										<div className='flex space-x-2'>
											<button
												onClick={() => handleEditUser(user.id)}
												className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
											>
												Edit
											</button>
											<button
												onClick={() =>
													handleDeleteUser(user.id)
												}
												className='font-medium text-red-600 dark:text-red-500 hover:underline'
											>
												Delete
											</button>
										</div>
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
			{/* Delete Confirmation Modal */}
			{showModal && (
				<div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
					<div className='bg-white dark:bg-gray-800 p-6 rounded-lg'>
						<h2 className='text-lg font-medium text-gray-900 dark:text-gray-100'>
							Are you sure you want to delete this user?
						</h2>
						<div className='mt-4 flex justify-end space-x-2'>
							<button
								onClick={cancelDelete}
								className='px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-400 dark:hover:bg-gray-500'
							>
								Cancel
							</button>
							<button
								onClick={confirmDelete}
								className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600'
							>
								Delete
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
