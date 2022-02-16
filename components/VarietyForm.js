import React, { useState } from 'react';
import styles from '../styles/varietyform.module.css';
import utilStyles from '../styles/utils.module.css';

function VarietyForm(props) {
	const [variety, setVariety] = useState(props.variety);
	// form data starts with variety changes saved after SAVE
	const isNewVariety = variety.name ? false : true;
	const [formData, setFormData] = useState(props.variety);
	const [edit, setEdit] = useState(isNewVariety ? true : false);
	const [showDetail, setShowDetail] = useState(isNewVariety ? true : false);
	const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

	const handleFormChange = (ev) => {
		setFormData({ ...formData, [ev.target.name]: ev.target.value });
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
							type='number'
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
								setEdit(!edit)}}>
							Close
						</button>
					)}
					<button
						className={utilStyles.button}
						type='button'
						onClick={(ev) => handleSaveOrEdit(ev)}>
						{edit ? 'Save' : 'Edit'}
					</button>
					{!isNewVariety && (
						<button
							className={utilStyles.button}
							onClick={(ev) => ev.preventDefault()}>
							Delete
						</button>
					)}
					{edit && (
						<button
							className={utilStyles.button}
							onClick={() => setEdit(!edit)}>
							Cancel
						</button>
					)}
				</form>
			)}
		</div>
	);
}

export default VarietyForm;
