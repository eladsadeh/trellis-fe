import Head from 'next/head';
import Nav from './Nav';

const Layout = (props) => (
	<>
		<Head>
			<title>Trellis</title>
			<link
				rel='icon'
				href='https://cdn3.iconfinder.com/data/icons/hotel-10-1/48/452-512.png'
			/>
		</Head>
		<div>
			<Nav />
			<main>{props.children}</main>
		</div>
	</>
);

export default Layout;
