import {apiFiles} from "../api/apiFiles"
import {apiMembers} from "../api/apiMembers"
import {FileInStore, NewMember} from "../Utils/types"
import {BaseThunkType, InferActionsType} from "../redux/redux-store"
import firebase from "../Utils/firebase";


export type ThunkType = BaseThunkType<ActionsType>
type ActionsType = InferActionsType<null>

export const addNewMember = (newMember: NewMember): ThunkType => {
  return async () => {
    let newImagesUrl = [] as FileInStore[]
    const callBackImg = (newFiles: FileInStore[]) => {
      newImagesUrl = newFiles
    }
    await apiFiles.add(newMember.profileImg, 'members', newMember.fullName, 'images', callBackImg)

    firebase.firestore().collection('members').add({
      department: newMember.department,
      fullName: newMember.fullName,
      instgramLink: newMember.instgramLink,
      facebookLink: newMember.facebookLink,
      profileImg: newImagesUrl,
    })
  }
}

export const deleteMember = (id: string, groupName: string, images: FileInStore[]): ThunkType => {
  return async (dispatch, getState, {getFirebase}: any) => {
    apiMembers.delete(id, getFirebase)
    apiFiles.delete('members', groupName, 'images', images)
  }
}