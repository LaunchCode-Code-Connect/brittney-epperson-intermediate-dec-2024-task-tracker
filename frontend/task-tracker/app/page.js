'use client';

import { useEffect, useState } from 'react';
import { fetchClient } from './utils/fetchClient';
import { useAuth } from './context/AuthContext';
import AddTask from './forms/AddTask';

export default function Dashboard() {
	const { user } = useAuth();
	const [tasks, setTasks] = useState([]);
	const [notifications, setNotifications] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

	useEffect(() => {
		if (!user) return;

		const fetchData = async () => {
			try {
				setLoading(true);
				const tasksData = await fetchClient(`/users/${user.id}/tasks`);
				const notificationsData = await fetchClient(
					`/users/${user.id}/notifications`
				);
				setTasks(tasksData);
				setNotifications(notificationsData);
			} catch (error) {
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [user]);

	const handleTaskAdded = (newTask) => {
		setTasks((prevTasks) => [...prevTasks, newTask]);
	};

	const handleTaskCompletion = async (taskId, completed) => {
		try {
			await fetchClient(`/tasks/${taskId}`, {
				method: 'PATCH',
				body: JSON.stringify({ completed }),
			});
			setTasks((prevTasks) =>
				prevTasks.map((task) =>
					task.id === taskId ? { ...task, completed } : task
				)
			);
		} catch (error) {
			setError(error.message);
		}
	};

	if (!user) {
		return (
			<div className='flex justify-center items-center h-screen'>
				Loading user...
			</div>
		);
	}

	if (loading) {
		return (
			<div className='flex justify-center items-center h-screen'>
				Loading...
			</div>
		);
	}

	if (error) {
		return (
			<div className='flex justify-center items-center h-screen'>
				Error: {error}
			</div>
		);
	}

	return (
		<div className='container mx-auto p-4'>
			<h1 className='text-3xl font-bold mb-4'>Welcome {user.username}</h1>
			<button
				onClick={() => setIsTaskModalOpen(true)}
				className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4'
			>
				Add Task
			</button>
			<AddTask
				isOpen={isTaskModalOpen}
				onRequestClose={() => setIsTaskModalOpen(false)}
				onTaskAdded={handleTaskAdded}
			/>
			<section className='mb-8'>
				<h2 className='text-2xl font-semibold mb-2'>Tasks</h2>
				<ul className='space-y-4'>
					{tasks.map((task) => (
						<li
							key={task.id}
							className='p-4 bg-white rounded-lg shadow-md flex justify-between items-center'
						>
							<div>
								<h3 className='text-xl font-bold'>
									{task.title}
								</h3>
								<p className='text-gray-600'>
									{task.description}
								</p>
								<p className='text-gray-500'>
									Due:{' '}
									{new Date(
										task.dueDate
									).toLocaleDateString()}
								</p>
							</div>
							<div className='flex items-center'>
								<input
									type='checkbox'
									checked={task.completed}
									onChange={(e) =>
										handleTaskCompletion(
											task.id,
											e.target.checked
										)
									}
									className='mr-2'
								/>
								<span
									className={
										task.completed
											? 'text-green-500'
											: 'text-red-500'
									}
								>
									{task.completed ? 'Completed' : 'Pending'}
								</span>
							</div>
						</li>
					))}
				</ul>
			</section>
			<section>
				<h2 className='text-2xl font-semibold mb-2'>Notifications</h2>
				<ul className='space-y-4'>
					{notifications.map((notification) => (
						<li
							key={notification.id}
							className='p-4 bg-white rounded-lg shadow-md'
						>
							{notification.message}
						</li>
					))}
				</ul>
			</section>
		</div>
	);
}
