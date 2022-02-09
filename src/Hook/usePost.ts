import { apiFiles } from "../api/apiFiles"
import { apiPosts } from "../api/apiPosts"
import { FileInStore, NewPost } from "../Utils/types"
import { BaseThunkType, InferActionsType } from "../redux/redux-store"

export type ThunkType = BaseThunkType<ActionsType>
type ActionsType = InferActionsType<null>

export const addNewPost = (newPost: NewPost): ThunkType => {
  return async (dispatch, getState, {getFirebase}: any) => {
    let newImagesUrl = [] as FileInStore[]
    let newFilesUrl = [] as FileInStore[]

    const callBackImg = (newFiles: FileInStore[]) => {
      newImagesUrl = newFiles
    }
    const callBackFile = (newFiles: FileInStore[]) => {
      newFilesUrl = newFiles
    }
    await apiFiles.add(newPost.Files, 'posts', newPost.Header, 'files', callBackFile)
    await apiFiles.add(newPost.Images, 'posts', newPost.Header, 'images', callBackImg)
    
    apiPosts.set(newPost, getFirebase, newFilesUrl, newImagesUrl)
  }
}

export const deletePost = (id: string, groupName: string, files: FileInStore[], images: FileInStore[]): ThunkType => {
  return async (dispatch, getState, {getFirebase}: any) => {
    apiPosts.delete(id, getFirebase)
    apiFiles.delete('posts', groupName, 'images', images)
    apiFiles.delete('posts', groupName, 'files', files)
  }
}