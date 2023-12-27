"use client"
// import Image from 'next/image'
import SearchBar from '@/components/SearchBar/SearchBar'
import styles from './page.module.css'
import QuickAccess from '@/components/QuickAccess/QuickAccess'
import WeatherWidget from '@/components/WeatherWidget/WeatherWidget'
// import Todo from '@/components/Todo/Todo'
import StockTracker from '@/components/StockTracker/StockTracker'
export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.dummyWrapper}>
        <SearchBar/>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center'}} className={styles.subWrapper}>
          <QuickAccess/>
          <div className={styles.widgetsContainer}>
            <WeatherWidget/>
            <StockTracker/>
          </div>
        </div>
      </div>

    </main>
  )
}
