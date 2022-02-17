import React, { useState } from 'react';
import { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { Icon } from '@blueprintjs/core';

import { UserContext } from '../context/userContext';
// Components
import Layout from '../components/Layout';
import styles from '../styles/login.module.css';

function Login(props) {
	const router = useRouter();
	const { user, setUser } = useContext(UserContext);
	const [showPassword, setShowPassword] = useState(false);
	const initialFormData = {
		email: '',
		password: '',
	};
	const [formData, setFormData] = useState(initialFormData);
	const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

	const handleChange = (ev) => {
		setFormData((prevState) => {
			return { ...prevState, [ev.target.id]: ev.target.value };
		});
	};

	const handleSubmit = async (ev) => {
		ev.preventDefault();
		
		try {
			const res = await fetch(`${baseUrl}/token/login/`, {
				method: 'POST',
				body: JSON.stringify(formData),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			if (res.status === 200) {
				const data = await res.json();
				console.log(data);
				localStorage.setItem('token', data.auth_token);
				console.log('user:' , formData);
				setUser(formData);
				router.push('/');
			} else {
				const data = await res.json();
				console.log(data.non_field_errors[0]);
			}
		} catch (error) {
			console.log(error);
		}
	};

	if (user) return <Layout>
		<div>Your are currently logged in as {user.email}. Please logout to change account.</div>
	</Layout>;

	return (
		<Layout>
			<div className={styles.container}>
				<form className='login-form' onSubmit={handleSubmit}>
					<h2 className={styles.heading}>Login To Your Account</h2>
					<div className={styles.inputGroup}>
						<label htmlFor='email'>Email Address</label>
						<input
							className={styles.formInput}
							id='email'
							type='email'
							pattern='[\w\-_\.]+@\w+\.\w+'
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
					<button className={styles.button} type='submit'>
						Login
					</button>
				</form>
				<div className={styles.card}>
					<span>
						Don't have an account yet?
						<br />
						<br />
					</span>
					<Link href='/signup'>
						<a className={styles.link}>Open a free account</a>
					</Link>
				</div>
			</div>
		</Layout>
	);
}

export default Login;
