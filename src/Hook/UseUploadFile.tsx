import firebase from "../Utils/firebase";
import {fbStorage} from "../Utils/firebase";
import {FileInStore} from "../Utils/types";

export default function useUploadFile() {
  const uploadFile = (
    selectedFile: File,
    storageFolder: string,
    onUploadComplete: (storedFile: FileInStore) => void
  ) => {
    const currentUploadTask = fbStorage
      .ref()
      .child(`${storageFolder}/${new Date().getTime() + selectedFile.name}`)
      .put(selectedFile);
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
        throw error;
      });
  }


  const uploadFiles = (
    files: File[],
    onComplete: (filesInStore: FileInStore[]) => void,
    folderName: string,
  ) => {
    if (!files?.length) {
      onComplete([] as FileInStore[])
      return;
    }
    const length = files.length;
    const filesInStore = [] as FileInStore[];
    files.forEach((file, idx) => {

      const onCompleteArray = (fileInStore: FileInStore) => {
        filesInStore.push(fileInStore);
        if (idx + 1 >= length) {
          onComplete(filesInStore);
        }
      }
      uploadFile(file, folderName, onCompleteArray)
    })

  };


  const onDelete = (files: FileInStore[]) => {
    files.forEach(file => (
      firebase
        .storage()
        .ref(file.id)
        .delete()
        .catch((error) => console.error(error))
    ))
  }

  return {
    uploadFile,
    onDelete,
    uploadFiles,
  }
}