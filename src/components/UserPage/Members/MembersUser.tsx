import React, { FC } from "react"
import { DepartmentFC } from "./Department"
import { DepartmentsT } from "../../../Utils/types"
import styles from './members.module.scss'

type PropsT = {
  departments: DepartmentsT
}

export const MemberUserPage:FC<PropsT> = React.memo(({departments}) => {
  function DepartmentF(isLeadership = false) {
    let arr = []
    for (let key in departments){
      //@ts-ignore
      if (isLeadership === departments[key].isLeadership) arr.push(departments[key])
    }
    return arr.map((e, i) => <DepartmentFC department={e} key={i}/>) 
  }
  
  return<>
    <h1>Учасники МРади</h1>
    <div className={styles.leadership}>
      {DepartmentF(true)}
    </div>
    {DepartmentF()}
  </>
})