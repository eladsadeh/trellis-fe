import React from 'react';
import Link from 'next/link'
import styles from '../styles/utils.module.css';


function StepLink({to, number, text}) {
    return (
			<Link href={`/${to}`} passHref>
				<a className={`${styles.card} ${styles[to]}`}>
					<span>{number}</span>
					<p>{text}</p>
				</a>
			</Link>
		);
}

export default StepLink;