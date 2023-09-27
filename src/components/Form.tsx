// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from 'react';

import styles from './Form.module.css';
import Button from './Button';
import BackButton from './BackButton';
import { useNavigate } from 'react-router-dom';
import { useUrlPosition } from '../hooks/useUrlPosition';
import Message from './Message';
import Spinner from './Spinner';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useCities } from '../contexts/CitiesContext';

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

function Form() {
  const [cityName, setCityName] = useState('');
  const [country, setCountry] = useState('');
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState('');
  const navigate = useNavigate();
  const [mapLat, mapLng] = useUrlPosition();
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const { createCity, isLoading } = useCities();

  const [emoji, setEmoji] = useState('');
  const [geocodingError, setGeocodingError] = useState('');

  useEffect(() => {
    if (!mapLat && !mapLng) return;
    async function fetchCityData() {
      try {
        setIsLoadingGeocoding(true);
        setGeocodingError('');
        const res = await fetch(
          `${BASE_URL}?latitude=${mapLat}&longitude=${mapLng}`
        );
        const data = await res.json();
        if (!data.countryCode) {
          throw new Error(
            "That doesn't seem to be a city. Click somewhere else."
          );
        }

        setCityName(data.city || data.locality || '');
        setCountry(data.countryCode);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (err) {
        setGeocodingError(err.message);
        // throw new Error('Something went wrong');
      } finally {
        setIsLoadingGeocoding(false);
      }
    }
    fetchCityData();
  }, [mapLat, mapLng]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!cityName || !date) return;
    const newCity = {
      cityName,
      date,
      notes,
      emoji,
      country,
      position: { lat: mapLat, lng: mapLng },
    };
    await createCity(newCity);
    navigate('/app/cities');
  }

  if (isLoadingGeocoding) return <Spinner />;
  if (!mapLat && !mapLng)
    return <Message message="Start by clicking somewhere on the map." />;

  if (geocodingError) return <Message message={geocodingError} />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ''}`}
      onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat="dd/MM/yyyy"
        />
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
