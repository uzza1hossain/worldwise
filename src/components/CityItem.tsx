import { City } from '../../types/types';
import styles from './CityItem.module.css';

const formatDate = (date: string) =>
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    // weekday: 'long',
  }).format(new Date(date));

export default function CityItem({
  city: { cityName, emoji, date },
}: {
  city: City;
}) {
  // const { cityName, emoji, date } = city;
  return (
    <li className={styles.cityItem}>
      <span className={styles.emoji}>{emoji}</span>
      <h3 className={styles.name}>{cityName}</h3>
      <time className={styles.time}>{formatDate(date)}</time>
      <button className={styles.deleteBtn}>&times;</button>
    </li>
  );
}
