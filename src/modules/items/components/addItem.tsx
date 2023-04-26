import React, { useEffect, useRef, useState } from "react";
import { Typography, TextField, Button } from "@mui/material";

import "./addItem.css";
import { AddItemArgumentProps } from "../../../utility/types/itemTypes";

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
        <Typography variant="h5" sx={{ mt: 5 }}>
          Checklist
        </Typography>
      </section>
      <form onSubmit={addItemSubmitHandler}>
        <div className="form-control">
          <TextField
            variant="standard"
            helperText="please put your items here"
            label="Item"
            sx={{ width: "20%" }}
            inputRef={ItemInputRef}
          />
          <TextField
            variant="standard"
            helperText="please put your quantity here"
            label="Quantity"
            sx={{ width: "20%" }}
            inputRef={QuantityInputRef}
          />
          {/* <input type="text" id="item-text" ref={ItemInputRef} /> */}
          {/* <label className="mt-10" htmlFor="item-quantity">
            Quantity
          </label>
          <input type="number" id="item-quantity" ref={QuantityInputRef} /> */}
          {invalidQuantityAlert && (
            <span className="alert mt-10">Please enter a valid quantity</span>
          )}
          <Button
            variant="contained"
            sx={{ mt: 3, width: "10%" }}
            className={"mt-10 addButton"}
            type="submit"
          >
            Add Item
          </Button>
        </div>
      </form>
    </section>
  );
};

export default AddItem;
