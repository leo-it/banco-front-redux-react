import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import InputsOptions from "../src/components/inputsOptions";
import { useSelector } from "react-redux";

const extraction = () => {
  const selector = useSelector((state) => state.user);
/*   const [credit, setCredit] = useState("");
  const [id, setId] = useState("");
  const [token, setToken] = useState("");
 */
  useEffect(() => {
    console.log(selector);
  }, [selector]);

/*   useEffect(() => {
    setCredit(window.localStorage.getItem("amount"));
    setId(window.localStorage.getItem("id"));
    setToken(window.localStorage.getItem("token"));
  }, []); */

  return (
    <Box className="container__mui">
      <div>
          <Typography
        sx={{ mb: 6 }}
        align="center"
        variant="h4"
        gutterBottom
        component="div"
      >
        Extracción
      </Typography>
      <InputsOptions credit={selector.credit} id={selector.id} token={selector.token} />
      </div>
    
    </Box>
  );
};

export default extraction;
