/* import { GET_SAMPLE, SAMPLE_ERROR } from "../types";
 */
const initialState = {
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MmM0NjBiMWE2YjRkYjJkMWNiMmExN2IiLCJ1c2VybmFtZSI6IjExMTExMTExIiwiY3JlYXRlZEF0IjoiMjAyMi0wNy0wNVQxNjowMjo1Ny41MDFaIiwiaWF0IjoxNjU3ODkzODc1LCJleHAiOjE2NTc5MTU0NzV9.ZExJx4zNOLw9vbdEdjBy0HS4zY1XxMuZ4HekME9jEQc",
  name: "sinNombre",
  credit: 1000,
  amountOperation: 0,
  operation: "SinOperacion",
  id: "62c317d7b6386828e03cdc0b",
};

/* 
const initialState = {
  token: "",
  name: "No Data",
  credit: 0,
  amountOperation:0,
  operation: "No Data",
  id: "No Data",
};
*/

const user = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CREDIT":
      return {
        ...state,
        credit: action.data.credit,
      };
    case "SET_OPERATION":
      return {
        ...state,
        operation: action.data.operation,
        amountOperation: action.data.amountOperation,
      };
    case "SET_NAME":
      return {
        ...state,
        name: action.data.name,
      };
    case "SET_TOKEN_ID":
      return {
        ...state,
        token: action.data.token,
        id: action.data.id,
      };
    default:
      return state;
  }
};

export default user;
