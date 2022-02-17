import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Icon } from '@blueprintjs/core';
import Layout from '../components/Layout';
import StepLink from '../components/StepLink';
import styles from '../styles/seeds.module.css';

function Seeds(props) {
	const [seedsData, setSeedsData] = useState(null);
	const router = useRouter();
	// const [newVariety, setNewVariety] = useState('');
	const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

	function calcOnces(crop, variety) {
		const seeds_per =
			variety.method === 'DS'
				? crop.seeds_per_feet
				: crop.seeds_per_plant * 1.15;
		const ounces = (seeds_per * variety.quantity) / variety.seeds_oz;
		if (Math.ceil(ounces * 32) < 2) return '1/32';
		else if (Math.ceil(ounces * 16) < 2) return '1/16';
		else if (Math.ceil(ounces * 8) < 2) return '1/8';
		else if (Math.ceil(ounces * 4) < 2) return '1/4';
		else if (Math.ceil(ounces * 2) < 2) return '1/2';
		else if (Math.ceil(ounces) < 2) return '1';
		else return `${Math.round(ounces * 100) / 100}`;
	}

	function calcGrams(crop, variety) {
		const seeds_per =
			variety.method === 'DS'
				? crop.seeds_per_feet
				: crop.seeds_per_plant * 1.15;
		const grams = ((seeds_per * variety.quantity) / variety.seeds_oz) * 28.3495;
		if (Math.ceil(grams * 10) < 2) return '1/10g';
		else if (Math.ceil(grams * 2) < 2) return '1/2g';
		else return `${Math.ceil(grams)}g`;
	}

	const getCropsData = async () => {
		const token = localStorage.getItem('token');
		if (token) {
			try {
				const res = await fetch(`${baseUrl}/crops?selected=true`, {
					headers: {
						Authorization: `Token ${token}`,
					},
				});
				if (res.status === 200) {
					const data = await res.json();
					prepareSeedsData(data);
				} else {
					// const data = await res.json();
					// console.log(res.status);
				}
			} catch (err) {
				// console.log('error:', err);
			}
		} else {
			// console.log('no token found');
			// alert('Login Infomation not found - Please login');
			router.push('/login');
		}
	};

	function prepareSeedsData(cropsData) {
		console.log('preparing seeds data');
		const seeds = [];
		const order = [];
		let ounces = '';
		let grams = 0;
		let qt = 0;
		cropsData.forEach((crop) => {
			crop.varieties.forEach((variety) => {
				seeds.push([
					crop.name,
					variety.name,
					variety.quantity,
					variety.seeds_oz,
					variety.method,
				]);
				ounces = calcOnces(crop, variety);
				grams = calcGrams(crop, variety);
				console.log(ounces, grams);
				order.push({
					crop: crop.name,
					variety: variety.name,
					method: variety.method,
					ounces: ounces,
					grams: grams,
					amount: `${Math.ceil(
						variety.method === 'DS'
							? variety.quantity * crop.seeds_per_feet
							: variety.quantity * crop.seeds_per_plant * 1.15
					)}`,
				});
			});
		});
		console.log(seeds);
		console.log(order);
		setSeedsData(order);
	}

	useEffect(() => {
		console.log('seeds is mounting:');
		getCropsData();
	}, []);

	if (!seedsData) {
		return (
			<Layout>
				<div>Loading Data ... Plaease wait</div>>
			</Layout>
		);
	}
	return (
		<Layout>
			<StepLink to='seeds' number='3' text='Time to order your seeds' />
			<div className='seeds-container'>
				<table className={styles.table}>
					<thead>
						<tr>
							<th>Crop</th>
							<th>Variety</th>
							<th>Method</th>
							<th>Ounces</th>
							<th>Grams</th>
							<th>Amount</th>
						</tr>
					</thead>
					<tbody>
						{seedsData.map((variety, idx) => {
							return (
								<tr key={idx}>
									<td style={{ textAlign: 'left' }}>{variety.crop}</td>
									<td style={{ textAlign: 'left' }}>{variety.variety}</td>
									<td>{variety.method}</td>
									<td>{variety.ounces}</td>
									<td>{variety.grams}</td>
									<td>{variety.amount}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</Layout>
	);
}

export default Seeds;
