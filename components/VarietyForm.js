import React, { useEffect, useState } from 'react';
import styles from '../styles/varietyform.module.css';
import utilStyles from '../styles/utils.module.css';

function VarietyForm({ variety, cropsData, setCropsData, getCropsData }) {
	const isNewVariety = variety.name ? false : true;
	const [formData, setFormData] = useState(variety);
	const [edit, setEdit] = useState(isNewVariety ? true : false);
	const [showDetail, setShowDetail] = useState(isNewVariety ? true : false);
	const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

	const showCancel = () => {
		return edit && (isNewVariety || formData !== variety);
	};

	const formIsValidated = (form) => {

		return (
			/^[a-zA-Z]+[\w ]+/.test(form.name) &&
			/[0-9]+/.test(form.dtm) &&
			/[0-9]+/.test(form.quantity) &&
			/[0-9]+/.test(form.seeds_oz)
		);
	};

	const deleteVariety = (variety) => {
		// Find the crop object
		let crops = [...cropsData];
		const cropIdx = crops.findIndex((e) => e.id === variety.crop_id);
		// Filter out the variety
		const newVarieties = [
			...crops[cropIdx].varieties.filter((e) => e.id !== variety.id),
		];
		crops[cropIdx].varieties = [...newVarieties];
		// update state
		setEdit(false);
		setShowDetail(false);
		setCropsData(crops);
	};

	// Add new variety to specific crop
	const addVariety = (variety) => {
		let crops = [...cropsData];
		// Find the crop object
		const cropIdx = crops.findIndex((e) => e.id === variety.crop_id);
		// remove the variety without ID (added for new variety)
		const removed = crops[cropIdx].varieties.pop();
		// add the variety retruned from the POST request (with ID)
		crops[cropIdx].varieties.push(variety);
		// update states
		setCropsData(crops);
		setFormData(variety);
	};

	const updateVariety = (variety) => {
		let crops = [...cropsData];
		// Find the crop object
		const cropIdx = crops.findIndex((e) => e.id === variety.crop_id);
		// find the index of the variety in the crop varieties array
		const varietyIdx = crops[cropIdx].varieties.findIndex(
			(e) => e.id === variety.id
		);
		// replace the variety with the updated one
		crops[cropIdx].varieties[varietyIdx] = { ...variety };
		// update states
		setCropsData(crops);
		setFormData(variety);
	};

	const handleFormChange = (ev) => {
		setFormData({ ...formData, [ev.target.name]: ev.target.value });
	};

	const handleCancel = () => {
		let crops = [...cropsData];
		// If it's a new variety, remove it from the crop
		if (isNewVariety) {
			// Find the crop object
			const cropIdx = crops.findIndex((e) => e.id === formData.crop_id);
			// // remove the variety without ID (added for new variety)
			const removed = crops[cropIdx].varieties.pop();
			// // update state
			setCropsData(crops);
		} else {
			// revert to original info
			setFormData(variety);
			setEdit(false);
		}
	};

	const handleSaveOrEdit = async (ev) => {
		ev.preventDefault();
		// IF in edit mode (it's a SAVE)
		if (edit) {
			// set fetch method, end point, and good status code
			const method = isNewVariety ? 'POST' : 'PUT';
			const endPoint = isNewVariety ? '' : `${formData.id}`;
			const status = isNewVariety ? 201 : 200;
			const token = localStorage.getItem('token');
			if (token) {
				try {
					const res = await fetch(`${baseUrl}/varieties/${endPoint}`, {
						method: `${method}`,
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Token ${token}`,
						},
						body: JSON.stringify(formData),
					});
					if (res.status === status) {
						const data = await res.json();
						// console.log('res :', data);
						// if its a new variety, add it to the array
						// if (isNewVariety) {
						// 	// console.log('add:', data);
						// 	addVariety(data);
						// } else {
						// 	// update the form state
						// 	updateVariety(data);
						// }
						// IF request is successful, get updated crops data
						await getCropsData();
						// deleteVariety(formData);
						// setFormData(variety);
						// setShowDetail(false);
					} else {
						// console.log('bad res:', res);
					}
				} catch (err) {
					// console.log(err);
				}
			} else {
				// console.log('no token found');
				router.push('/login');
			}
			// Close form
			setShowDetail(false);
		}
		// Toggle edit mode
		setEdit(!edit);
	};

	// Delete of existing variety
	const handleDelete = async (ev) => {
		ev.preventDefault();
		// Send DELETE request with variety ID
		// set fetch method, end point, and good status code
		const method = 'DELETE';
		const endPoint = `varieties/${formData.id}`;
		const status = 204;
		const token = localStorage.getItem('token');
		if (token) {
			try {
				const res = await fetch(`${baseUrl}/${endPoint}`, {
					method: `${method}`,
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Token ${token}`,
					},
					body: JSON.stringify(formData),
				});
				if (res.status === status) {
					// IF request is successful, get updated crops data
					await getCropsData();
					// deleteVariety(formData);
					setFormData(variety);
					setShowDetail(false);
					// const data = await res.json();
				} else {
				}
			} catch (err) {
				// console.log('error', err);
			}
		} else {
			// console.log('no token found');
			router.push('/login');
		}
	};

	// Reset form data when props are changing
	// Needed for delete variety
	useEffect(() => {setFormData(variety)}, [variety])

	return (
		<div className={styles.container}>
			{!showDetail && (
				<p className={styles.title} onClick={() => setShowDetail(!showDetail)}>
					{formData.name}
				</p>
			)}
			{showDetail && (
				<form className='variety-form'>
					<label className={styles.group}>
						<span className={styles.label}> Variety Name:</span>
						<input
							className={styles.input}
							name='name'
							pattern='[a-z]+'
							title='Variety Name'
							type='text'
							placeholder='Variety name'
							value={formData.name}
							disabled={!edit}
							onChange={handleFormChange}
						/>
					</label>
					<label className={styles.group}>
						<span className={styles.label}>Method:</span>
						<select
							className={styles.input}
							name='method'
							value={formData.method}
							disabled={!edit}
							onChange={handleFormChange}>
							<option value='TP' onChange={handleFormChange}>
								Transplant
							</option>
							<option value='DS'>Direct Seed</option>
						</select>
					</label>
					<label className={styles.group}>
						<span className={styles.label}>Days to Maturity:</span>
						<input
							className={styles.input}
							style={{ width: '4em' }}
							name='dtm'
							pattern='[0-9]+'
							title='Days to Maturity'
							type='number'
							min='1'
							value={formData.dtm}
							disabled={!edit}
							onChange={handleFormChange}
						/>
					</label>
					<label className={styles.group}>
						<span className={styles.label}>Quantity:</span>
						<input
							className={styles.input}
							style={{ width: '4em' }}
							name='quantity'
							type='number'
							min='1'
							title='Number of plants/feet you want to grow'
							value={formData.quantity}
							disabled={!edit}
							onChange={handleFormChange}
						/>
					</label>
					<label className={styles.group}>
						<span className={styles.label}>Seeds/Oz:</span>
						<input
							className={styles.input}
							style={{ width: '6em' }}
							name='seeds_oz'
							type='number'
							min='1'
							title='Seeds per ounce'
							value={formData.seeds_oz}
							disabled={!edit}
							onChange={handleFormChange}
						/>
					</label>
					{!isNewVariety && (
						<button
							className={utilStyles.button}
							type='button'
							onClick={() => {
								setShowDetail(!showDetail);
								setEdit(false);
							}}>
							Close
						</button>
					)}
					<button
						className={utilStyles.button}
						type='button'
						disabled={edit && !formIsValidated(formData)}
						onClick={(ev) => handleSaveOrEdit(ev)}>
						{edit ? 'Save' : 'Edit'}
					</button>
					{!isNewVariety && (
						<button className={utilStyles.button} onClick={handleDelete}>
							Delete
						</button>
					)}
					{showCancel() && (
						<button
							type='button'
							className={utilStyles.button}
							onClick={handleCancel}>
							Cancel
						</button>
					)}
				</form>
			)}
		</div>
	);
}

export default VarietyForm;
