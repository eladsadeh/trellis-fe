import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import StepLink from '../components/StepLink'
import Layout from '../components/Layout'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
		<Layout>
			<div className={styles.container}>
				<div className={styles.description}>
					Plan your vegetable garden like a pro.
				</div>
				<StepLink
					to='crops'
					number='1'
					text='Select the crops you want to grow'
				/>
				<StepLink
					to='varieties'
					number='2'
					text='Choose the varieties you want to grow'
				/>
				<StepLink to='seeds' number='3' text='Order the seeds you need' />
				<StepLink to='plantings' number='4' text='Make a planting plan' />
			</div>
		</Layout>
	);
}
