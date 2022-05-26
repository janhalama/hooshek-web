import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { load } from 'js-yaml';
import { EventRaceResultsSchema } from './schemas/results.schema';

import { EventRaceResults } from './interfaces/results.interface';

export const parseResults = (yaml: string): EventRaceResults => {
  const results = load(yaml) as EventRaceResults;

  //hooshek fills rank, rank_sokol with empty string value, we are replacing it here with undefined
  results.races = results.races.map(race => {
    return {
      ...race,
      athletes: race.athletes.map(athlete => {
        return {
          ...athlete,
          rank: (athlete.rank as any) === '' ? undefined : athlete.rank,
          rank_sokol:
            (athlete.rank_sokol as any) === '' ? undefined : athlete.rank_sokol,
        };
      }),
    };
  });

  return results;
};

export const validateResults = (
  yaml: string
): {
  valid: boolean;
  errors?: string;
} => {
  const ajv = new Ajv({ allowUnionTypes: true });
  addFormats(ajv);

  const ajvValidateResults = ajv.compile(EventRaceResultsSchema);

  let json = load(yaml) as any;

  if (json) {
    //js-yaml converts date string to Javascript Date, we are replacing it with ISO representation of date before validating with json schema
    if (json?.date && json?.date instanceof Date) {
      json.date = json.date.toISOString().split('T')[0];
    }
  }

  const result = ajvValidateResults(json);

  return {
    valid: result,
    errors: ajv.errorsText(ajvValidateResults.errors),
  };
};
