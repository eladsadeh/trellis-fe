import React, { useState } from 'react';
import styles from '../styles/varietyform.module.css';
import utilStyles from '../styles/utils.module.css';

function VarietyForm({ variety, cropsData, setCropsData }) {
	// const [variety, setVariety] = useState(props.variety);
	const isNewVariety = variety.name ? false : true;
	const [formData, setFormData] = useState(variety);
	const [edit, setEdit] = useState(isNewVariety ? true : false);
	const [showDetail, setShowDetail] = useState(isNewVariety ? true : false);
	const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

	const showCancel = () => {
		return edit && (isNewVariety || formData !== variety);
	};

	const formIsValidated = (form) => {
		const isValidated = false;
		isValidated =
			/^[a-zA-Z]+[\w ]+/.test(form.name) &&
			/[0-9]+/.test(form.dtm) &&
			/[0-9]+/.test(form.quantity) &&
			/[0-9]+/.test(form.seeds_oz);
		console.log(isValidated);
		return isValidated;
	}

	const deleteVariety = (id, cropId) => {
		// Find the crop object
		let crops = [...cropsData];
		const cropIdx = crops.findIndex((e) => e.id === cropId);
		console.log('delete: crop index =', cropIdx);
		// Filter out the variety
		console.log('before:', crops[cropIdx].varieties);
		crops[cropIdx].varieties = crops[cropIdx].varieties.filter(
			(e) => e.id !== id
		);
		console.log('after:', crops[cropIdx].varieties);
		// update state
		setCropsData(crops);
	};
	// Add new variety to specific crop
	const addVariety = (variety) => {
		let crops = [...cropsData];
		// Find the crop object
		const cropIdx = crops.findIndex((e) => e.id === variety.crop_id);
		console.log('add: crop index =', cropIdx);
		// remove the variety without ID (added for new variety)
		const removed = crops[cropIdx].varieties.pop();
		console.log('removing tmp variety:', removed);
		// add the variety retruned from the POST request (with ID)
		console.log('adding:', variety);
		crops[cropIdx].varieties.push(variety);
		// update states
		setCropsData(crops);
		setFormData(variety);
	};

	const updateVariety = (variety) => {
		let crops = [...cropsData];
		// Find the crop object
		const cropIdx = crops.findIndex((e) => e.id === variety.crop_id);
		console.log('update: crop index =', cropIdx);
		// find the index of the variety in the crop varieties array
		const varietyIdx = crops[cropIdx].varieties.findIndex(
			(e) => e.id === variety.id
		);
		console.log(
			'updating variety:',
			varietyIdx,
			crops[cropIdx].varieties[varietyIdx]
		);
		// replace the variety with the updated one
		console.log('replacing:', variety);
		crops[cropIdx].varieties[varietyIdx] = variety;
		// update states
		setCropsData(crops);
		setFormData(variety);
	};

	const handleFormChange = (ev) => {
		setFormData({ ...formData, [ev.target.name]: ev.target.value });
	};

	const handleCancel = () => {
		console.log('cancel:', formData);
		let crops = [...cropsData];
		// If it's a new variety, remove it from the crop
		if (isNewVariety) {
			// Find the crop object
			const cropIdx = crops.findIndex((e) => e.id === formData.crop_id);
			console.log('cancel: crop index =', cropIdx);
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
		console.log('handle save and edit');
		// IF not in edit mode, turn on edit
		if (!edit) {
			setEdit(!edit);
		} else {
			console.log('save:', formData);
			console.log('new = ', isNewVariety);
			// set fetch method, end point, and good status code
			const method = isNewVariety ? 'POST' : 'PUT';
			const endPoint = isNewVariety ? '' : `${formData.id}`;
			const status = isNewVariety ? 201 : 200;
			const token = localStorage.getItem('token');
			console.log(`${method}`, `${baseUrl}/varieties/${endPoint}`);
			console.log(`${method}`, JSON.stringify(formData));
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
						console.log('res :', data);
						// if its a new variety, add it to the array
						if (isNewVariety) {
							console.log('add:', data);
							addVariety(data);
						} else {
							// update the form state
							updateVariety(data);
						}
					} else {
						console.log('bad res:', res);
					}
				} catch (err) {
					console.log(err);
				}
			} else {
				console.log('no token found');
				router.push('/login');
			}
		}
	};

	// Delete of existing variety
	const handleDelete = async (ev) => {
		ev.preventDefault();
		// Send DELETE request with variety ID
		console.log('delete:', formData);
		// set fetch method, end point, and good status code
		const method = 'DELETE';
		const endPoint = `varieties/${formData.id}`;
		const status = 204;
		const token = localStorage.getItem('token');
		console.log(`${method}`, `${baseUrl}/${endPoint}`, formData.id);
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
					// IF request is successful, delete the variety from the crop object
					deleteVariety(formData.id, formData.crop_id);
					// find the crop object using crop ID
					// filter out the deleted variety
					// update the crops state
					// const data = await res.json();
					console.log('res :', res);
				} else {
					console.log('bad res:', res);
				}
			} catch (err) {
				console.log('error', err);
			}
		} else {
			console.log('no token found');
			router.push('/login');
		}
	};

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
