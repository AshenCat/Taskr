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


  return (<ol>
    <li>
      <div className='selection' onClick={()=>onSelectionClick('/set')} 
        role="button" 
        tabIndex={0}>
          List all sets
      </div>
    </li>
    <li>
      <div className='selection' onClick={()=>onSelectionClick('/set?create=true')} 
        role="button" 
        tabIndex={0}>
          Create a set
      </div>
    </li>
    <li>
      <div className='selection' onClick={()=>onSelectionClick('/todo')} 
        role="button" 
        tabIndex={0}>
          List all todos
      </div>
    </li>
    <li>
      <div className='selection' onClick={()=>{
        todoCreateSetOpen(true)
        setDrawerOpen(false)
      }} 
        role="button" 
        tabIndex={0}>
          Create a todo
      </div>
    </li>
  </ol>)
}

export default Todo