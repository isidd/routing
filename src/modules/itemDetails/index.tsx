import React from "react";
import { useLoaderData } from "react-router";
import { Grid, Typography } from "@mui/material";

const ItemDetails = () => {
  const data: any = useLoaderData();
  return (
    <Grid container xs={12} justifyContent={"center"}>
      <Grid xs={12} item>
        <Typography variant="h4">This is Item Details page</Typography>
        <Typography sx={{ mt: 2 }}>Item Name {data.item}</Typography>
        <Typography sx={{ mt: 2 }}>Item Quantity {data.quantity}</Typography>
        <Typography sx={{ mt: 2 }}>
          Item Description{data.description}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ItemDetails;

export const getItemsDetails = async ({ request, params }: any) => {
  let response = await fetch(`http://localhost:5000/itemDetails/${params.id}`);
  if (response.ok) return response.json();
};
