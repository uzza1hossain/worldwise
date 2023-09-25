import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './Map.module.css';

export default function Map() {
  const navigate = useNavigate();
  const [searchParam, setSearchParam] = useSearchParams();
  const lat = searchParam.get('lat');
  const lng = searchParam.get('lng');
  return (
    <div
      className={styles.mapContainer}
      onClick={() => {
        navigate('form');
      }}>
      <h1>Map</h1>
      <h2>
        Position: {lat} - {lng}
      </h2>
    </div>
  );
}
