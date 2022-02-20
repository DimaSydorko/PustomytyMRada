import React from "react"
import {FileTextOutlined} from '@ant-design/icons'
import {IconButton} from "@mui/material";
import {DeleteOutline} from '@mui/icons-material';
import {FileInStore} from "../../../../Utils/types"
import styles from './FilePreview.module.scss'


type FilePreviewType = {
  files?: FileInStore[];
  filesPreview?: File[];
  onDelete?: (file: File) => void;
}

export const FilePreview = React.memo(({files, filesPreview, onDelete}: FilePreviewType) => {
  return (
    <div>
      {files?.map(file => file.name && (
        <a
          href={file.url}
          target="blank"
          key={file.id}
        >
          <p className={styles.fileName}>
            <FileTextOutlined/> {file.name}
          </p>
        </a>
      ))}
      {filesPreview?.map(file => (
        <div className={styles.container}>
          <a
            key={URL.createObjectURL(file)}
            href={URL.createObjectURL(file)}
            target="blank"
          >
            <p className={styles.fileName}>
              <FileTextOutlined/> {file.name}
            </p>
          </a>
          {onDelete && (
            <IconButton onClick={() => onDelete(file)}>
              <DeleteOutline/>
            </IconButton>
          )}
        </div>
      ))}
    </div>
  )
})