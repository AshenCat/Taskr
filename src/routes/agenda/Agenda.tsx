import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { todoConstants } from '../../../constants';
import CreateTodo from '../../layout/popups/createTodo/CreateTodo';
import useStore from '../../state';
import './agenda.scss'
import AgendaItem, { IAgendaItemProps } from './item/AgendaItem';

function Todo() {  
  const navigate = useNavigate();

  const {todoList, setTodoList} = useStore(state=>state)

  useEffect(()=>{
    window.electron.todoApi(todoConstants.GET_USER_PENDING_TODO, {});
    window.electron.receive(todoConstants.GET_USER_PENDING_TODO, (list: IAgendaItemProps[]) =>{
      setTodoList(list)
    })
    window.electron.receive(todoConstants.TOGGLE_DONE_TODO, () => {
      window.electron.todoApi(todoConstants.GET_USER_PENDING_TODO, {})
    })
    window.electron.receive(todoConstants.UPDATE_STATUS_TODO, () => {
      window.electron.todoApi(todoConstants.GET_USER_PENDING_TODO, {})
    })
    return () => {
      window.electron.removeAllListeners(todoConstants.GET_USER_PENDING_TODO)
      window.electron.removeAllListeners(todoConstants.TOGGLE_DONE_TODO)
      window.electron.removeAllListeners(todoConstants.UPDATE_STATUS_TODO)
    }
  }, [])

  return (
    <div className='agenda'>
      <h2>Agenda</h2>
        <div className='pb-35'>
          {todoList.map(d=><AgendaItem due={d.due} _id={"" + d._id} key={d._id} name={d.name} status={d.status} done={d.done} tags={d.tags} />)}
        </div>
      <CreateTodo />
    </div>
  )
}

export default Todo