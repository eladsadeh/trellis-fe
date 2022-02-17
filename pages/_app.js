import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { UserContext } from '../context/userContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
	const [user, setUser] = useState(null);
	const router = useRouter();

	const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

	useEffect(() => {
		// Check if user has a token and get the user name
		// Called on app mount or reload
		const getLoginInfo = async () => {
			const token = localStorage.getItem('token');
			if (token) {
				// console.log('found token:', token);
				try {
					const res = await fetch(`${baseUrl}/users/me/`, {
						headers: {
							Authorization: `Token ${token}`,
						},
					});
					if (res.status === 200) {
						const data = await res.json();
						setUser({ email: data.email, id: data.id, token: token });
					} else {
						setUser(null);
						localStorage.clear();
						router.push('/login');
					}
				} catch (err) {
					// console.log(err);
				}
			} else {
				router.push('/login');
				// console.log('no token found');
			}
		};

		getLoginInfo();
	}, []);
	return (
		<UserContext.Provider value={{ user, setUser }}>
			<Component {...pageProps} />
		</UserContext.Provider>
	);
}

export default MyApp;
