import { useState } from "react";

import "./imageItem.css";
import ImageModal from "../ImageModal/ImageModal";
import { type Photo } from "../../lib/types";

type ImageItemProps = {
  imageInfo: Photo;
  isLastItem: boolean;
  observerCallback: (itemElement: HTMLImageElement | null) => void;
};

const ImageItem = ({
  imageInfo,
  isLastItem,
  observerCallback,
}: ImageItemProps) => {
  const [showStatisticsModal, setShowStatisticsModal] = useState(false);

  return (
    <div
      onClick={() => setShowStatisticsModal(true)}
      ref={isLastItem ? observerCallback : null}
    >
      {showStatisticsModal && (
        <ImageModal
          imageId={imageInfo.id}
          setShowModal={setShowStatisticsModal}
        />
      )}
      <img
        className="image-item"
        src={imageInfo.urls.small}
        alt={imageInfo.alt_description}
      />
    </div>
  );
};

export default ImageItem;
