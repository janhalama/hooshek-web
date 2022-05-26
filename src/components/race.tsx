import { RaceResult } from '../services/interfaces/results.interface';

export type ResultsProps = {
  race: RaceResult;
  athleteSearch: string | undefined;
};

export const Race = ({ race, athleteSearch }: ResultsProps): JSX.Element => {
  let filteredAthletes = race.athletes;
  if (athleteSearch) {
    filteredAthletes = race.athletes.filter(athlete => {
      const name = athlete.name?.toUpperCase();
      const surname = athlete.surname?.toUpperCase();
      return (
        `${name} ${surname}`.indexOf(athleteSearch.toUpperCase()) > -1 ||
        `${surname} ${name}`.indexOf(athleteSearch.toUpperCase()) > -1
      );
    });
  }
  if (filteredAthletes.length > 0) {
    return (
      <div>
        <div className="dark:bg-gray-700 bg-gray-200 rounded-t-lg py-3 px-3  mb-0 text-base dark:text-white my-5">
          {race.name} | Trať {race.distance}
        </div>
        <table className="w-full flex flex-row flex-no-wrap sm:bg-white overflow-hidden sm:shadow-lg ">
          <thead className="text-black">
            {filteredAthletes.map(athlete => {
              return (
                <tr
                  key={`header_${race.name}_${athlete.surname}_${athlete.name}_${athlete.rank}`}
                  className="dark:bg-gray-300 flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0"
                >
                  <th className="p-3 truncate">#</th>
                  <th className="p-3 truncate">S</th>
                  <th className="p-3 truncate">Jméno</th>
                  <th className="p-3 truncate">Nar.</th>
                  <th className="p-3 truncate">Klub</th>
                  <th className="p-3 truncate">Čas</th>
                  <th className="p-3 truncate">Ztráta</th>
                </tr>
              );
            })}
          </thead>
          <tbody className="flex-1 sm:flex-none">
            {filteredAthletes.map(athlete => {
              return (
                <tr
                  key={`${race.name}_${athlete.surname}_${athlete.name}_${athlete.rank}`}
                  className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0"
                >
                  <td className="border-grey-light border hover:bg-gray-100 p-3 truncate sm:text-center">
                    {athlete.rank ? athlete.rank : 'DNS'}
                  </td>
                  <td className="border-grey-light border hover:bg-gray-100 p-3 truncate sm:text-center">
                    {athlete.rank_sokol ? athlete.rank_sokol : ''}&nbsp;
                  </td>
                  <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">
                    {`${athlete.name} ${athlete.surname}`}
                  </td>
                  <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">
                    {athlete.born}
                  </td>
                  <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">
                    {athlete.club}&nbsp;
                  </td>
                  <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">
                    {athlete.time}&nbsp;
                  </td>
                  <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">
                    {athlete.diff}&nbsp;
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default Race;
