import { useSearchParams } from 'react-router-dom';

export function useUrlPosition() {
  const [searchParam] = useSearchParams();
  const mapLat = searchParam.get('lat');
  const mapLng = searchParam.get('lng');
  return [mapLat, mapLng]
}
