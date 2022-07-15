import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { NumericKeyboard } from "../src/components/numericKeyboard";
import ModalAmount from "../src/components/modalsAmount";
import { ModalToCancel } from "../src/components/modalToCancel";
import { editCredit } from "../src/services/product";
import { useDispatch, useSelector } from "react-redux";
import { setOperation, setCredit } from "../src/store/actions/user";

const anothe_amount = () => {
  const [amount, setAmount] = useState("");
  const router = useRouter();
  const [isDisabled, setIsDisabled] = React.useState(true);
  const [continueButton, setcontinueButton] = useState(false);
  const [open, setOpen] = useState(false);
  const [openCancelModal, setOpenCancelModal] = useState(false);
  const selector = useSelector((state) => state.user);
  const dispatch = useDispatch();

  //
  //Functions
  //
  const handleClick = (item) => {
    item !== "Continuar" && setAmount(amount + item?.toString(10));

    item === "Borrar" && setAmount("");
    item === "Continuar" && setcontinueButton(true);
  };

  //
  //useEffects
  //
  useEffect(() => {
    const intervalId = setInterval(() => {
      router.push("/");
    }, 30000);
    return () => {
      clearInterval(intervalId);
    };
  }, [amount, openCancelModal, open]);

  useEffect(() => {
    if (continueButton && parseInt(selector.credit) >= parseInt(amount)) {
      let newCredit = parseInt(selector.credit) - parseInt(amount);
      editCredit(selector.id, selector.token, newCredit)
        .then((response) => {
          dispatch(
            setCredit({
              credit: newCredit,
            })
          );

          dispatch(
            setOperation({
              amountOperation: amount,
              operation: "extracción",
            })
          );
          router.push("/operation_success");
        })
        .catch(function (error) {
          console.error(error);
        });
    } else if (continueButton) {
      setOpen(true);
      setcontinueButton(false);
    }
  }, [continueButton]);

  useEffect(() => {
    amount == 0 || amount === "" ? setIsDisabled(true) : setIsDisabled(false);
  }, [amount]);

  return (
    <>
      <ModalAmount open={open} setOpen={setOpen} />
      <Box sx={{ mt: 5, mx: 10, border: 2, p: 5, borderRadius: "8px" }}>
        <Typography align="center" variant="h4" sx={{ my: 5 }}>
          Otro monto{" "}
        </Typography>
        <Box sx={{ display: "flex" }}>
          <Box sx={{ width: "45%", p: 1, ml: 10, mr: 10 }}>
            <Typography align="center" variant="h3" gutterBottom>
              $ {amount ? parseFloat(amount).toLocaleString("en") : 0}{" "}
            </Typography>
            <Box sx={{ mt: 20 }}>
              <ModalToCancel
                setOpen={setOpenCancelModal}
                open={openCancelModal}
              />
            </Box>
          </Box>
          <Box sx={{ width: "45%" }}>
            <NumericKeyboard
              handleClick={handleClick}
              isDisabled={isDisabled}
            />
          </Box>
        </Box>
      </Box>{" "}
    </>
  );
};
export default anothe_amount;
