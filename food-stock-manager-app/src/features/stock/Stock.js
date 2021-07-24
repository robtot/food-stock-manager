import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addItem
} from './stockActions.js';
import styles from './Stock.module.css';

function isNormalInteger(str) {
  return /^\+?(0|[1-9]\d*)$/.test(str);
}

export function Stock() {
  const items = useSelector((state) => state.stock.items);
  const dispatch = useDispatch();
  const [itemAmount, setItemAmount] = useState(1);
  const [itemName, setItemName] = useState('test');

  return (
    <div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set item name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <input
          className={styles.textbox}
          aria-label="Set item amount"
          value={ !isNaN(itemAmount) ? itemAmount : '' }
          onChange={(e) => {
            if (isNormalInteger(e.target.value) || e.target.value === '') setItemAmount(parseInt(e.target.value));
          }}
        />
        <button
          className={styles.button}
          disabled={ isNaN(itemAmount) }
          onClick={() => dispatch(addItem(itemName, itemAmount))}
        >
          Add item to stock
        </button>
      </div>
      <div>
        <p>Items in stock</p>
        <div>
          <ul>
            { items.map(item => <li key={item.name}>Name: {item.name}, Amount: {item.amount}</li>) }
          </ul>
        </div>
      </div>
    </div>
  );
}
