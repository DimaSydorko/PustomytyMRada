import React, {useRef, useState} from 'react'
import {Button} from "@mui/material";
import {MAX_FILE_SIZE_MB} from "../../../Utils/constants";
import styles from './uploadFiles.module.scss';

type Props = {
  files?: Blob[];
  onAddFile: (file: Blob) => void;
  maxUploadCount?: number;
  accept: 'image/*' | 'application/pdf';
}

export default function UploadFiles({maxUploadCount = 1, accept, onAddFile, files}: Props) {
  const [uploadError, setUploadError] = useState<string>('');
  const hiddenFileInput = useRef<HTMLElement | null>(null) as React.MutableRefObject<HTMLInputElement>;
  const isImage = accept === 'image/*';

  const handleClick = () => {
    hiddenFileInput.current && hiddenFileInput.current.click();
  };

  const handleFileUpload: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const selectedFile = event.target.files && event.target.files[0];
    if (!selectedFile) return;

    if (selectedFile.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setUploadError(`This file is too big! The maximum size is ${MAX_FILE_SIZE_MB} megabytes.`);
      return;
    }
    onAddFile(selectedFile as any);
  }

  return (
    <>
      <Button onClick={handleClick}>
        Upload (Max: {maxUploadCount})
      </Button>
      <input
        type='file'
        ref={hiddenFileInput}
        onChange={handleFileUpload}
        className={styles.upload}
        accept={accept}
        onClick={() => (hiddenFileInput.current.value = '')}
      />
      {uploadError && <div className={styles.uploadError}>uploadError</div>}
      {isImage && (
        <div className={styles.uploadImagePreviewContainer}>
          {files?.map((image, idx) => (
            <div key={idx}>
              <img src={URL.createObjectURL(image)} alt={''} className={styles.uploadImagePreview}/>
            </div>
          ))}
        </div>
      )}
    </>
  )
}