import React from 'react';
import Layout from '../components/Layout';
import styles from '../styles/about.module.css';

function About(props) {
	return (
		<Layout>
			<div className={styles.container}>
				<h2 className={styles.heading}>About Trellis</h2>
				<p className={styles.paragraph}>
					Trellis is an application that supports home gardeners in planning and
					bringing their vegetable garden to fruition.
				</p>
				<p className={styles.paragraph}>
					This is a prototype for a complete platform that provides knowledge,
					tools, and other resources to empower people that want to grow their
					own food.
				</p>
				<p className={styles.paragraph}>
					Currently, the application is in its initial stage (work in progress).
					Many more features to come ...
				</p>
				<h3 className={styles.heading}>Current features</h3>
				<ul className={styles.list}>
					<li>
						Crops: You can add crops and select which ones you would like to
						grow
					</li>
					<li>
						Varieties: Add the varieties you want to grom for each crop.
						Indicate how much you want to grow and other properties (Days to
						maturity, Seeds/Ounce, method of growing)
					</li>
					<li>Edit and Delete varieties</li>
					<li>Seeds: compile a list of seeds to order</li>
				</ul>
				<h3 className={styles.heading}>Future Development</h3>
				<ul className={styles.list}>
					<li>Crops: Edit crops properties</li>
					<li>
						Planting plan: Create plantings with dates of starting/transplanting
						for each variety.
					</li>
					<li>Add instructions and guidance on how to use the application</li>
					<li>
						Knowledge resources (how to start seeds, how to choose varieties,
						how to ... etc.)
					</li>
					<li>
						Support network: connect growers to share resources and knowledge
					</li>
					<li>And more ...</li>
				</ul>
				<h3 className={styles.heading}>Contribution</h3>
				<p className={styles.paragraph}>
					If you want to contribute to the development if this application, or
					want to give feedback, please email me at{' '}
					<a className={styles.link} href='mailto:elad.sadeh1@gmail.com?subject=Trellis app'>elad.sadeh1@gmail.com</a>
				</p>
			</div>
		</Layout>
	);
}

export default About;
