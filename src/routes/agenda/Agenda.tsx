import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { todoConstants } from '../../../constants';
import CreateTodo from '../../layout/popups/createTodo/CreateTodo';
import useStore from '../../state';
import './agenda.scss'
import AgendaItem, { IAgendaItemProps } from './item/AgendaItem';

function Todo() {  
  const {todoList, setTodoList, filter, list} = useStore(state=>state)
  const location = useLocation();
  const [todos, setTodos] = useState<IAgendaItemProps[]>([]) 

  useEffect(()=>{
    window.electron.todoApi(todoConstants.GET_USER_PENDING_TODO, {});
    window.electron.receive(todoConstants.GET_USER_PENDING_TODO, (list: IAgendaItemProps[]) => {
      setTodos(list)
    })
    window.electron.receive(todoConstants.GET_USER_ARCHIVED_TODO, (archivedTodos: IAgendaItemProps[]) => {
      console.log(archivedTodos)
      setTodos(archivedTodos)
    })
    // below are triggers to get updated data
    window.electron.receive(todoConstants.TOGGLE_DONE_TODO, () => {
      reloadData()
    })
    window.electron.receive(todoConstants.UPDATE_STATUS_TODO, () => {
      reloadData()
    })
    return () => {
      window.electron.removeAllListeners(todoConstants.GET_USER_PENDING_TODO)
      window.electron.removeAllListeners(todoConstants.TOGGLE_DONE_TODO)
      window.electron.removeAllListeners(todoConstants.UPDATE_STATUS_TODO)
      window.electron.removeAllListeners(todoConstants.GET_USER_ARCHIVED_TODO)
    }
  }, [])

  useEffect(() => {
    if (filter) {
      console.log('with filter')
      switch(filter) {
        case 'archived':
          window.electron.todoApi(todoConstants.GET_USER_ARCHIVED_TODO, {})
          break;
        default:
          break;
      }
    } else {
      console.log('without filter')
      window.electron.todoApi(todoConstants.GET_USER_PENDING_TODO, {});
    }
  }, [filter])

  useEffect(() => {
    if (list) {
      switch(list) {
        default:
          break;
      }
    }
  }, [list])

  const reloadData = () => {
    console.log(filter)
    console.log(location)
    switch(filter) {
      case 'archived':
        window.electron.todoApi(todoConstants.GET_USER_ARCHIVED_TODO, {})
        return;
      default:
        window.electron.todoApi(todoConstants.GET_USER_PENDING_TODO, {})
        return;
    }
  }

  return (
    <div className='agenda'>
      <h2>Agenda</h2>
        <div className='pb-35'>
          {todos.map(d=><AgendaItem due={d.due} _id={"" + d._id} key={d._id} name={d.name} status={d.status} done={d.done} tags={d.tags} />)}
        </div>
      <CreateTodo />
    </div>
  )
}

export default Todo