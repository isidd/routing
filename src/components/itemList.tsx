import React from "react";

import "./itemList.css";
import { ItemProps } from "../utility/types/itemTypes";

interface ItemListProps {
  items: Array<ItemProps>;
  onDeleteItem: (id: string) => void;
  onAddQuantity: (id: string) => void;
  onSubtractQuantity: (id: string) => void;
}

const ItemList: React.FC<ItemListProps> = (props): React.ReactElement => {
  return (
    <section>
      <section className="checkList">
        <h1>Store</h1>
      </section>
      <ul>
        {props.items.map((item: any) => (
          <li key={item.id}>
            <span>
              <strong>{item.item}</strong>
            </span>
            <span>{"-"}</span>
            <span>{item.quantity}</span>
            <button
              className="plusButton"
              onClick={props.onAddQuantity.bind(null, item.id)}
            >
              +
            </button>
            <button
              className="minusButton"
              onClick={props.onSubtractQuantity.bind(null, item.id)}
            >
              -
            </button>
            <button
              className="removeButton"
              onClick={props.onDeleteItem.bind(null, item.id)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ItemList;
