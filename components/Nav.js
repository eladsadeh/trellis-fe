import React from 'react';
import { useContext } from 'react';
import { useRouter } from 'next/router';

import Link from 'next/link';
import { UserContext } from '../context/userContext';

import styles from '../styles/Nav.module.css';

function Nav(props) {
	const router = useRouter();

	const { user, setUser } = useContext(UserContext);
	const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

	const handleLogout = async () => {
		// make a request to /token/logout to destroy the token
		const token = localStorage.getItem('token');
		try {
			const res = await fetch(`${baseUrl}/token/logout/`, {
				method: 'POST',
				body: JSON.stringify(token),
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Token ${token}`,
				},
			});
			// destroy token was successful
			if (res.status === 204) {
				setUser(null);
				// setLoggedIn(false);
				localStorage.clear();
				router.push('/');
			}
		} catch (error) {}
		// clear the token out of the local storage
		// redirect the user back to log in page
		// clear logged in state
		// set user back to null
		return;
	};

	return (
		<nav className={styles.navbar}>
			<h1 className={styles.h1}>
				<Link href='/'>
					<a>Trellis</a>
				</Link>
			</h1>
			{user ? (
				<div>
					<span className={styles.user}>{user.email}</span>
					<span className={styles.login} onClick={handleLogout}>
						Logout
					</span>
				</div>
			) : (
				<Link href='/login'>
					<a className={styles.login}>Login</a>
				</Link>
			)}
		</nav>
	);
}

export default Nav;
