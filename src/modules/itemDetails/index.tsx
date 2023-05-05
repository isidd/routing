import React, { useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { fetchItemDetails } from "../../store/itemReducer";
import { useSelector, useDispatch } from "react-redux";

const ItemDetails = () => {
  const { itemDetails } = useSelector((state: any) => state.item);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchItemDetails(id));
  }, [dispatch, id]);

  return (
    <Grid container justifyContent={"center"}>
      <Grid xs={12} item padding={12}>
        <Typography variant="h4">This is Item Details page</Typography>
        <Typography sx={{ mt: 2 }}>Item Name: {itemDetails?.item}</Typography>
        <Typography sx={{ mt: 2 }}>
          Item Quantity: {itemDetails?.quantity}
        </Typography>
        <Typography sx={{ mt: 2 }}>
          Item Description: {itemDetails?.description}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ItemDetails;

// export const getItemsDetails = async ({ request, params }: any) => {
//   if (!getToken()) return redirect("/login");
//   store.dispatch(itemAction.loading());
//   let response = await fetch(`http://localhost:5000/itemDetails/${params.id}`);
//   let res = await response.json();
//   store.dispatch({
//     type: "ITEM_DETAILS",
//     payload: res,
//   });
//   store.dispatch(itemAction.loading());
//   if (response.ok) return res;
// };
