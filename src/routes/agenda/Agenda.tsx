import React from 'react'
import { useNavigate } from 'react-router-dom';
import Checkbox from '../../_components/Checkbox';
import Chip from '../../_components/Chip';
import Collapse, { CollapseItem } from '../../_components/Collapse';
import Select, { Option } from '../../_components/Select';
import './agenda.scss'

function Todo() {
  const navigate = useNavigate();
  return (
    <div className='agenda'>
      <h2>Agenda</h2>
        <Collapse title='Today' defaultOpen>
          <CollapseItem className='m-2'>
            <div className='row'>
              <Checkbox />
              <div className='todo-name'>Collapse</div>
              <Select>
                <Option value={1}>Done</Option>
              </Select>
            </div>
            <div className='row'>
              <Chip name="test" />
              <Chip name="warning" variant='warning' />
              <Chip name="warning" variant='info' />
            </div>
          </CollapseItem>
          <CollapseItem>
            <div className='row'>
              <Checkbox />
              <div className='todo-name'>Select</div>
              <Select>
                <Option value={1}>Done</Option>
              </Select>
            </div>
            <div className='row'>
              <Chip name="test" />
              <Chip name="danger" variant='danger' />
            </div>
          </CollapseItem>
          <CollapseItem>
            <div className='row'>
              <Checkbox />
              <div className='todo-name'>Checkbox</div>
              <Select>
                <Option value={1}>Done</Option>
              </Select>
            </div>
            <div className='row'>
              <Chip name="test" />
              <Chip name="warning" variant='info' />
            </div>
          </CollapseItem>
          <CollapseItem>
            <div className='row'>
              <Checkbox />
              <div className='todo-name'>Todo</div>
              <Select>
                <Option value={1}>Done</Option>
              </Select>
            </div>
            <div className='row'>
            </div>
          </CollapseItem>
        </Collapse>        
        <Collapse title='OTHERS'>
          {[...Array(8)].map((_, c)=><CollapseItem  className='row' key={c}><Checkbox /><div>TEST</div><Select><Option value="1">test</Option></Select></CollapseItem>)}
        </Collapse>
    </div>
  )
}

export default Todo