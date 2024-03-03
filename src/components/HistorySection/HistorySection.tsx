import { useState } from "react";

import "./historySection.css";
import useStore from "../../store/store";
import PhotosSection from "../PhotosSection/PhotosSection";

const HistorySection = () => {
  const searchedWords = useStore((state) => state.searchedWords);
  const [activeSearchWord, setActiveSearchWord] = useState(
    searchedWords[0] || ""
  );
  const [pageNumber, setPageNumber] = useState(1);

  const changeSearch = (keyWord: string) => {
    setActiveSearchWord(keyWord);
    setPageNumber(1);
  };

  return (
    <>
      <div className="searched-words-ctn">
        {searchedWords.length &&
          searchedWords.map((item) => (
            <div
              key={item}
              className={
                activeSearchWord === item
                  ? "searched-word-item active"
                  : "searched-word-item"
              }
              onClick={() => changeSearch(item)}
            >
              {item}
            </div>
          ))}
      </div>
      <PhotosSection
        keyWord={activeSearchWord}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
      />
    </>
  );
};

export default HistorySection;
