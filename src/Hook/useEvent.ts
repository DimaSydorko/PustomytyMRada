import {apiEvents} from '../api/apiEvents';
import {FileInStore} from '../Utils/types';
import {NewEvent} from "../Utils/types"
import {BaseThunkType, InferActionsType} from "../redux/redux-store"
import {apiFiles} from '../api/apiFiles';
import {useCallback} from "react";
import firebase from "../Utils/firebase";

export type ThunkType = BaseThunkType<ActionsType>
type ActionsType = InferActionsType<null>

export default function useEvent() {
  const addNewEvent = useCallback((newEvent: NewEvent) => {
    return async ({getFirebase}: any) => {
      let newImagesUrl = [] as Array<FileInStore>

      const callBackImg = (newFiles: Array<FileInStore>) => {
        newImagesUrl = newFiles
      }
      // await apiFiles.add(newEvent.sponsors.images, 'events', newEvent.header, 'images', callBackImg)

      firebase
        .firestore()
        .collection('events')
        .add({
          header: newEvent.header,
          text: newEvent.text,
          dataTime: newEvent.dataTime,
          link: newEvent.link,
          location: newEvent.location,
          sponsors: {
            images: newImagesUrl,
            name: newEvent.sponsors.name,
          },
        }).then(() => {

      })

      apiEvents.set(newEvent, getFirebase, newImagesUrl)
    }
  }, []);

  const deleteEvent = useCallback((id: string, groupName: string, images: Array<FileInStore>,): ThunkType => {
    return async (dispatch, getState, {getFirebase}: any) => {
    firebase
      .firestore()
      .collection('events')
      .doc(id)
      .delete().catch(err => {
        console.error(err)
    })
      apiFiles.delete('events', groupName, 'images', images)
    }
  }, []);

  return {
    addNewEvent,
    deleteEvent,
  }
}

export const addNewEvent = (newEvent: NewEvent): ThunkType => {
  return async (dispatch, getState, {getFirebase}: any) => {
    let newImagesUrl = [] as Array<FileInStore>

    const callBackImg = (newFiles: Array<FileInStore>) => {
      newImagesUrl = newFiles
    }
    await apiFiles.add(newEvent.sponsors.images, 'events', newEvent.header, 'images', callBackImg)

    apiEvents.set(newEvent, getFirebase, newImagesUrl)
  }
}

export const deleteEvent = (id: string, groupName: string, images: Array<FileInStore>,): ThunkType => {
  return async (dispatch, getState, {getFirebase}: any) => {
    apiEvents.delete(id, getFirebase)
    apiFiles.delete('events', groupName, 'images', images)
  }
} 