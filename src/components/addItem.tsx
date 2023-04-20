import React, { useEffect, useRef, useState } from "react";

import "./addItem.css";
import { AddItemArgumentProps } from "../utility/types/itemTypes";

interface AddItemProps {
  addItem: ({ item, quantity }: AddItemArgumentProps) => void;
}

const AddItem: React.FC<AddItemProps> = (props) => {
  const ItemInputRef = useRef<HTMLInputElement>(null);
  const QuantityInputRef = useRef<HTMLInputElement>(null);

  const [invalidQuantityAlert, setInvalidQuantityAlert] =
    useState<boolean>(false);

  const addItemSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const item: string = ItemInputRef.current!.value!;
    const quantity: number = +QuantityInputRef.current!.value!;
    if (quantity <= 0) {
      return setInvalidQuantityAlert(true);
    }
    setInvalidQuantityAlert(false);
    props.addItem({ item, quantity });
  };

  useEffect(() => {
    let id: number;
    if (invalidQuantityAlert) {
      id = +setTimeout(() => setInvalidQuantityAlert(false), 3000);
    }
    return () => clearTimeout(id);
  }, [invalidQuantityAlert]);

  return (
    <section>
      <section className="checkList">
        <h1>Checklist</h1>
      </section>
      <form onSubmit={addItemSubmitHandler}>
        <div className="form-control">
          <label htmlFor="item-text">Item</label>
          <input type="text" id="item-text" ref={ItemInputRef} />
          <label className="mt-10" htmlFor="item-quantity">
            Quantity
          </label>
          <input type="number" id="item-quantity" ref={QuantityInputRef} />
          {invalidQuantityAlert && (
            <span className="alert mt-10">Please enter a valid quantity</span>
          )}
          <button className={"mt-10 addButton"} type="submit">
            Add Item
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddItem;
