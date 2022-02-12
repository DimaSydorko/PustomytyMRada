import { Spin } from 'antd'
import { CompassOutlined } from '@ant-design/icons'
import styles from './loader.module.scss'

const antIcon = <CompassOutlined className={styles.spinElement} spin />;

export const Loader = () => {
  return <Spin indicator={antIcon} className={styles.loader}/>
} 