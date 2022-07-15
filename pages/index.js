import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { NumericKeyboard } from "../src/components/numericKeyboard";
import { Box } from "@mui/system";
import { InitialInputsGroup } from "../src/components/initialInitialInputsGroup";
import { validate } from "../src/utils/validate";
import { Typography } from "@mui/material";
import { login } from "../src/services/login";
import { getUser } from "../src/services/product";
import { useDispatch } from "react-redux";
import { setCredit, setName, setTokenId } from "../src/store/actions/user";

export default function InitialView() {
  const dispatch = useDispatch();
  //
  //useStates
  //
  const [isDisabled, setIsDisabled] = useState(true);
  const [inputFocus, setInputFocus] = useState("");
  const [value, setValue] = useState({
    pass: "",
    DNI: "",
    continueButton: false,
  });

  //
  //variables
  //
  const router = useRouter();
  const validatePass = value.pass.length === 4,
    validateDNI = value.DNI.length > 6;

  //
  //useEffects
  //

  useEffect(() => {
    validateDNI && validatePass ? setIsDisabled(false) : setIsDisabled(true);
    setValue({ ...value, continueButton: false });

    const intervalId = setInterval(() => {
      setValue({ ...value, DNI: "", pass: "" });
    }, 20000);
    return () => {
      clearInterval(intervalId);
    };
  }, [value.pass, value.DNI]);

  const getData = (token) => {
    getUser(token).then((response) => {
      dispatch(
        setTokenId({
          id: response.data.products[0]._id,
          token,
        })
      );
      dispatch(
        setName({
          name: response.data.products[0].title,
        })
      );
      dispatch(
        setCredit({
          credit: response.data.products[0].amount,
        })
      );
    });
  };

  useEffect(() => {
    if (value.continueButton) {
      login(value)
        .then((response) => {
          getData(response.data.accesss_token);
          router.push("/operations");
        })
        .catch(function (error) {
          alert("pass o DNI incorrectos");
          console.error(error);
        });
    }
  }, [value.continueButton]);

  //
  //Functions
  //
  const handleClick = (item) => {
    if (inputFocus) {
      setValue({
        ...value,
        [inputFocus]: validate(inputFocus, value, item),
      });

      item === "Borrar" && setValue({ ...value, DNI: "", pass: "" });
      item === "Continuar" && setValue({ ...value, continueButton: true });
    }
  };
  return (
    <>
      <Box className="container__mui">
        <Typography variant="h4" sx={{ ml: 5, mt: 5 }}>
          Cajero Automático TASI
        </Typography>
        <Box sx={{ display: { md: "flex" }, mt: "50px" }}>
          <InitialInputsGroup setInputFocus={setInputFocus} value={value} />
          <Box sx={{ width: "45%", ml: { sm: "100px", md: 0 } }}>
            <NumericKeyboard
              handleClick={handleClick}
              isDisabled={isDisabled}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}
