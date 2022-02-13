import React from 'react'
import {Button, Space, Upload} from 'antd'
import {UploadOutlined} from '@ant-design/icons'
import {UploadFile} from 'antd/lib/upload/interface'
import {BlobType} from '../../../Utils/types'

type Props = {
  maxUploadCount: number
  fileList: Array<UploadFile<BlobType>>
  setNewFiles: (newFiles: Array<UploadFile<BlobType>> & Array<BlobType>) => void
}

export default function UploadFiles({maxUploadCount, fileList, setNewFiles}: Props) {
  const onChange = ({fileList: newFileList}: any) => {
    setNewFiles(newFileList)
  }
  return (
    <div>
      <Space direction="vertical" size="large">
        <Upload
          action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
          maxCount={maxUploadCount}
          multiple
          fileList={fileList}
          onChange={onChange}
        >
          <Button icon={<UploadOutlined/>}>Upload (Max: {maxUploadCount})</Button>
        </Upload>
      </Space>
    </div>
  )
}