import React from 'react'

const Card = (props) => {
    return <div className="card w-50 rounded-0 shadow">
        <div className="card-body">
            <h5 className="card-title text-center">{props.title}</h5>
            <h3 className="text-center  font-weight-bold" style={{color: props.title ==="INCOME"? "#B6960A":"#2DA3AD"}}>{props.amount}</h3>
        </div>
    </div>

}

export default Card;