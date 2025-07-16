import { useRouter } from "next/router";
import { useEffect } from "react";

export default function DatasetRootPage() {
  const router = useRouter();
  const { org, dataset } = router.query;

  useEffect(() => {
    if (org && dataset) {
      const episodeN = process.env.EPISODES
        ?.split(/\s+/)
        .map((x) => parseInt(x.trim(), 10))
        .filter((x) => !isNaN(x))[0] ?? 0;

      router.replace(`/${org}/${dataset}/episode_${episodeN}`);
    }
  }, [org, dataset, router]);

  return <div>Redirecting...</div>;
} 