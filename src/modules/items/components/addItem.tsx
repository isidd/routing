import React, { useEffect, useRef, useState } from "react";
import { Typography, TextField, Button } from "@mui/material";

import "./addItem.css";
import { AddItemArgumentProps } from "../../../utility/types/itemTypes";
import { Form, useNavigation } from "react-router-dom";

interface AddItemProps {
  addItem: ({ item, quantity, description }: AddItemArgumentProps) => void;
}

const AddItem: React.FC<AddItemProps> = (props) => {
  const ItemInputRef = useRef<HTMLInputElement>(null);
  const QuantityInputRef = useRef<HTMLInputElement>(null);
  const DescriptionInputRef = useRef<HTMLInputElement>(null);
  const navigation: any = useNavigation();

  const [invalidQuantityAlert, setInvalidQuantityAlert] =
    useState<boolean>(false);

  const addItemSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const item: string = ItemInputRef.current!.value!;
    const quantity: number = +QuantityInputRef.current!.value!;
    const description: string = DescriptionInputRef.current!.value!;

    if (quantity <= 0) {
      return setInvalidQuantityAlert(true);
    }
    setInvalidQuantityAlert(false);
    props.addItem({ item, quantity, description });
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
      <Form method="post">
        <div className="form-control">
          <TextField
            name="item"
            variant="standard"
            helperText="please put your items here"
            label="Item"
            sx={{ width: "20%" }}
            inputRef={ItemInputRef}
          />
          <TextField
            variant="standard"
            name="quantity"
            helperText="please put your quantity here"
            label="Quantity"
            sx={{ width: "20%" }}
            inputRef={QuantityInputRef}
          />
          <TextField
            variant="standard"
            name="description"
            helperText="please put your description here"
            label="Description"
            sx={{ width: "20%" }}
            inputRef={DescriptionInputRef}
            maxRows={2}
            multiline
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
            disabled={navigation.state === "loading"}
          >
            {navigation.state === "loading" ? "Adding..." : "Add Item"}
          </Button>
        </div>
      </Form>
    </section>
  );
};

export default AddItem;
