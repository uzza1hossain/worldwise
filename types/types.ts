export type Position = {
  lat: number;
  lng: number;
};

export type City = {
  cityName: string;
  country: string;
  emoji: string;
  date: string;
  notes: string;
  position: Position;
  id: number;
};
