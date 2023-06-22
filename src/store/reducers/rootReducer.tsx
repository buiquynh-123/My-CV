/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-explicit-any */
const initState = {
  users: [
    { id: 1, name: "quỳnh" },
    { id: 2, name: "nhung" },
  ],
  carts: [],
  orders: [],
};
const rootReducer = (state = initState, action: any) => {
  // state là trạng thái của redux, nơi lưu trữ data của redux
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
    default:
      return state;
  }
};
export default rootReducer;
