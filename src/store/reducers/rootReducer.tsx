/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { IItem } from "../../interface/cart";
const initState = {
  users: [
    { id: 1, name: "quỳnh" },
    { id: 2, name: "nhung" },
  ],
  carts: [] as IItem[],
  orders: [],
};
const rootReducer = (state = initState, action: any) => {
  // state là trạng thái của redux, nơi lưu trữ data của redux
  const product = action.payload;
  console.log(product);
  switch (action.type) {
    case "DELETE_USER":
      console.log(">>>> run into delete user: ", action);
      let users = state.users;
      users = users.filter((item) => item.id !== action.payload.id);
      return {
        ...state,
        users,
      };
    case "CREATE_USER":
      const _id = Math.floor(Math.random() * 100000);
      const user = { id: _id, name: `random-${_id}` };
      return {
        ...state,
        users: [...state.users, user],
      };
    case "ADD_TO_CART":
      return {
        ...state,
        carts: [...state.carts, action.payload],
      };

    case "ADD_ORDER_DETAIL":
      return {
        ...state,
        orders: [...state.orders, action.payload],
      };
    case "DELETE_CART":
      const productItem: any = state.carts.find(
        (item) => item.product_id === product._id
      );
      if (productItem.quantity === 1) {
        return state.carts.filter((item) => item._id !== productItem._id);
      } else {
        return state.carts.map((item) => {
          item._id === productItem._id
            ? { ...item, quantity: item.quantity - 1 }
            : item;
        });
      }
      break;
    default:
      return state;
  }
};
export default rootReducer;
// import handleOrder from "./handleOrder.jsx";
// import handleCart from "./handleCart.jsx";

// import { combineReducers } from "redux";
// const rootReducers = combineReducers({
//   handleOrder,
//   handleCart
// });
// export default rootReducers;
