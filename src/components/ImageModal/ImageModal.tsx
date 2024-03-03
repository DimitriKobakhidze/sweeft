import { useState } from "react";
import { GrClose } from "react-icons/gr";
import { FaHeart } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";

import "./imageModal.css";
import useFetchPhoto from "../../hooks/useFetchPhoto";
import Spinner from "../UI/Spinner";

type ImageModalProps = {
  imageId: string;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const engagementProperties = [
  { propertyName: "likes", iconElement: <FaHeart /> },
  { propertyName: "views", iconElement: <FaEye /> },
  { propertyName: "downloads", iconElement: <IoMdDownload /> },
] as const;

const ImageModal = ({ imageId, setShowModal }: ImageModalProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { data, error } = useFetchPhoto(imageId);

  return (
    <div className="modal-bg">
      <div className="modal-wrapper">
        <GrClose
          className="modal-close-icon"
          onClick={(e) => {
            e.stopPropagation();
            setShowModal(false);
          }}
        />
        {error && <h1>{error}</h1>}
        {!imageLoaded && !error && (
          <div className="modal-spinner-wrapper">
            <Spinner />
          </div>
        )}
        {data && (
          <>
            <img
              className="modal-image"
              src={data?.urls.raw}
              onLoad={() => setImageLoaded(true)}
            />
            <div className="modal-statistics-ctn">
              {engagementProperties.map(({ iconElement, propertyName }) => (
                <div
                  key={propertyName}
                  className="modal-engagement-property-ctn"
                >
                  {iconElement}
                  <span className="modal-engagement-count">
                    {data[propertyName]}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ImageModal;
