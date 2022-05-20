import { useState } from 'react';
import { EventRaceResults } from '../services/interfaces/results.interface';
import { Race } from './race';
import { Search } from './search';

export type ResultsProps = {
  results: EventRaceResults;
};

export const Results = ({ results }: ResultsProps): JSX.Element => {
  const [athleteSearch, setAthleteSearch] = useState<string | undefined>(
    undefined
  );

  return (
    <div>
      <Search setAthleteSearch={setAthleteSearch}></Search>
      {results.races.map(race => {
        return (
          <Race key={race.name} race={race} athleteSearch={athleteSearch} />
        );
      })}
    </div>
  );
};

export default Results;
