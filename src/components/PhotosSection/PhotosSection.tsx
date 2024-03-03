import "./photosSection.css";
import ImageItem from "../ImageItem/ImageItem";
import useObserver from "../../hooks/useObserver";
import useFetchPhotos from "../../hooks/useFetchPhotos";
import Spinner from "../UI/Spinner";

type PhotosSectionProps = {
  keyWord: string;
  pageNumber: number;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
};

const PhotosSection = ({
  keyWord,
  pageNumber,
  setPageNumber,
}: PhotosSectionProps) => {
  const {
    loading,
    data: photosData,
    error,
  } = useFetchPhotos(keyWord, pageNumber);
  const observerCallback = useObserver(loading, setPageNumber);

  if (error) return <h1 className="photo-section-error">{error}</h1>;

  return (
    <section className="images-ctn">
      {photosData.length &&
        photosData.map((imageInfo, id) => (
          <ImageItem
            key={imageInfo.id}
            imageInfo={imageInfo}
            isLastItem={id === photosData.length - 1}
            observerCallback={observerCallback}
          />
        ))}
      {loading && (
        <div className="photo-section-spinner-wrapper">
          <Spinner light={true} />
        </div>
      )}
    </section>
  );
};

export default PhotosSection;
