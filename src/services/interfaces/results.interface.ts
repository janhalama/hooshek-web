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
  desc?: string;
};

export type AthleteResult = {
  name: string;
  surname: string;
  born: number;
  club?: string;
  diff?: string;
  rank?: number;
  rank_sokol?: number;
  time?: string;
  start?: string;
  finish?: string;
};
