import {createStore, combineReducers} from 'redux'
import uuid from 'uuid'
//ADD_EXPENSE
const addExpense = (
    {
        description = '',
        note='',
        amount=0,
        createdAt=0 }={}
        )=>({
    type: 'ADD_EXPENSE',
    expense:{
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
});

//REMOVE_EXPENSE
const removeExpense=({id=undefiend}={})=>({
    type:'REMOVE_EXPENSE',
    id
});
//EDIT_EXPENSE
const editExpense=(id, updates)=>({
    type: 'EDIT_EXPENSE',
    id,
    updates
});
//SET_TEXT_FILTER
const setTextFilter=(text='')=>({
    type:'SET_TEXT_FILTER',
    text
});

//SORT_BY_AMOUNT
//SORT_BY_DATE
const sortByAmount=()=> ({
    type:'SORT_BY_AMOUNT'
});
const sortByDate=()=>({
    type: 'SORT_BY_DATE'
});

//SET_START_DATE
const setStartDate=(startDate)=>({
    type: 'SET_START_DATE',
    startDate
});
const setEndDate=(endDate)=>({
    type: 'SET_END_DATE',
    endDate
});
//SET_END_DATE

//Expenses Reducers
const expensesReducerDefaultState=[];
const expensesReducer =(state=expensesReducerDefaultState, action) =>{
    switch(action.type){
        case 'ADD_EXPENSE':
            return [
                ...state,
                action.expense
            ];
        case 'REMOVE_EXPENSE':
            return state.filter(({id})=>
                id !== action.id
            );
        case 'EDIT_EXPENSE':
            return state.map((expense)=>{
                if(expense.id===action.id){
                    return {
                        ...expense,
                        ...action.updates //들어온 애들 업데이트 시켜 줌
                    }
                }else{
                    return expense;
                }
            });
        default:
            return state;
    }
};

const filtersReducerDefaultState={
    text :'',
    sortBy :'date',
    startDate: undefined,
    endDate: undefined
};
const filtersReducer=(state=filtersReducerDefaultState, action)=>{
    switch(action.type){
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            };
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            };
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            };
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            };
        case 'SET_END_DATE':
            return {
                ...state, //object나열
                endDate : action.endDate
            };
        default:
            return state
    }
};

//timestamps (meliseconds)
//January 1st 1970 (unix epoch) --이게 타임스탬프의 0이야
//33400, 10, -203 --> 이런게 타임스템프야
//33400는 저 날 이후로 이만큼 지난거지



//Get visible expenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b)=>{
        if(sortBy ==='date')
        {
            return a.createdAt < b.createdAt ? 1 : -1
        }else if(sortBy ==='amount')
        {
            return a.amount > b.amount ? 1 : -1
        }
    })
};

const store=createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
);

store.subscribe(()=>{
   const state=store.getState();
   const visibleExpenses=getVisibleExpenses(state.expenses, state.filters);
   console.log(visibleExpenses)
});


const expenseOne=store.dispatch(addExpense({ description: 'Rent', amount: 100, createdAt: 1000}));
const expenseTwo=store.dispatch(addExpense({ description: 'Coffee', amount: 300, createdAt: -1000}));
// console.log('one', expenseOne);
// console.log('two', expenseTwo);
// const expenseThree=store.dispatch(removeExpense({id: expenseOne.expense.id}));
// console.log('three', expenseThree);
//
//
store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500}));

// store.dispatch(setTextFilter());

store.dispatch(sortByAmount()); //amount
// store.dispatch(sortByDate()); //date

store.dispatch(setStartDate(0)); //start date 125
// store.dispatch(setStartDate());//undefiend
store.dispatch(setEndDate(1250)); //end date 1250

store.dispatch(setTextFilter('rent'));



const demoState={
    expenses : [{
        id: 'randomString',
        description : 'January Rent',
        note: 'This is was the final payment for that address',
        amount: 54500,
        cretaedAt: 0
    }],

    filters: {
       text: 'rent',
       sortBy: 'amount',
       startDate: undefined,
       endDate: undefined
    }
};
//
// const user={
//     name: 'Jen',
//     age: 24
// };
// console.log({
//     age: 27,
//     ...user,
//     location: 'Philadelphia'
// });
//
