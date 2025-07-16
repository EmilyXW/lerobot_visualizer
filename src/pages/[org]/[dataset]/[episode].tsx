import EpisodeViewer from "../../../components/episode-viewer";
import { getEpisodeDataSafe } from "../../../utils/fetch-data";
import { GetServerSideProps } from "next";
import Head from "next/head";

interface EpisodePageProps {
  data: any;
  error: string | null;
  org: string;
  dataset: string;
  episode: string;
}

export default function EpisodePage({ data, error, org, dataset, episode }: EpisodePageProps) {
  return (
    <>
      <Head>
        <title>{`${org}/${dataset}/${episode} - LeRobot Dataset Visualizer`}</title>
      </Head>
      <EpisodeViewer data={data} error={error} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { org, dataset, episode } = context.params as { org: string; dataset: string; episode: string };
  
  // episode is like 'episode_1'
  const episodeNumber = Number(episode.replace(/^episode_/, ""));
  const { data, error } = await getEpisodeDataSafe(org, dataset, episodeNumber);
  
  return {
    props: {
      data: data || null,
      error: error || null,
      org,
      dataset,
      episode,
    },
  };
}; 