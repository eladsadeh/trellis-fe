import Head from 'next/head';
import Nav from './Nav';

const Layout = (props) => (
	<>
		<Head>
			<title>Trellis</title>
			<link rel='icon' href='/favicon.ico' />
		</Head>
		<div className='layout'>
			<Nav />
			<main>{props.children}</main>
		</div>
	</>
);

export default Layout;
