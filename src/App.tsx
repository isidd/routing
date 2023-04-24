import React, { useEffect, useState } from "react";

import ItemList from "./components/itemList";
import AddItem from "./components/addItem";
import { AddItemArgumentProps, ItemProps } from "./utility/types/itemTypes";

const App: React.FC = (): React.ReactElement => {
  const [items, setItems] = useState<Array<ItemProps>>([]);
  const [activeId, setActiveId] = useState<string>();

  const addItemHandler = ({ item, quantity }: AddItemArgumentProps) => {
    // eslint-disable-next-line array-callback-return
    let existingItem = items.find((prevItems: ItemProps) => {
      if (prevItems.item === item) {
        prevItems.quantity = prevItems.quantity + quantity;
        return prevItems;
      }
    });

    const newItem = existingItem
      ? existingItem
      : {
          id: Math.random().toString(),
          item,
          quantity,
        };

    let newItemList: Array<ItemProps> = [
      ...items.filter((prevItem) => prevItem.item !== item),
      newItem,
    ];

    setItems(newItemList);
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

  return (
    <div className="App">
      <AddItem addItem={addItemHandler} />
      {items.length > 0 && (
        <ItemList
          items={items}
          onDeleteItem={deleteItemHandler}
          onAddQuantity={onAddQuantityHandler}
          onSubtractQuantity={onSubtractQuantityHandler}
        />
      )}
    </div>
  );
};

export default App;
