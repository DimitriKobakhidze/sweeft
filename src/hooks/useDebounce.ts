import { useState, useEffect } from "react";

const useDebounce = (
  input: string,
  delay: number,
  addSearchedWords: (word: string) => void,
  setPageNumber: React.Dispatch<React.SetStateAction<number>>
) => {
  const [debouncedValue, setDebouncedValue] = useState(input);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (input) {
        setDebouncedValue(input);
        setPageNumber(1);
        addSearchedWords(input);
      }
    }, delay);

    return () => clearTimeout(handler);
  }, [input, delay, addSearchedWords, setPageNumber]);

  return debouncedValue;
};

export default useDebounce;
