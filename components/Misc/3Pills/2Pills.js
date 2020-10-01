import React, { useState } from 'react'
import { Pill } from './Pill'

export default ({ color, label1, label2, width = '2/12' }) => {
  const [activeId, setActiveId] = useState(0)

  return (
    <div style={{background: '#F3F5FD'}} className={`flex items-stretch w-${width} rounded-full`}>
      <Pill
        inactive={activeId !== 0}
        label={label1}
        color={color}
        textColor='black'
        clickHandler={() => {
          setActiveId(0)
        }}
      />
      <Pill
        inactive={activeId !== 1}
        label={label2}
        color={color}
        textColor='black'
        clickHandler={() => {
          setActiveId(1)
        }}
      />
    </div>
  )
}