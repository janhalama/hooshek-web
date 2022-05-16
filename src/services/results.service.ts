import { load } from 'js-yaml';

import { RaceResults } from './interfaces/results.interface';

export const parseResults = (yaml: string): RaceResults => {
  return load(yaml) as RaceResults;
};
