import React, {useState} from "react";
import styles from './uploadFiles.module.scss'
import {IconButton} from "@mui/material";
import {DeleteOutline} from "@mui/icons-material";

interface ImagePreviewType {
  image: Blob;
  onDelete: (image: Blob) => void;
}

export default function ImagePreview({image, onDelete}: ImagePreviewType) {
  const [isDeleteButton, setIsDeleteButton] = useState<boolean>(false);

  return (
    <div
      className={styles.uploadImageContainer}
      onMouseEnter={() => setIsDeleteButton(true)}
      onMouseLeave={() => setIsDeleteButton(false)}
    >
      <img src={URL.createObjectURL(image)} alt={''} className={styles.uploadImagePreview}/>
      {isDeleteButton && (
        <IconButton onClick={() => onDelete(image)} className={styles.deleteButton}>
          <DeleteOutline/>
        </IconButton>
      )}
    </div>
  )
}