import expensesReducer from '../../reducers/expenses'
import expenses from '../fixtures/expenses'


test('should set default state', ()=>{
    const state=expensesReducer(undefined, {type: '@@INIT'}); //init으로 준거야 {}
    expect(state).toEqual([]);
});

test('should remove expense by id', ()=>{
   const action ={
       type: 'REMOVE_EXPENSE',
       id: expenses[1].id
   };
   const state=expensesReducer(expenses, action);
   expect(state).toEqual([expenses[0], expenses[2]])
});

test('should not remove expense if id not fount', ()=>{
    const action ={
        type: 'REMOVE_EXPENSE',
        id: '-1'
    };
    const state=expensesReducer(expenses, action);
    expect(state).toEqual(expenses)
});

//shoud add an expense
test('should add an expense', ()=>{
   const expense={
       id: '109',
       description: 'Laptop',
       note: '',
       create: 20000,
       amount: 29500
   };
    const action={
       type: 'ADD_EXPENSE',
       expense
       };
   const state=expensesReducer(expenses, action);
   expect(state).toEqual([...expenses, action.expense])
});
//shoud edit an expense
test('should edit an expense', ()=>{
    const amount=122000;
    const action={
        type: 'EDIT_EXPENSE',
        id: expenses[1].id,
        updates:{
            amount
        }
    };
    const state=expensesReducer(expenses, action);
    expect(state[1].amount).toBe(amount)
});
//should not edi expense if expense not found
test('should not edit an expense', ()=>{
    const amount=122000;
    const action={
        type: 'EDIT_EXPENSE',
        id: '-1',
        updates:{
            amount
        }
    };
    const state=expensesReducer(expenses, action);
    expect(state).toEqual(expenses)
});
