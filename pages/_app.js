import { useState, useEffect } from 'react';
import { UserContext } from '../context/userContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
	const [user, setUser] = useState(null);
	const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

	// Check if user has a token and get the user name
	// Called on app mount or reload
	const getLoginInfo = async () => {
		const token = localStorage.getItem('token');
		if (token) {
			console.log('found token:', token);
			try {
				const res = await fetch(`${baseUrl}/users/me/`, {
					headers: {
						Authorization: `Token ${token}`,
					},
				});
        if (res.status === 200) {
          const data = await res.json()
          console.log(data);
          setUser(data.email)
        } else {
          console.log('Could not find user info, please login again');
          setUser(null);
          localStorage.clear()
        }
			} catch (err) {
        console.log(err);
      }
		} else {
			console.log('no token found');
		}
	};

	useEffect(() => {
		console.log('useEffect:');
		getLoginInfo();
	}, []);
	return (
		<UserContext.Provider value={{ user, setUser }}>
			<Component {...pageProps} />
		</UserContext.Provider>
	);
}

export default MyApp;
