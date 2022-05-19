export type EventRaceResults = {
  date: Date;
  name: string;
  races: RaceResult[];
};

export type RaceResult = {
  name: string;
  athletes: AthleteResult[];
  sex: 'f' | 'm';
  distance: string;
};

export type AthleteResult = {
  name: string;
  surname: string;
  born: number;
  diff?: string;
  rank?: number;
  rankSokol?: number;
  time?: string;
};
