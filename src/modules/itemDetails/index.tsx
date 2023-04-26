import React from "react";
import { useParams } from "react-router-dom";

const ItemDetails = () => {
  const params: { itemId: string } = useParams();
  console.log({ params });

  return <>This is Item Details page {params.itemId}</>;
};

export default ItemDetails;
