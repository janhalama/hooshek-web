import Head from 'next/head';
import { EventDropdownList } from '../components/eventDropdownList';
import { Layout } from '../components/layouts/layout';
import { Results } from '../components/results';
import { convertEventKeyToEventName } from '../services/events.service';
import { parseResults } from '../services/results.service';
import {
  loadEventRaceResultsYaml,
  loadListOfEventKeys,
} from '../services/s3.service';

type HomeProps = {
  eventKeys: string[];
  selectedEventRaceResultsYaml: string;
};

const Home = ({ eventKeys, selectedEventRaceResultsYaml }: HomeProps) => {
  const results =
    selectedEventRaceResultsYaml && parseResults(selectedEventRaceResultsYaml);
  const events = eventKeys.map(eventKey => {
    return { name: convertEventKeyToEventName(eventKey), key: eventKey };
  });

  return (
    <Layout>
      <Head>
        <title>Výsledky | Sokol Skuhrov</title>
      </Head>
      <div className="flex flex-col min-h-screen font-medium">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-center text-2xl pb-4">
            Výsledky závodů Sokol Skuhrov
          </h1>
          {results ? (
            <EventDropdownList
              events={events}
              selectedEventName={`${results.date.toLocaleDateString('cs')} ${
                results.name
              }`}
            ></EventDropdownList>
          ) : undefined}

          {results ? (
            <Results results={results} />
          ) : (
            <div>Žádné výsledky nebyly nahrány.</div>
          )}
        </div>
      </div>
    </Layout>
  );
};

type HomeQueryParams = {
  selectedEvent?: string;
};

export async function getServerSideProps({
  query,
}: {
  query: HomeQueryParams;
}) {
  const keys = await loadListOfEventKeys();
  keys.sort().reverse(); //each reace key starts with date in ISO format, we want to have latest races first

  let selectedEventRaceResultsYaml = null;

  if (query.selectedEvent && keys.find(key => key === query.selectedEvent)) {
    selectedEventRaceResultsYaml = await loadEventRaceResultsYaml(
      query.selectedEvent
    );
  } else {
    selectedEventRaceResultsYaml = await loadEventRaceResultsYaml(keys[0]);
  }

  return {
    props: {
      eventKeys: keys,
      selectedEventRaceResultsYaml,
    },
  };
}

export default Home;
