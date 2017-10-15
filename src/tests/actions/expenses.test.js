import {addExpense, editExpense, removeExpense} from "../../actions/expenses";


//RemoveExpense
test('should setup remove expense action object', ()=>{
    const action = removeExpense({id: '123abc'});
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id:'123abc',
    })
});

//Edit Expense
test('should setup edit expense action object', ()=>{
    const action = editExpense('abc123', {note: 'New note value'});
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: 'abc123',
        updates: {
            note:'New note value'
        }
    })
});

//AddExpense

test('should setup add expenseaction object with provided values', ()=>{
    const expenseDate={
        description:'Rent',
        amount:109500,
        createdAt: 1000,
        note: 'This was last month rent'
    };
    const action = addExpense(expenseDate);
    //uuid가 뭔지를 모르니깐 확인을 못하잖아
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense:{
            ...expenseDate,
            id: expect.any(String)
        }
    })
});
test('should setup add expense action object', ()=>{
    const action = addExpense();
    expect(action).toEqual({
        type:'ADD_EXPENSE',
        expense:{
            id: expect.any(String),
            description: '',
            note:'',
            amount:0,
            createdAt:0
        }
    })
});