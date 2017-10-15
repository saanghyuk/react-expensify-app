import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import { filters, altFilters } from '../fixtures/filters';
import moment from 'moment';

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
    setTextFilter = jest.fn();
    sortByDate = jest.fn();
    sortByAmount = jest.fn();
    setStartDate = jest.fn();
    setEndDate = jest.fn();
    wrapper = shallow(
        <ExpenseListFilters
            filters={filters}
            setTextFilter={setTextFilter}
            sortByDate={sortByDate}
            sortByAmount={sortByAmount}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
        />
    );
});

test('should render ExpenseListFilters correctly', () => {
    expect(wrapper).toMatchSnapshot();
});


test('should render ExpenseListFilters with alt data correctly', ()=>{
    wrapper.setProps({
       filters: altFilters
    });
    expect(wrapper).toMatchSnapshot();
});

//should handle text change
test('should handle text change', ()=>{
    const value='rent';
    wrapper.find('input').simulate('change', {
        target: {value}});
    expect(setTextFilter).toHaveBeenLastCalledWith(value)
});
//should sort by date
test('should sort by date', ()=>{
    const value='date';
    wrapper.setProps({
        filters: altFilters
    });
    wrapper.find('select').simulate('change',{target: {value: value}});
    expect(sortByDate).toHaveBeenCalled();
});
//should sort by amount
test('should sort by Amount', ()=>{
    const value='amount';
    wrapper.setProps({
        filters: altFilters
    });
    wrapper.find('select').simulate('change',{target: {value: value}});
    expect(sortByAmount).toHaveBeenCalled();
});
//should handle date changes
test('should handle date changes', ()=>{
    const startDate=moment(0).add(4, 'years');
    const endDate=moment(0).add(8, 'years');
    const value={startDate, endDate};
    wrapper.find('withStyles(DateRangePicker)').prop('onDatesChange')(value);
    expect(setStartDate).toHaveBeenCalledWith(startDate);
    expect(setEndDate).toHaveBeenCalledWith(endDate);
});
//should handle date focus changes
test('should handle date focus changes', ()=>{
    const calenderFocused = 'endDate';
    wrapper.find('withStyles(DateRangePicker)').prop('onFocusChange')(calenderFocused);
    expect(wrapper.state('calenderFocused')).toBe(calenderFocused)
});