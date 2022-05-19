import Head from 'next/head';
import { Layout } from '../components/layouts/layout';
import { Results } from '../components/results';
import { parseResults } from '../services/results.service';
import {
  loadEventRaceResultsYaml,
  loadListOfEventKeys,
} from '../services/s3.service';

type HomeProps = {
  events: string[];
  selectedEventRaceResultsYaml: string;
};

const Home = ({ selectedEventRaceResultsYaml }: HomeProps) => {
  return (
    <Layout>
      <Head>
        <title>Výsledky | Sokol Skuhrov</title>
      </Head>
      {selectedEventRaceResultsYaml ? (
        <Results results={parseResults(selectedEventRaceResultsYaml)} />
      ) : (
        <div>Žádné výsledky nebyly nahrány.</div>
      )}
    </Layout>
  );
};

export async function getServerSideProps() {
  const keys = await loadListOfEventKeys();
  keys.sort().reverse(); //each reace key starts with date in ISO format, we want to have latest races first

  let selectedEventRaceResultsYaml = null;

  if (keys.length) {
    selectedEventRaceResultsYaml = await loadEventRaceResultsYaml(keys[0]);
  }

  return {
    props: {
      events: keys,
      selectedEventRaceResultsYaml,
    },
  };
}

export default Home;
