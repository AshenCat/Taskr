import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { todoConstants } from '../../../constants';
import useStore from '../../state';
import './agenda.scss'
import AgendaItem, { IAgendaItemProps } from './item/AgendaItem';

function Todo() {  
  const navigate = useNavigate();

  const {todoList, setTodoList} = useStore(state=>state)

  useEffect(()=>{
    window.electron.todoApi(todoConstants.GET_USER_PENDING_TODO, {});
    window.electron.receive(todoConstants.GET_USER_PENDING_TODO, (list: IAgendaItemProps[]) =>{
      console.log(list)
      setTodoList(list)
    })
    return () => {
      window.electron.removeAllListeners(todoConstants.GET_USER_PENDING_TODO)
    }
  }, [])

  return (
    <div className='agenda'>
      <h2>Agenda</h2>
        <div className='pb-35'>
          {todoList.map(d=><AgendaItem due={d.due} _id={"" + d._id} key={d._id} name={d.name} status={d.status} done={d.done} tags={d.tags} />)}
        </div>

    </div>
  )
}

export default Todo