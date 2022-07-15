import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import OperationsGridButtons from "../src/components/operationsGridButtons";
import OperationsText from "../src/components/operationsText/index";
import { ModalToCancel } from "../src/components/modalToCancel";
import { useSelector, useDispatch } from "react-redux";

const operations = () => {
  const [name, setName] = useState("");
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const selector = useSelector((state) => state.user);

  useEffect(() => {
    const intervalId = setInterval(() => {
      router.push("/");
      localStorage.clear();
    }, 30000);
    return () => {
      clearInterval(intervalId);
    };
  }, [open]);

  useEffect(() => {
    setName(window.localStorage.getItem("name"));
  }, []);

  return (
    <Box
      sx={{
        border: 2,
        py: 10,
        m: 5,
        width: "80%",
        mx: "auto",
        mt: "100px",
        borderRadius: "8px",
      }}
    >
      <OperationsText name={selector.name} />
      <OperationsGridButtons />
      <Box sx={{ ml: 20 }}>
        <ModalToCancel setOpen={setOpen} open={open} />
      </Box>
    </Box>
  );
  {
  }
};

export default operations;
