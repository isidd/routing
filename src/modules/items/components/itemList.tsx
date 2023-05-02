import React, { useEffect, useState } from "react";
import { Typography, TextField, Button, styled, css } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import "./itemList.css";
import { ItemProps } from "../../../utility/types/itemTypes";

const StoreText = styled(Typography)(
  () => css`
    margin-top: "20px";
  `
);
interface ItemListProps {
  items: Array<ItemProps>;
  onDeleteItem: (id: string) => void;
  onAddQuantity: (id: string) => void;
  onSubtractQuantity: (id: string) => void;
  redirect: (id: string) => void;
}

const ItemList: React.FC<ItemListProps> = (props): React.ReactElement => {
  const [listList, setList] = useState<ItemProps[]>();
  const [search, setSearch] = useState<string>();

  useEffect(() => {
    setList(props.items);
  }, [props.items]);

  useEffect(() => {
    if (search) {
      let searchedItem = props.items?.filter((item) =>
        item.item.includes(search)
      );
      return setList(searchedItem);
    }
    setList(props.items);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <section>
      <section className="checkList">
        <StoreText variant="h5" sx={{ mt: 3 }}>
          Store
        </StoreText>
      </section>
      <section className="checkList">
        <TextField
          variant="outlined"
          placeholder="Search"
          helperText="Search your item here"
          sx={{ width: "20%", mt: 3 }}
          InputProps={{
            sx: { borderRadius: "50px", height: "40px" },
            startAdornment: <SearchIcon />,
          }}
          onChange={(e) => setSearch(e.target.value)}
        />
      </section>
      <ul>
        {(listList || []).map((item: any) => (
          <li key={item.id}>
            <ChevronRightIcon />
            <span>
              <Typography variant="h6">{item.item}</Typography>
            </span>
            <span>{"-"}</span>
            <span>
              <Typography variant="h6">{item.quantity}</Typography>
            </span>
            <Button
              className="plusButton"
              onClick={props.onAddQuantity.bind(null, item.id)}
              sx={{ color: "green" }}
            >
              <AddIcon height="20px" />
            </Button>
            <Button
              className="minusButton"
              onClick={props.onSubtractQuantity.bind(null, item.id)}
              sx={{ color: "orange" }}
            >
              <RemoveIcon height="20px" />
            </Button>
            <Button
              className="removeButton"
              onClick={props.onDeleteItem.bind(null, item.id)}
              variant="contained"
            >
              Remove
            </Button>
            <Button
              className="removeButton"
              onClick={props.redirect.bind(null, item.id)}
              variant="contained"
            >
              Details
            </Button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ItemList;
