import React, {useRef, useState} from 'react'
import {Button, IconButton} from "@mui/material";
import {MAX_FILE_SIZE_MB} from "../../../Utils/constants";
import styles from './uploadFiles.module.scss';
import {FilePreview} from "./FilePreview/FilePreview";
import {DeleteOutline} from "@mui/icons-material";
import ImagePreview from "./ImagePreview";

type Props = {
  files?: Blob[];
  setFile: (file: Blob[]) => void;
  maxUploadCount?: number;
  accept: 'image/*' | 'application/pdf';
}

export default function UploadFiles({maxUploadCount = 1, accept, setFile, files}: Props) {
  const [uploadError, setUploadError] = useState<string>('');
  const hiddenFileInput = useRef<HTMLElement | null>(null) as React.MutableRefObject<HTMLInputElement>;
  const isImage = accept === 'image/*';
  const isPdf = accept === 'application/pdf';

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
    setFile([...(files || []), selectedFile])
  }

  const onDelete = (file: Blob | File) => {
    if (file && files)
      setFile(files?.filter(value => value !== file))
  }

  return (
    <>
      <Button onClick={handleClick} disabled={maxUploadCount <= (files?.length || 0)}>
        Upload {isImage ? 'Image' : 'Pdf'} (Max: {maxUploadCount})
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
          {files?.map(image => (
            <ImagePreview image={image} onDelete={onDelete}/>
          ))}
        </div>
      )}
      {isPdf && <FilePreview filesPreview={files as File[]} onDelete={onDelete}/>}
    </>
  )
}