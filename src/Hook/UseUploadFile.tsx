import React, {useRef, useState} from "react";
import firebase from "firebase";
import {MAX_FILE_SIZE_MB} from "../Utils/constants";
import {fbStorage} from "../Utils/firebase";
import {FileInStore} from "../Utils/types";

export default function useUploadFile() {
  const [currentUploadingFile, setCurrentUploadFile] = useState<undefined | File>();
  const [isUploadInProgress, setIsUploadInProgress] = useState<boolean>(false);
  const [uploadProgressPercentage, setUploadProgressPercentage] = useState<number>(0);
  const [uploadError, setUploadError] = useState<string>('');
  const uploadTask = useRef<firebase.storage.UploadTask | undefined>();

   const uploadFile = (
    selectedFile: Blob | Uint8Array | ArrayBuffer,
    storageFolder: string, name: string,
    onUploadComplete: (storedFile: FileInStore) => void
  ) => {
    const currentUploadTask = fbStorage
      .ref()
      .child(`${storageFolder}/${name}`)
      .put(selectedFile);
    uploadTask.current = currentUploadTask;
    const uploadedFileRef = currentUploadTask.snapshot.ref
    uploadedFileRef
      .getDownloadURL()
      .then(downloadUrl => {
        const storedFile: FileInStore = {
          id: uploadedFileRef.fullPath,
          url: downloadUrl,
          name: uploadedFileRef.name,
        };
        onUploadComplete(storedFile);
      })
      .catch(error => {
        setUploadError('There was a problem uploading this file.');
        throw error;
      });
  }

  const handleCancelUpload = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    uploadTask.current?.cancel();
    setIsUploadInProgress(false);
    setUploadProgressPercentage(0);
    uploadTask.current = undefined;
  };

  const clearError = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    setUploadError('');
    setIsUploadInProgress(false);
    setUploadProgressPercentage(0);
    uploadTask.current = undefined;
  };


  return {
    uploadFile,
  }
}