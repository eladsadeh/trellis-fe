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
	// const [error, setError] = useState('');
    let error = '';
	const [success, setSuccess] = useState(false);

	const initialFormData = {
		email: '',
		password: '',
		re_password: '',
	};

	const [formData, setFormData] = useState(initialFormData);
	const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

	const isError = () => {
		// From https://www.thepolyglotdeveloper.com/2015/05/use-regex-to-test-password-strength-in-javascript/
		let regex = new RegExp(
			'^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&]*)(?=.{8,})'
		);

		if (!/^[\w\.]+@\w+\.\w+$/.test(formData.email)) {
			return 'Please enter valid eMail address';
		} else if (!regex.test(formData.password)) {
			return 'Password must be 8 charcters long and include UPPER case, lowercase, and a number. You can use the following special characters: !,@,#,$,%,&';
		} else if (formData.password !== formData.re_password) {
			return 'Passwords must mutch';
		} else {
			return '';
		}
		// console.log('error:', error);
	};

	const handleChange = (ev) => {
		setFormData((prevState) => {
			return { ...prevState, [ev.target.id]: ev.target.value };
		});
        error = isError();
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
				console.log(data.password);
				// console.log(data.non_field_errors[0]);
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
							// onBlur={validateForm}
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
								// onBlur={validateForm}
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
								// onBlur={validateForm}
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
					{error && <div className={styles.card}>{error}</div>}
					<button className={styles.button} type='submit' disabled={!!error}>
						Sign up
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
