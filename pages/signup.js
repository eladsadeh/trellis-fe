import React, { useState } from 'react';
import { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Icon } from '@blueprintjs/core';
// Components
import Layout from '../components/Layout';
import styles from '../styles/login.module.css';

function Signup(props) {
	const router = useRouter();
	// const { user, setUser } = useContext(UserContext);
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);

	const initialFormData = {
		email: '',
		password: '',
		re_password: '',
	};
    
	const [formData, setFormData] = useState(initialFormData);
	const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

	const formIsValidated = (form) => {
		const isValidated = false;
		isValidated =
			/^[a-zA-Z]+[\w ]+/.test(form.name) &&
			/[0-9]+/.test(form.dtm) &&
			/[0-9]+/.test(form.quantity) &&
			/[0-9]+/.test(form.seeds_oz);
		console.log(isValidated);
		return isValidated;
	};

	const handleChange = (ev) => {
		setFormData((prevState) => {
			return { ...prevState, [ev.target.id]: ev.target.value };
		});
	};

	const handleSignup = async (ev) => {
		ev.preventDefault();
		console.log(JSON.stringify({ ...formData, username: formData.email }));
		try {
			const res = await fetch(`${baseUrl}/users/`, {
				method: 'POST',
				body: JSON.stringify({ ...formData, username: formData.email }),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			if (res.status === 201) {
				const data = await res.json();
				console.log(data);
				localStorage.setItem('token', data.auth_token);
				setSuccess(true);
				setTimeout(() => {
					router.push('/login');
				}, 3500);
			} else {
				const data = await res.json();
				console.log(data.non_field_errors[0]);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Layout>
			<div className={styles.container}>
				<form className='signup-form' onSubmit={handleSignup}>
					<h2 className={styles.heading}>Create a new Account</h2>
					<div className={styles.inputGroup}>
						<label htmlFor='email'>Email Address</label>
						<input
							className={styles.formInput}
							id='email'
							type='email'
							pattern='[\w\-_\.]+@\w+\.[a-z]{2,3}'
							placeholder='Email address'
							value={formData.email}
							onChange={handleChange}
							required></input>
					</div>
					<div className={styles.inputGroup}>
						<label htmlFor='password'>Password</label>
						<div className={styles.password}>
							<input
								className={styles.formInput}
								id='password'
								type={showPassword ? 'text' : 'password'}
								value={formData.password}
								placeholder='Password'
								onChange={handleChange}
								required></input>
							<button
								className={styles.icon}
								type='button'
								onClick={() => setShowPassword(!showPassword)}>
								<Icon
									color='gray'
									size={20}
									icon={showPassword ? 'eye-open' : 'eye-off'}
								/>
							</button>
						</div>
					</div>
					<div className={styles.inputGroup}>
						<label htmlFor='re_password'>Password</label>
						<div className={styles.password}>
							<input
								className={styles.formInput}
								id='re_password'
								type={showPassword ? 'text' : 'password'}
								value={formData.re_password}
								placeholder='Password'
								onChange={handleChange}
								required></input>
							<button
								className={styles.icon}
								type='button'
								onClick={() => setShowPassword(!showPassword)}>
								<Icon
									color='gray'
									size={20}
									icon={showPassword ? 'eye-open' : 'eye-off'}
								/>
							</button>
						</div>
					</div>
					<button className={styles.button} type='submit'>
						Signup
					</button>
				</form>
				{success && (
					<div className={styles.card}>
						<span>
							User successfully created! You will be redirected to log in.
							<br />
							<br />
						</span>
						<Link href='/login'>
							<a className={styles.link}>Login to your accout</a>
						</Link>
					</div>
				)}
			</div>
		</Layout>
	);
}

export default Signup;
