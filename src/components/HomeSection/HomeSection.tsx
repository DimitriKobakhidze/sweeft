import { useState } from "react";

import "./homeSection.css";
import useDebounce from "../../hooks/useDebounce";
import useStore from "../../store/store";
import PhotosSection from "../../components/PhotosSection/PhotosSection";

const HomeSection = () => {
  const addSearchedWord = useStore((state) => state.addSearchedWord);
  const searchedWords = useStore((state) => state.searchedWords);
  const [searchInput, setSearchInput] = useState(searchedWords[0] || "popular");
  const [pageNumber, setPageNumber] = useState(1);
  const debouncedSearchInput = useDebounce(
    searchInput,
    1000,
    addSearchedWord,
    setPageNumber
  );

  return (
    <>
      <input
        className="search-input"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <PhotosSection
        keyWord={debouncedSearchInput}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
      />
    </>
  );
};

export default HomeSection;
