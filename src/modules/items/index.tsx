import React, { Suspense, useEffect, useState } from "react";

import ItemList from "./components/itemList";
import AddItem from "./components/addItem";
import {
  AddItemArgumentProps,
  ItemProps,
} from "../.././utility/types/itemTypes";

import {
  useNavigate,
  useLoaderData,
  defer,
  Await,
  useNavigation,
  redirect,
} from "react-router-dom";
import { getToken, isUnauthorized, unAuthUser } from "../../utility/auth/auth";

const Items: React.FC = (): React.ReactElement => {
  const { storedItem }: any = useLoaderData();
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const [items, setItems] = useState<Array<ItemProps>>([]);
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
  };

  const deleteItemHandler = async (itemId: string) => {
    try {
      let token: string = getToken() ?? "";
      let response = await fetch(`http://localhost:5000/delete/${itemId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      let res = await response.json();
      if (isUnauthorized(res.status)) {
        navigate("/login");
        return unAuthUser();
      }
      if (response.ok) {
        setItems((prevItems) => {
          return prevItems.filter((item: ItemProps) => item.id !== itemId);
        });
      }
    } catch (err) {
      console.log(err);
    }
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

  useEffect(() => {
    (async () => {
      setItems(await storedItem);
    })();
  }, [storedItem]);

  const redirectHandler = (id: string) => {
    navigate(`/item/${id}`);
  };

  return (
    <div className="App">
      <AddItem addItem={addItemHandler} />
      <Suspense
        fallback={
          <div style={{ textAlign: "center", marginTop: "10px" }}>
            Loading...
          </div>
        }
      >
        <Await resolve={storedItem}>
          {(storedItem) => {
            return (
              items.length > 0 && (
                <ItemList
                  items={items || storedItem}
                  onDeleteItem={deleteItemHandler}
                  onAddQuantity={onAddQuantityHandler}
                  onSubtractQuantity={onSubtractQuantityHandler}
                  redirect={redirectHandler}
                />
              )
            );
          }}
        </Await>
        {isLoading && (
          <div style={{ textAlign: "center", marginTop: "10px" }}>
            Loading...
          </div>
        )}
      </Suspense>
    </div>
  );
};

export default Items;

export const getItems = async () => {
  let response = await fetch("http://localhost:5000/getItems");
  if (response.ok) return await response.json();
};

export const loadItems = () => {
  if (!getToken()) return redirect("/login");
  return defer({
    storedItem: getItems(),
  });
};

export const submitItemAction = async ({ request }: any) => {
  const data = await request.formData();
  let token: string = getToken() ?? "";
  let newItem = {
    item: data.get("item"),
    quantity: data.get("quantity"),
    description: data.get("description"),
  };

  let res = await fetch("http://localhost:5000/saveItem", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
    body: JSON.stringify({ item: newItem }),
  });
  let response = await res.json();
  if (isUnauthorized(response.status)) {
    unAuthUser();
  }
  if (res.ok) return response;
};
