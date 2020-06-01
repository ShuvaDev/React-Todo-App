import React from 'react'
import PropTypes from 'prop-types'
import {Label, CustomInput} from 'reactstrap'

const ViewController = ({view, changeView}) => (
    <div className='d-flex'>
        <Label for='list-view'>
            <CustomInput
                type='radio'
                name='view'
                id='list-view'
                value='list'
                onChange={changeView}
                className='d-inline-block'
                checked={view === 'list'}
            /> List View
        </Label>
        <Label for='table-view' className='ml-3'>
            <CustomInput
                type='radio'
                name='view'
                id='table-view'
                value='table'
                onChange={changeView}
                className='d-inline-block'
                checked={view === 'table'}
            />
        </Label> Table View
    </div>
)
ViewController.propTypes = {
    view: PropTypes.string.isRequired,
    changeView: PropTypes.func.isRequired
}

export default ViewController