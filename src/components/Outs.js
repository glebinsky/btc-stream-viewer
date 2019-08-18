import React from 'react';

export default function Outs({ items, title, prev }) {
  return (
    <div className="outs">
      <label>{title}</label>
      <ul>
      { items.map((item) => {
        const actualItem = prev ? item.prev_out : item
        return (
          <Item
            key={`${actualItem.tx_index}-${actualItem.n}-${actualItem.value}`}
            item={actualItem}
          />
        )
      })}
      </ul>
    </div>
  );
}

function Item({ item }) {
  return (
    <li>
      <span>Address: {item.addr}</span>&nbsp;&nbsp;
      <span>Value: {item.value}</span>&nbsp;&nbsp;
      <span>Spent: {item.spent ? "YES" : "NO"}</span>
    </li>
  );
}
