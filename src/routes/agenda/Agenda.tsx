import React from 'react'
import { useNavigate } from 'react-router-dom';
import Checkbox from '../../_components/Checkbox';
import Collapse, { CollapseItem } from '../../_components/Collapse';
import Select, { Option } from '../../_components/Select';
import './agenda.scss'
import AgendaItem from './item/AgendaItem';

function Todo() {  
  const navigate = useNavigate();

  return (
    <div className='agenda'>
      <h2>Agenda</h2>
        <Collapse title='Today' defaultOpen>
          {testData.map(d=><AgendaItem  key={d._id} todo={d.todo} optionState={d.optionState} checkboxState={d.checkboxState} tags={d.tags} />)}
        </Collapse>        
        <Collapse title='OTHERS'>
          {[...Array(8)].map((_, c)=><CollapseItem  className='row' key={c}><Checkbox /><div>TEST</div><Select><Option value="1">test</Option></Select></CollapseItem>)}
        </Collapse>
    </div>
  )
}

export default Todo

const testData = [
  {
    _id: 0,
    todo: "Select",
    optionState: 'In progress',
    checkboxState: false,
    tags: [{_id: 'a1', name: 'Clean', variant: 'warning'}, {_id: 'a2', name: 'Talk', variant: 'info'}]
  },
  {
    _id: 1,
    todo: "Checkbox",
    optionState: 'In progress',
    checkboxState: false,
    tags: [{_id: 'a3', name: 'Style', variant: 'danger'}]
  }
  ,  
  {
    _id: 2,
    todo: "Todo",
    optionState: 'In progress',
    checkboxState: false,
    tags: [{_id: 'a4', name: 'Layout', variant: 'success'}]
  }
  ,  
  {
    _id: 3,
    todo: "Agenda",
    optionState: 'In progress',
    checkboxState: false,
    tags: []
  },
  {
    _id: 4,
    todo: "Select",
    optionState: 'In progress',
    checkboxState: false,
    tags: [{_id: 'a1', name: 'Clean', variant: 'warning'}, {_id: 'a2', name: 'Talk', variant: 'info'}]
  },
  {
    _id: 5,
    todo: "Checkbox",
    optionState: 'In progress',
    checkboxState: false,
    tags: [{_id: 'a3', name: 'Style', variant: 'danger'}]
  }
  ,  
  {
    _id: 6,
    todo: "Todo",
    optionState: 'In progress',
    checkboxState: false,
    tags: [{_id: 'a4', name: 'Layout', variant: 'success'}]
  }
  ,  
  {
    _id: 7,
    todo: "Agenda",
    optionState: 'In progress',
    checkboxState: false,
    tags: []
  },
  {
    _id: 8,
    todo: "Select",
    optionState: 'In progress',
    checkboxState: false,
    tags: [{_id: 'a1', name: 'Clean', variant: 'warning'}, {_id: 'a2', name: 'Talk', variant: 'info'}]
  },
  {
    _id: 9,
    todo: "Checkbox",
    optionState: 'In progress',
    checkboxState: false,
    tags: [{_id: 'a3', name: 'Style', variant: 'danger'}]
  }
  ,  
  {
    _id: 10,
    todo: "Todo",
    optionState: 'In progress',
    checkboxState: false,
    tags: [{_id: 'a4', name: 'Layout', variant: 'success'}]
  }
  ,  
  {
    _id: 11,
    todo: "Agenda",
    optionState: 'In progress',
    checkboxState: false,
    tags: []
  }
  ,{
    _id: 12,
    todo: "Select",
    optionState: 'In progress',
    checkboxState: false,
    tags: [{_id: 'a1', name: 'Clean', variant: 'warning'}, {_id: 'a2', name: 'Talk', variant: 'info'}]
  },
  {
    _id: 13,
    todo: "Checkbox",
    optionState: 'In progress',
    checkboxState: false,
    tags: [{_id: 'a3', name: 'Style', variant: 'danger'}]
  }
  ,  
  {
    _id: 14,
    todo: "Todo",
    optionState: 'In progress',
    checkboxState: false,
    tags: [{_id: 'a4', name: 'Layout', variant: 'success'}]
  }
  ,  
  {
    _id: 15,
    todo: "Agenda",
    optionState: 'In progress',
    checkboxState: false,
    tags: []
  }
  ,{
    _id: 16,
    todo: "Select",
    optionState: 'In progress',
    checkboxState: false,
    tags: [{_id: 'a1', name: 'Clean', variant: 'warning'}, {_id: 'a2', name: 'Talk', variant: 'info'}]
  },
  {
    _id: 17,
    todo: "Checkbox",
    optionState: 'In progress',
    checkboxState: false,
    tags: [{_id: 'a3', name: 'Style', variant: 'danger'}]
  }
  ,  
  {
    _id: 18,
    todo: "Todo",
    optionState: 'In progress',
    checkboxState: false,
    tags: [{_id: 'a4', name: 'Layout', variant: 'success'}]
  }
  ,  
  {
    _id: 19,
    todo: "Agenda",
    optionState: 'In progress',
    checkboxState: false,
    tags: []
  },
  {
    _id: 20,
    todo: "Select",
    optionState: 'In progress',
    checkboxState: false,
    tags: [{_id: 'a1', name: 'Clean', variant: 'warning'}, {_id: 'a2', name: 'Talk', variant: 'info'}]
  },
  {
    _id: 21,
    todo: "Checkbox",
    optionState: 'In progress',
    checkboxState: false,
    tags: [{_id: 'a3', name: 'Style', variant: 'danger'}]
  }
  ,  
  {
    _id: 22,
    todo: "Todo",
    optionState: 'In progress',
    checkboxState: false,
    tags: [{_id: 'a4', name: 'Layout', variant: 'success'}]
  }
  ,  
  {
    _id: 23,
    todo: "Agenda",
    optionState: 'In progress',
    checkboxState: false,
    tags: []
  }
  ,{
    _id: 24,
    todo: "Select",
    optionState: 'In progress',
    checkboxState: false,
    tags: [{_id: 'a1', name: 'Clean', variant: 'warning'}, {_id: 'a2', name: 'Talk', variant: 'info'}]
  },
  {
    _id: 25,
    todo: "Checkbox",
    optionState: 'In progress',
    checkboxState: false,
    tags: [{_id: 'a3', name: 'Style', variant: 'danger'}]
  }
  ,  
  {
    _id: 26,
    todo: "Todo",
    optionState: 'In progress',
    checkboxState: false,
    tags: [{_id: 'a4', name: 'Layout', variant: 'success'}]
  }
  ,  
  {
    _id: 27,
    todo: "Agenda",
    optionState: 'In progress',
    checkboxState: false,
    tags: []
  }
  ,{
    _id: 28,
    todo: "Select",
    optionState: 'In progress',
    checkboxState: false,
    tags: [{_id: 'a1', name: 'Clean', variant: 'warning'}, {_id: 'a2', name: 'Talk', variant: 'info'}]
  },
  {
    _id: 29,
    todo: "Checkbox",
    optionState: 'In progress',
    checkboxState: false,
    tags: [{_id: 'a3', name: 'Style', variant: 'danger'}]
  }
  ,  
  {
    _id: 30,
    todo: "Todo",
    optionState: 'In progress',
    checkboxState: false,
    tags: [{_id: 'a4', name: 'Layout', variant: 'success'}]
  }
  ,  
  {
    _id: 31,
    todo: "Agenda",
    optionState: 'In progress',
    checkboxState: false,
    tags: []
  }
]