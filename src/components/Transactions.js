import React from 'react';
import Item from 'components/Item'

export default function Transactions({ transactions }) {
  return (
    <ul className="transaction-list">
      <li className="transaction-headers" key="headers">
        <div className="tx-index">Index</div>
        <div className="tx-prev">Prev</div>
        <div className="tx-spent">Spent</div>
        <div className="tx-value">Value</div>
      </li>
      { transactions.map((item, index) => {
        // console.log(item)
        return (
          <Item
            key={`${item.tx_index}-${item.value}`}
            item={item}
            index={index}
          />
        )
      })}
    </ul>
  )
}
