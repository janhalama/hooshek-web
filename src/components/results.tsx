import { useState } from 'react';
import { RaceResults } from '../services/interfaces/results.interface';
import { Race } from './race';
import { Search } from './search';

export type ResultsProps = {
  results: RaceResults;
};

export const Results = ({ results }: ResultsProps): JSX.Element => {
  const [athleteSearch, setAthleteSearch] = useState<string | undefined>(
    undefined
  );

  return (
    <div className="flex flex-col min-h-screen font-medium">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-center text-2xl">Výsledky závodů Sokol Skuhrov</h1>
        <h2 className="text-center text-xl">
          {`${(results.date as Date).toLocaleDateString('cs')} ${results.name}`}
        </h2>
        <Search setAthleteSearch={setAthleteSearch}></Search>
        {results.races.map(race => {
          return (
            <Race key={race.name} race={race} athleteSearch={athleteSearch} />
          );
        })}
      </div>
    </div>
  );
};

export default Results;
