import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import VarietyForm from '../components/VarietyForm';

function Varieties(props) {
	const [cropsData, setCropsData] = useState(null);
	const [newVariety, setNewVariety] = useState('');
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
					setCropsData(data);
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

	useEffect(() => {
		console.log('varieties is mounting:');
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
			<div>Varieties</div>
			{cropsData.map((crop, idx) => {
				return (
					<div key={crop.id}>
						<div>
							{crop.name} {crop.varieties.length}
						</div>
						{crop.varieties.map((variety) => {
							console.log(variety);
							return <VarietyForm key={variety.id} variety={variety} />;
						})}
					</div>
				);
			})}
		</Layout>
	);
}

export default Varieties;
