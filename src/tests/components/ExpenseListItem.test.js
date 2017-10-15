import React from 'react';
import {ExpenseListItem} from '../../components/ExpenseListItem';
import {shallow} from 'enzyme';
import expenses from '../fixtures/expenses'

test('should render ExpenseListItem with expense', ()=>{
    const expense=expenses[1];
    const wrapper=shallow(<ExpenseListItem key={expense.id} {...expense}/>);
    expect(wrapper).toMatchSnapshot();
});