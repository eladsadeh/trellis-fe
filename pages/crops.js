import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { UserContext } from '../context/userContext';
import { Checkbox, Spinner } from '@blueprintjs/core';

import Layout from '../components/Layout';
import styles from '../styles/crops.module.css';

export async function getStaticProps() {
	return {
		props: {
			test: 'My props',
		},
	};
}

function Crops(props) {
	const { user } = useContext(UserContext);
	const [cropsData, setCropsData] = useState(null);
	const [newCrop, setNewCrop] = useState('');
	const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

	const getCropsData = async () => {
		const token = localStorage.getItem('token');
		if (token) {
			console.log('found token:', token);
			try {
				const res = await fetch(`${baseUrl}/crops/`, {
					headers: {
						Authorization: `Token ${token}`,
					},
				});
				if (res.status === 200) {
					const data = await res.json();
					console.log('get crops:',data);
					setCropsData(data);
				} else {
					const data = await res.json();
					console.log(data);
				}
			} catch (err) {
				console.log(err);
			}
		} else {
			console.log('no token found');
		}
	};

	const putCropData = async (crop) => {
		const token = localStorage.getItem('token');
		if (token) {
			console.log('found token:', token);
			console.log('PUT:', `${baseUrl}/crops/${crop.id}`);
			console.log('PUT:', JSON.stringify(crop));
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
					console.log('bad res:', data);
				}
			} catch (err) {
				console.log(err);
			}
		} else {
			console.log('no token found');
		}
	};

	useEffect(() => {
		console.log('crops is mounting:');
		getCropsData();
	}, []);

	const handleChange = (ev) => {
		const idx = ev.target.dataset.idx;
		let crops = [...cropsData];
		crops[idx].selected = ev.target.checked;
		setCropsData(crops);
		putCropData(crops[idx]);
		// updata (PUT) crop in DB
	};

	async function handleNewCrop(ev) {
		ev.preventDefault();
		console.log(newCrop);
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
			console.log('found token:', token);
			console.log('CREATE:', `${baseUrl}/crops/`);
			console.log('CREATE:', JSON.stringify(crop));
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
					console.log('res:', data);
                    const crops = [...cropsData]
                    // add the new crop with ID to array
                    crops.push(data);
                    console.log('new crops:',crops);
                    setCropsData(crops)
                    setNewCrop('')
				} else {
					const data = await res.json();
					console.log(data);
				}
			} catch (err) {
				console.log(err);
			}
		} else {
			console.log('no token found');
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
			<div className={styles.container}>
				<h2>Select the crops you want to grow</h2>
				<form name='new-crop' onSubmit={handleNewCrop}>
					<button type='submit'>+</button>
					<input
						id='new-crop'
						type='text'
						placeholder='Crop name'
						value={newCrop}
						onChange={(ev) => setNewCrop(ev.target.value)}
					/>
				</form>
				<form name='crops-selector' className={styles.formContainer}>
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
							</div>
						);
					})}
				</form>
			</div>
		</Layout>
	);
}

export default Crops;
