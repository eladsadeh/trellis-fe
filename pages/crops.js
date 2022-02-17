import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { useContext } from 'react';
import { UserContext } from '../context/userContext';
import { Icon, Spinner } from '@blueprintjs/core';

import Layout from '../components/Layout';
import StepLink from '../components/StepLink';
import styles from '../styles/crops.module.css';

function Crops(props) {
	// const { user } = useContext(UserContext);
	const router = useRouter();

	const [cropsData, setCropsData] = useState(null);
	const [newCrop, setNewCrop] = useState('');
	const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

	const getCropsData = async () => {
		const token = localStorage.getItem('token');
		if (token) {
			try {
				const res = await fetch(`${baseUrl}/crops/`, {
					headers: {
						Authorization: `Token ${token}`,
					},
				});
				if (res.status === 200) {
					const data = await res.json();
					setCropsData(data);
				} else {
					const data = await res.json();
					// console.log(data);
				}
			} catch (err) {
				// console.log(err);
			}
		} else {
			// console.log('no token found');
			router.push('/login');
		}
	};

	const putCropData = async (crop) => {
		const token = localStorage.getItem('token');
		if (token) {
			try {
				const res = await fetch(`${baseUrl}/crops/${crop.id}`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Token ${token}`,
					},
					body: JSON.stringify(crop),
				});
				if (res.status === 200) {
					const data = await res.json();
					// console.log('res:', data);
				} else {
					const data = await res.json();
					// console.log('bad res:', data);
				}
			} catch (err) {
				// console.log(err);
			}
		} else {
			// console.log('no token found');
			router.push('/login');
		}
	};

	const deleteCrop = async (ev, crop) => {
		ev.preventDefault();
		const token = localStorage.getItem('token');
		if (token) {
			try {
				const res = await fetch(`${baseUrl}/crops/${crop.id}`, {
					method: 'DELETE',
					headers: {
						Authorization: `Token ${token}`,
					},
				});
				if (res.status === 204) {
					// remove the crop from cropsData array
					const crops = cropsData.filter((c) => c.id !== crop.id);
					setCropsData(crops);
				} else {
					alert(`Could not delete ${crop.name}: ${res.status}`);
					// console.log('bad res:', res);
				}
			} catch (err) {
				// console.log(err);
			}
		} else {
			// console.log('no token found');
			router.push('/login');
		}
	};

	useEffect(() => {
		getCropsData();
	}, []);

	const handleChange = (ev) => {
		const idx = ev.target.dataset.idx;
		let crops = [...cropsData];
		crops[idx].selected = ev.target.checked;
		setCropsData(crops);
		// updata (PUT) crop in DB
		putCropData(crops[idx]);
	};

	async function handleNewCrop(ev) {
		ev.preventDefault();
		// Create a new crop object
		const crop = {
			// owner_id: user.id,
			name: newCrop,
			selected: true,
			row_spacing: null,
			spacing: null,
			start_to_tp: null,
		};
		const token = localStorage.getItem('token');
		if (token) {
			try {
				const res = await fetch(`${baseUrl}/crops/`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Token ${token}`,
					},
					body: JSON.stringify(crop),
				});
				if (res.status === 201) {
					const data = await res.json();
					const crops = [...cropsData];
					// add the new crop with ID to array
					crops.push(data);
					setCropsData(crops);
					setNewCrop('');
				} else {
					// console.log('bad status:', res.status);
					alert(`Crop already exist - try another name: ${res.status}`);
				}
			} catch (err) {
				// console.log('error:', err);
			}
		} else {
			// console.log('no token found');
		}
	}

	if (!cropsData) {
		return (
			<Layout>
				<Spinner intent='success'></Spinner>
			</Layout>
		);
	}
	return (
		<Layout>
			<StepLink
				to='crops'
				number='1'
				text='Select the crops you want to grow'
			/>
			<div className={styles.container}>
				<form
					className={styles.inputGroup}
					name='new-crop'
					onSubmit={handleNewCrop}>
					<button className={styles.addButton} type='submit'>
						➕
					</button>
					<input
						className={styles.formInput}
						type='text'
						placeholder='Add Crop'
						value={newCrop}
						onChange={(ev) => setNewCrop(ev.target.value)}
					/>
				</form>
				<form className={styles.formContainer}>
					{cropsData.map((crop, idx) => {
						return (
							<div key={crop.id} className={styles.checkboxGroup}>
								<input
									checked={crop.selected ? true : false}
									type='checkbox'
									data-cropid={crop.id}
									data-idx={idx}
									// value={ crop.selected}
									onChange={handleChange}
								/>
								<span>{crop.name}</span>
								<button
									className={styles.icon}
									title='Delete Crop'
									onClick={(ev) => deleteCrop(ev, crop)}>
									<Icon color='lightcoral' size={16} icon='delete' />
								</button>
							</div>
						);
					})}
				</form>
				<StepLink
					to='varieties'
					number='2'
					text='Next - Choose the varieties you want to grow'
				/>
			</div>
		</Layout>
	);
}

export default Crops;
