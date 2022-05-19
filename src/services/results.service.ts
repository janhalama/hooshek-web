import { load } from 'js-yaml';

import { EventRaceResults } from './interfaces/results.interface';

export const parseResults = (yaml: string): EventRaceResults => {
  return load(yaml) as EventRaceResults;
};
