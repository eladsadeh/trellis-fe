import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { UserContext } from '../context/userContext';
import { Checkbox, Spinner } from '@blueprintjs/core';

import Layout from '../components/Layout';

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
					console.log(data);
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

	useEffect(() => {
		console.log('crops is mounting:');
		getCropsData();
	}, []);

	const handleChange = (ev) => {
		let crops = cropsData;
		crops[ev.target.dataset.idx].selected = ev.target.checked;
		console.log(crops[ev.target.dataset.idx]);
		setCropsData(crops);
	};
	if (!cropsData) {
		return (
			<Layout>
				<Spinner intent='success'></Spinner>
			</Layout>
		);
	}
	return (
		<Layout>
			<div>
				The crops page!
				<form action=''>
					{cropsData.map((crop, idx) => {
						return (
							<div key={crop.id}>
								<input
									type='checkbox'
									data-cropid={crop.id}
									data-idx={idx}
									value={crop.selected}
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
