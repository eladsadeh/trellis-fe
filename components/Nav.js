import React, { useState } from 'react';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import { Icon } from '@blueprintjs/core';


import Link from 'next/link';
import { UserContext } from '../context/userContext';

import styles from '../styles/Nav.module.css';

function Nav(props) {
	const router = useRouter();
	const [showMenu, setShowMenu] = useState(false);

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
			<div className={styles.links}>
				<button
					className={styles.showButton}
					onClick={() => {
						setShowMenu(!showMenu);
					}}>
					{showMenu ? (
						<Icon
							className={styles.iconClose}
							color='black'
							size={30}
							icon='cross'
						/>
					) : (
						<Icon className={styles.iconOpen} color='black' size={30} icon='menu' />
					)}
				</button>
				{showMenu && (
					<div className={showMenu ? styles.navmenu : styles.slideout}>
						<ul className={styles.navitems}>
							<li>
								<Link href='/crops'>
									<a>Crops</a>
								</Link>
							</li>
							<li>
								<Link href='/varieties'>
									<a>Varieties</a>
								</Link>
							</li>
							<li>
								<Link href='/seeds'>
									<a>Seeds</a>
								</Link>
							</li>
							<li>
								<Link href='/plantings'>
									<a>Plantings</a>
								</Link>
							</li>
							<li>
								<Link href='/about'>
									<a>About</a>
								</Link>
							</li>
						</ul>
					</div>
				)}
				<h1 className={styles.heading}>
					<Link href='/'>
						<a>Trellis</a>
					</Link>
				</h1>
			</div>
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
