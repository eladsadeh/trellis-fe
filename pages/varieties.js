import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Icon } from '@blueprintjs/core';
import Layout from '../components/Layout';
import StepLink from '../components/StepLink';
import VarietyForm from '../components/VarietyForm';
import styles from '../styles/varieties.module.css';

function Varieties(props) {
	const router = useRouter();

	const [cropsData, setCropsData] = useState(null);
	// const [newVariety, setNewVariety] = useState('');
	const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

	const getCropsData = async () => {
		const token = localStorage.getItem('token');
		if (token) {
			try {
				const res = await fetch(`${baseUrl}/crops/?selected=true`, {
					headers: {
						Authorization: `Token ${token}`,
					},
				});
				if (res.status === 200) {
					const data = await res.json();
					setCropsData(data);
				} else {
					// const data = await res.json();
					// console.log(res.status);
				}
			} catch (err) {
				// console.log('error:', err);
			}
		} else {
			// console.log('no token found');
			router.push('/login');
		}
	};

	const addVariety = (idx, cropId) => {
		const newVariety = {
			crop_id: cropId,
			name: '',
			method: 'DS',
			dtm: '',
			seeds_oz: '',
			quantity: '',
		};
		// Make a copy of crops state
		const crops = [...cropsData];
		// Push the new variety to the crop
		crops[idx].varieties.push(newVariety);
		setCropsData(crops);
	};

	useEffect(() => {
		getCropsData();
	}, []);

	if (!cropsData) {
		return (
			<Layout>
				<div>Loading Data ... Please wait</div>
			</Layout>
		);
	}

	return (
		<Layout>
			<StepLink
				to='varieties'
				number='2'
				text='Add the varieties you want to grow'
			/>

			<div className={styles.container}>
				{cropsData.map((crop, idx) => {
					return (
						<div className={styles.crop} key={idx}>
							<div
								className={
									crop.varieties.length
										? styles.cropsTitle
										: `${styles.cropsTitle} ${styles.alert}`
								}>
								<span>{crop.name}</span>
								<span>
									<span className={styles.count}>{crop.varieties.length}</span>
									<button
										className={styles.icon}
										onClick={() => addVariety(idx, crop.id)}>
										<Icon color='gray' size={16} icon='add' />
									</button>
								</span>
							</div>
							{crop.varieties.map((variety, idx) => {
								return (
									<VarietyForm
										key={idx}
										variety={variety}
										cropsData={cropsData}
										setCropsData={setCropsData}
									/>
								);
							})}
						</div>
					);
				})}
			</div>
			<StepLink to='seeds' number='3' text='Order your seeds' />
		</Layout>
	);
}

export default Varieties;
