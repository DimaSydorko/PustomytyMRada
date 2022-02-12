import React from "react";

type SomeNetLinkT = {
  link: string | null
  name: string
  img: any
}
export const SomeNetLink: React.FC<SomeNetLinkT> = ({link, name, img}) => {
  return link ? 
    <a style={{display: "table-cell"}} href={link} target="blank">
      {img}{name}
    </a> : null
}