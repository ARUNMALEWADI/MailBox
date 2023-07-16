import React from 'react'
import Panel from './Panel/Panel'

const Trash = (props) => {
  
  return <>
    <Panel></Panel>
    <div>{props.data}</div>
  </>
}

export default Trash