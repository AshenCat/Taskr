import React from 'react'
import { useNavigate } from 'react-router-dom'
import useStore from '../../../../state';

interface ITodoItemsProps {
  id?: string,

}

function Todo() {
  const {drawerSelected, setDrawerSelected, setDrawerOpen, drawerOpen, todoCreateSetOpen} = useStore(state=>state)

  const navigate = useNavigate();

  const onSelectionClick = (route: string) => {
    navigate(route)
    setDrawerOpen(false);
  }

  return (<>
    <header>SETS</header>
    <ol className='selection-list-items'>
      <li className='selection-list-item'>
        <div className='selection' onClick={()=>onSelectionClick('/agenda?list=set')} 
          role="button" 
          tabIndex={0}>
            List all todo sets
        </div>
      </li>
    </ol>
    <header>Todos</header>
    <ol className='selection-list-items'>
      <li className='selection-list-item'>
        <div className='selection' onClick={()=>onSelectionClick('/agenda')} 
          role="button" 
          tabIndex={0}>
            Pending todos
        </div>
      </li>
      <li className='selection-list-item'>
        <div className='selection' onClick={()=>onSelectionClick('/agenda?filter=finished')} 
          role="button" 
          tabIndex={0}>
            Finished todos
        </div>
      </li>
      <li className='selection-list-item'>
        <div className='selection' onClick={()=>onSelectionClick('/agenda?filter=archived')} 
          role="button" 
          tabIndex={0}>
            Archived todos
        </div>
      </li>
    </ol>
  </>)
}

export default Todo