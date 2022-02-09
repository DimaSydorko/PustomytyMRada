import { Spin } from 'antd'
import { CompassOutlined } from '@ant-design/icons'
import './loader.less'
const antIcon = <CompassOutlined className='spin-element' spin />;

export const Loader = () => {
  return <Spin indicator={antIcon} className='loader'/>
} 