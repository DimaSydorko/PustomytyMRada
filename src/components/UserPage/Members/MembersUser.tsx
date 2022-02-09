import React, { FC } from "react"
import { DepartmentsT } from "../../../Utils/types"
import "./members.less"
import { DepartmentFC } from "./Department"

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
    <div className="leadership">
      {DepartmentF(true)}
    </div>
    {DepartmentF()}
  </>
})