import Head from 'next/head';
import { Layout } from '../components/layouts/layout';
import { Results } from '../components/results';
import { parseResults } from '../services/results.service';
import {
  loadListOfRaceResultKeys,
  loadRaceResultYaml,
} from '../services/s3.service';

type HomeProps = {
  races: string[];
  raceResultYaml: string;
};

const Home = ({ raceResultYaml }: HomeProps) => {
  return (
    <Layout>
      <Head>
        <title>Výsledky | Sokol Skuhrov</title>
      </Head>
      {raceResultYaml ? (
        <Results results={parseResults(raceResultYaml)} />
      ) : (
        <div>Žádné výsledky nebyly nahrány.</div>
      )}
    </Layout>
  );
};

export async function getServerSideProps() {
  const keys = await loadListOfRaceResultKeys();
  keys.sort().reverse(); //each reace key starts with date in ISO format, we want to have latest races first

  let raceResultYaml = null;

  if (keys.length) {
    raceResultYaml = await loadRaceResultYaml(keys[0]);
  }

  return {
    props: {
      races: keys,
      raceResultYaml,
    },
  };
}

export default Home;
