import {apiFiles} from "../api/apiFiles"
import {apiPosts} from "../api/apiPosts"
import {FileInStore, NewPost} from "../Utils/types"

export default function usePost() {
  const addNewPost = (newPost: NewPost) => {
    let newImagesUrl = [] as FileInStore[]
    let newFilesUrl = [] as FileInStore[]

    const callBackImg = (newFiles: FileInStore[]) => {
      newImagesUrl = newFiles
    }
    const callBackFile = (newFiles: FileInStore[]) => {
      newFilesUrl = newFiles
    }
    // await apiFiles.add(newPost.Files, 'posts', newPost.Header, 'files', callBackFile)
    // await apiFiles.add(newPost.Images, 'posts', newPost.Header, 'images', callBackImg)

    apiPosts.set(newPost, newFilesUrl, newImagesUrl)
  }

  const deletePost = (id: string, groupName: string, files: FileInStore[], images: FileInStore[]) => {
    apiPosts.delete(id)
    apiFiles.delete('posts', groupName, 'images', images)
    apiFiles.delete('posts', groupName, 'files', files)
  }
  return {
    addNewPost,
    deletePost,
  }
}