import { useEffect, useState } from "react";
import axios from "axios";
import useStore from "../store/store";

import { type Photo } from "../lib/types";

const apiBase = import.meta.env.VITE_API_BASE as string;
const apiKey = import.meta.env.VITE_ACCESS_KEY as string;
const itemsPerPage = import.meta.env.VITE_ITEMS_PER_PAGE as number;

const useFetchPhotos = (keyWord: string, pageNumber: number) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Photo[]>([]);
  const [error, setError] = useState("");
  const getCache = useStore((state) => state.getCache);
  const addToCache = useStore((state) => state.addToCache);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError("");

    const cachedData = getCache(keyWord, pageNumber);

    if (cachedData) {
      if (pageNumber === 1) {
        setData(cachedData);
        setLoading(false);
      } else {
        setData((prevData) => [...prevData, ...cachedData]);
        setLoading(false);
      }
    } else {
      axios
        .get<{ results: Photo[] }>(
          `${apiBase}/search/photos?query=${keyWord}&per_page=${itemsPerPage}&page=${pageNumber}&client_id=${apiKey}`
        )
        .then((response) => {
          const data = response.data.results;
          addToCache(keyWord, pageNumber, data);

          if (pageNumber === 1) {
            setData(data);
          } else {
            setData((prevData) => [...prevData, ...data]);
          }
        })
        .catch(() => setError("Something went wrong"))
        .finally(() => setLoading(false));
    }

    return () => controller.abort();
  }, [keyWord, pageNumber, addToCache, getCache]);

  return { loading, data, error };
};

export default useFetchPhotos;
