import React from 'react'
import PropTypes from 'prop-types';
import {Button, ButtonGroup} from 'reactstrap'

const FilterController = ({handleFilter}) => (
    <ButtonGroup>
        <Button onClick={() => handleFilter('all')} color='secondary'>
            All
        </Button>
        <Button onClick={() => handleFilter('running')} color='secondary'>
            Running
        </Button>
        <Button onClick={() => handleFilter('completed')} color='secondary'>
            Completed
        </Button>
    </ButtonGroup>
)
FilterController.propTypes = {
    handleFilter: PropTypes.func.isRequired
}

export default FilterController