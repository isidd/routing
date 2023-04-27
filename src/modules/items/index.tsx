import React, { useEffect, useState } from "react";

import ItemList from "./components/itemList";
import AddItem from "./components/addItem";
import {
  AddItemArgumentProps,
  ItemProps,
} from "../.././utility/types/itemTypes";

import { useNavigate, useLoaderData } from "react-router-dom";

const Items: React.FC = (): React.ReactElement => {
  const storedData: any = useLoaderData();
  const [items, setItems] = useState<Array<ItemProps>>(storedData);
  const [activeId, setActiveId] = useState<string>();

  const navigate = useNavigate();

  const addItemHandler = async ({
    item,
    quantity,
    description,
  }: AddItemArgumentProps) => {
    // eslint-disable-next-line array-callback-return
    let existingItem = items.find((prevItems: ItemProps) => {
      if (prevItems.item === item) {
        prevItems.quantity = prevItems.quantity + quantity;
        prevItems.description = description;

        return prevItems;
      }
    });

    const newItem = existingItem
      ? existingItem
      : {
          id: Math.random().toString(),
          item,
          quantity,
          description,
        };

    let newItemList: Array<ItemProps> = [
      ...items.filter((prevItem) => prevItem.item !== item),
      newItem,
    ];

    try {
      let res = await fetch("http://localhost:5000/saveItem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ item: newItem }),
      });
      if (res.ok) setItems(newItemList);
    } catch (err) {}
  };

  const deleteItemHandler = (itemId: string) => {
    setItems((prevItems) => {
      return prevItems.filter((item: ItemProps) => item.id !== itemId);
    });
  };

  const onAddQuantityHandler = (itemId: string) => {
    setActiveId(itemId);
    setItems((prevItems) => {
      return prevItems.filter((item: ItemProps) => {
        if (item.id === itemId) {
          item.quantity = +item.quantity + 1;
        }
        return item;
      });
    });
  };

  const onSubtractQuantityHandler = (itemId: string) => {
    setActiveId(itemId);
    setItems((prevItems) => {
      return prevItems.filter((item: ItemProps) => {
        if (item.id === itemId) {
          item.quantity = +item?.quantity - 1;
        }
        return item;
      });
    });
  };

  useEffect(() => {
    let selectedItem: ItemProps = items.find(
      (item: any) => item.id === activeId
    )!;
    if (selectedItem?.quantity <= 0) {
      deleteItemHandler(selectedItem.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  const redirectHandler = (id: string) => {
    navigate(`/item/${id}`);
  };

  return (
    <div className="App">
      <AddItem addItem={addItemHandler} />
      {items.length > 0 && (
        <ItemList
          items={items}
          onDeleteItem={deleteItemHandler}
          onAddQuantity={onAddQuantityHandler}
          onSubtractQuantity={onSubtractQuantityHandler}
          redirect={redirectHandler}
        />
      )}
    </div>
  );
};

export default Items;

export const getItems = async () => {
  let response = await fetch("http://localhost:5000/getItems");
  if (response.ok) return response.json();
};
