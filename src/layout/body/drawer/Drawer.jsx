import React, { useState } from 'react'
import useStore from '../../../state'
import './drawer.scss'


function drawer() {
  const {open, toggleDrawer} = useStore(state=>({open: state.drawerOpen, toggleDrawer: state.toggleDrawer}))

  const data = [{name: 'Todo', }, {name: 'Alarm'}]

  const DrawerItem = ({name}) => {
    return <li>
      <div className="drawer-item" onClick={toggleDrawer}>
        {name}
      </div>
      {/* <ul>
        <li></li>
      </ul> */}
    </li>
  }

  return (
    <nav className={`drawer ${open ? 'drawer-open' : ''}`}>
        <h3>Apps</h3>
        <ol>
          {data.map(d => <DrawerItem name={d.name} />)}
        </ol>
    </nav>
  )
}

export default drawer