import React from 'react';
import Item from 'components/Item'

export default function Transactions({ transactions }) {
  return (
    <ul className="transaction-list">
      <li className="transaction-headers" key="headers">
        <div className="tx-index">Index</div>
        <div className="tx-n">N</div>
        <div className="tx-prev">Prev</div>
        <div className="tx-spent">Spent</div>
        <div className="tx-value">Value</div>
      </li>
      { transactions.map((item) => {
        const key = Math.floor(Math.random() * Date.now())
        console.log(key, item)
        return (
          <Item
            key={key}
            item={item}
          />
        )
      })}
    </ul>
  )
}
