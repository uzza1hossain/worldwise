import { City } from '../../types/types';
import Message from './Message';
import styles from './CountryList.module.css';
import Spinner from './Spinner';
import CountryItem from './CountryItem';

export default function CountryList({
  cities,
  isLoading,
}: {
  cities: Record<string, never> | City[];
  isLoading: boolean;
}) {
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return <Message message="Add your first city by clicking on the map." />;

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}
