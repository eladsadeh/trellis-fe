import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import Layout from '../components/Layout'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <Layout>
        <div className={styles.container}>
        <div className={styles.description}>Plan your vegetable garden like a pro.</div>
        <Link href='/crops' passHref>
          <a className={`${styles.card} ${styles.crops}`}>
            <span>1</span>
            <p>Select the crops you want to grow</p>
          </a>
        </Link>     
        <Link href='/varieties' passHref>
          <a className={`${styles.card} ${styles.crops}`}>
            <span>2</span>
            <p>Choose the varieties you want to grow</p>
          </a>
        </Link>     
        <Link href='/seeds' passHref>
          <a className={`${styles.card} ${styles.crops}`}>
            <span>3</span>
            <p>Order the seeds you need</p>
          </a>
        </Link>     
        <Link href='/plantings' passHref>
          <a className={`${styles.card} ${styles.crops}`}>
            <span>4</span>
            <p>Make a planting plan</p>
          </a>
        </Link>     
    </div>
      </Layout>
  )
}
