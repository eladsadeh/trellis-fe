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
	const [showRePassword, setShowRePassword] = useState(false);
	// const [error, setError] = useState('');
	const [success, setSuccess] = useState(false);
	const [isValid, setIsValid] = useState(false);
	const [message, setMessage] = useState('Please enter valid eMail address');

	const initialFormData = {
		email: '',
		password: '',
		re_password: '',
	};

	const [formData, setFormData] = useState(initialFormData);
	const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

	const validateForm = (form) => {
		// From https://www.thepolyglotdeveloper.com/2015/05/use-regex-to-test-password-strength-in-javascript/
		let regex = new RegExp(
			'^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&]*)(?=.{8,})'
		);

		if (!/^[\w\.]+@\w+\.\w{2,3}$/.test(form.email)) {
			setMessage('Please enter a valid eMail address');
		} else if (!regex.test(form.password)) {
			setMessage(
				'Password must be 8 charcters long and include UPPER case, lowercase, and a number. You can use the following special characters: !,@,#,$,%,&'
			);
		} else if (form.password !== form.re_password) {
			setMessage('Re enter the same password again');
		} else {
			setMessage('All looks good!');
			setIsValid(true);
		}
	};

	const handleChange = (ev) => {
		setFormData({ ...formData, [ev.target.id]: ev.target.value });
		validateForm({ ...formData, [ev.target.id]: ev.target.value });
	};

	const handleSignup = async (ev) => {
		ev.preventDefault();
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
				localStorage.setItem('token', data.auth_token);
				setSuccess(true);
				setTimeout(() => {
					router.push('/login');
				}, 3500);
			} else {
				// const data = await res.json();
				// console.log(data.non_field_errors[0]);
			}
		} catch (error) {
			// console.log(error);
		}
	};

	return (
		<Layout>
			<div className={styles.container}>
				<form className={styles.container} onSubmit={handleSignup}>
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
							autoFocus
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
						<label htmlFor='re_password'>Re-enter Password</label>
						<div className={styles.password}>
							<input
								className={styles.formInput}
								id='re_password'
								type={showRePassword ? 'text' : 'password'}
								value={formData.re_password}
								placeholder='Password'
								onChange={handleChange}
								// onBlur={validateForm}
								required></input>
							<button
								className={styles.icon}
								type='button'
								onClick={() => setShowRePassword(!showRePassword)}>
								<Icon
									color='gray'
									size={20}
									icon={showRePassword ? 'eye-open' : 'eye-off'}
								/>
							</button>
						</div>
					</div>
					<div>
						<button className={styles.button} type='submit' disabled={!isValid}>
							Sign up
						</button>
					</div>
					{!isValid && <div className={styles.card}>{message}</div>}
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
