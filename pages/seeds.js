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

	const getCropsData = async () => {
		const token = localStorage.getItem('token');
		if (token) {
			console.log('found token:', token);
			try {
				console.log('fetching crops from', `${baseUrl}/crops?selected=true`);
				const res = await fetch(`${baseUrl}/crops?selected=true`, {
					headers: {
						Authorization: `Token ${token}`,
					},
				});
				if (res.status === 200) {
					const data = await res.json();
					console.log('crops:', data);
					prepareSeedsData(data);
				} else {
					// const data = await res.json();
					console.log(res.status);
				}
			} catch (err) {
				console.log('error:', err);
			}
		} else {
			console.log('no token found');
			alert('Login Infomation not found - Please login');
			router.push('/login');
		}
	};

	function prepareSeedsData(cropsData) {
		console.log('preparing seeds data');
		const seeds = [];
		const order = [];
		cropsData.forEach((crop) => {
			crop.varieties.forEach((variety) => {
				seeds.push([
					crop.name,
					variety.name,
					variety.quantity,
					variety.seeds_oz,
					variety.method,
				]);
			});
		});
		console.log(seeds);
		setSeedsData(seeds);
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
							<th>Quntity</th>
							<th>Seeds/Oz</th>
						</tr>
					</thead>
					<tbody>
						{seedsData.map((variety, idx) => {
							return (
								<tr key={idx}>
									<td style={{ textAlign: 'left' }}>{variety[0]}</td>
									<td style={{ textAlign: 'left' }}>{variety[1]}</td>
									<td>{variety[4]}</td>
									<td>{variety[2]}</td>
									<td>{variety[3]}</td>
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
