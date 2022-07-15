import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {  useSelector } from "react-redux";

const operation_success = () => {

  const selector = useSelector((state) => state.user);

  const router = useRouter();
/*   const [amount, setAmount] = useState("");
  const [id, setId] = useState("");
  const [operation, setOperation] = useState(""); */
  useEffect(() => {
    console.log(selector);
/*     setAmount(window.localStorage.getItem("operationAmount"));
    setOperation(window.localStorage.getItem("operation"));
    setId(window.localStorage.getItem("id"));
 */
/*     const intervalId = setInterval(() => {
      router.push("/");
      localStorage.clear();
    }, 10000);
    return () => {
      clearInterval(intervalId);
    }; */
  }, [ selector.amountOperation]);
  return (
    <Box
      sx={{
        border: 2,
        p: 5,
        m: 5,
        height: "650px",
        width: "85%",
        mx: "auto",
        display: "flex",
        borderRadius: "8px",
      }}
    >
      <Typography
        className="item--center"
        sx={{ m: 10, px: 16, my: "auto" }}
        align="center"
        variant="h3"
        gutterBottom
      >
        Su {selector.operation} de monto "
        {selector.amountOperation ? parseFloat(selector.amountOperation).toLocaleString("en") : 0} ", en la cuenta
        N° {selector.id}, fue realizado con éxito.{" "}
      </Typography>
    </Box>
  );
};
export default operation_success;
