import React from "react"
import { FileInStore } from "../../../../Utils/types"
import { FileTextOutlined } from '@ant-design/icons'
import './filePreview.css'

type FilePreviewType = {
  files: Array<FileInStore>
}

export const FilePreview: React.FC<FilePreviewType> = React.memo(({files}) => {
  return (
    <div>
      { files.map(file => file.name ? 
          <a 
            href={file.url}
            target="blank"
            key={file.id}>
            <p className='file-name'>
              <FileTextOutlined /> {file.name}
            </p>
          </a>
        : null)
        }
    </div>
  )
})