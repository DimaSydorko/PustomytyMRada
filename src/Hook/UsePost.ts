import {apiPosts} from "../api/apiPosts"
import useUploadFile from "./UseUploadFile";
import {FileInStore, NewPost} from "../Utils/types"

export default function usePost() {
  const {uploadFiles, onDelete} = useUploadFile();

  const addNewPost = (newPost: NewPost, onComplete: () => void) => {
    let newImagesUrl = [] as FileInStore[]
    let newFilesUrl = [] as FileInStore[]
    let isImagesUploaded = false;
    let isFilesUploaded = false;

    const onFilesUploadComplete = async () => {
      if (isImagesUploaded && isFilesUploaded) {
        await apiPosts.set(newPost, newFilesUrl, newImagesUrl);
        onComplete();
      }
    }

    const callBackImg = (newFiles: FileInStore[]) => {
      newImagesUrl = newFiles;
      isImagesUploaded = true;
      onFilesUploadComplete();
    }
    const callBackFile = (newFiles: FileInStore[]) => {
      newFilesUrl = newFiles;
      isFilesUploaded = true;
      onFilesUploadComplete();
    }

    uploadFiles(newPost.images as File[], callBackImg, 'posts/Images')
    uploadFiles(newPost.files as File[], callBackFile, 'posts/Pdfs')

  }

  const deletePost = (id: string, files: FileInStore[], images: FileInStore[]) => {
    apiPosts.delete(id)
    onDelete(files);
    onDelete(images);
  }
  return {
    addNewPost,
    deletePost,
  }
}