import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { fetchClient } from '../utils/fetchClient';
import { useAuth } from '../context/AuthContext';

Modal.setAppElement('#root');

export default function AddTask({ isOpen, onRequestClose, onTaskAdded }) {
	const { user } = useAuth();
	const [formData, setFormData] = useState({
		title: '',
		description: '',
		dueDate: '',
		assigneeId: null,
	});
	const [users, setUsers] = useState([]);
	const [error, setError] = useState(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await fetchClient('/users');
				setUsers(response);
			} catch (error) {
				setError(error.message);
			}
		};

		fetchUsers();
	}, []);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		try {
			const response = await fetchClient('/tasks', {
				method: 'POST',
				body: JSON.stringify(formData),
			});
			onTaskAdded(response);
			onRequestClose();
		} catch (error) {
			setError(error.message);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			contentLabel='Add Task'
			className='fixed inset-0 flex items-center justify-center z-50'
		>
			<div className='bg-white rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-full max-w-md p-6 space-y-4 md:space-y-6 sm:p-8'>
				<h2 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
					Add Task
				</h2>
				{error && <p className='text-red-500'>{error}</p>}
				<form
					onSubmit={handleSubmit}
					className='space-y-4 md:space-y-6'
				>
					<div>
						<label
							htmlFor='title'
							className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
						>
							Title
						</label>
						<input
							type='text'
							id='title'
							name='title'
							value={formData.title}
							onChange={handleChange}
							className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
							required
						/>
					</div>
					<div>
						<label
							htmlFor='description'
							className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
						>
							Description
						</label>
						<textarea
							id='description'
							name='description'
							value={formData.description}
							onChange={handleChange}
							className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
							required
						/>
					</div>
					<div>
						<label
							htmlFor='dueDate'
							className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
						>
							Due Date
						</label>
						<input
							type='date'
							id='dueDate'
							name='dueDate'
							value={formData.dueDate}
							onChange={handleChange}
							className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
							required
						/>
					</div>
					<div>
						<label
							htmlFor='assigneeId'
							className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
						>
							Assignee
						</label>
						<select
							id='assigneeId'
							name='assigneeId'
							value={formData.assigneeId || ''}
							onChange={handleChange}
							className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
							required
						>
							<option value=''>Select Assignee</option>
							{users.map((user) => (
								<option
									key={user.id}
									value={user.id}
								>
									{user.username}
								</option>
							))}
						</select>
					</div>
					<button
						type='submit'
						disabled={isSubmitting}
						className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
					>
						{isSubmitting ? 'Adding Task...' : 'Add Task'}
					</button>
				</form>
			</div>
		</Modal>
	);
}
