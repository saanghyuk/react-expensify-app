import React from 'react';
import {Link} from 'react-router-dom'


export const ExpenseListItem = ({id, description, amount, createdAt}) => (
    <div>
        <Link to={`/edit/${id}`}>
        <h3>{description}</h3>
        </Link>
        <p>{amount} - {createdAt}</p>
    </div>
);

export default ExpenseListItem


//이거 쓰면 default export까지 되나봐;
//export한 적이 없는데 import가 되네
