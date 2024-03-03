import { useEffect, useState } from "react";
import axios from "axios";

import { type Photo } from "../lib/types";

type PhotoStatistics = {
  likes: number;
  downloads: number;
  views: number;
};

type FetchedData = Photo & PhotoStatistics;

const apiBase = import.meta.env.VITE_API_BASE as string;
const apiKey = import.meta.env.VITE_ACCESS_KEY as string;

const useFetchPhoto = (id: string) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<FetchedData | undefined>();
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    const controller = new AbortController();
    axios
      .get<FetchedData>(`${apiBase}/photos/${id}?client_id=${apiKey}`)
      .then((response) => setData(response.data))
      .catch(() => setError("Something went wrong"))
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [id]);

  return { loading, data, error };
};

export default useFetchPhoto;
