import React from 'react'
import { message, Upload } from 'antd'
import { UploadFile } from 'antd/lib/upload/interface'
import ImgCrop from 'antd-img-crop'
import { BlobType } from '../../../Utils/types'

type Props = {
  imgCount: number
  isCrop?: boolean
  fileList: Array<BlobType> & Array<UploadFile<BlobType>> 
  setNewFiles: (newFiles: Array<UploadFile<BlobType>> & Array<BlobType>) => void
}

export const UploadImges: React.FC<Props> = ({fileList, setNewFiles, imgCount, isCrop = false}) => {
  const onChange = ({ fileList: newFileList }: any) => {
    setNewFiles(newFileList)
  }
  const onPreview = async (file: UploadFile<BlobType>) => {
    let src = file.url
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader()
        reader.readAsDataURL(file.originFileObj as Blob)
        reader.onload = () => resolve(reader.result as string | PromiseLike<string>) 
      })
    }
    const image = new Image()
    image.src = src as string
    const imgWindow = window.open(src)
    if (imgWindow !== null) imgWindow.document.write(image.outerHTML)
  }

  const uploadValidation = {
    beforeUpload: (file:BlobType) => {
      if (file.type !== ('image/gif'||'image/png'||'image/jpeg')) {
        message.error(`${file.name} is not png/jpg/gif file`)
      }
      return (file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/jpeg') ? true : Upload.LIST_IGNORE
    },
    onChange: (info: {fileList:string}) => {
      console.log(info.fileList)
    }
  }
  return <div>
     {isCrop ? 
      <ImgCrop shape='round'>
        <Upload
          action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
          listType="picture-card"
          fileList={fileList}
          onChange={onChange}
        >
          {fileList.length < imgCount && 'додати зображення'}
        </Upload>
      </ImgCrop> : 
      <Upload
      {...uploadValidation as any}
        action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
        name="image"
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
      >
      {fileList.length < imgCount && 'додати зображення'}
      </Upload>
    }
  </div>
}