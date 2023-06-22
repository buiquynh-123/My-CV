/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { connect } from "react-redux";
interface IUser {
  id: number;
  name: string;
}
class News extends React.Component {
  handleRemoveUser = (user: IUser) => {
    this.props.deleteUserRedux(user);
  };
  handleCreateUser = () => {
    this.props.addUserRedux();
  };
  render(): React.ReactNode {
    console.log("> > check props: " + JSON.stringify(this.props));
    const listUsers = this.props.dataRedux;
    return (
      <div>
        <div>This is News Page</div>
        <div>
          {listUsers &&
            listUsers.length > 0 &&
            listUsers.map((item: IUser, index: number) => {
              return (
                <div key={item.id}>
                  {index + 1} {item.name}
                  <span onClick={() => this.handleRemoveUser(item)}>Xóa</span>
                </div>
              );
            })}
          <button onClick={() => this.handleCreateUser()}>Add new</button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state: { users: IUser }) => {
  return {
    dataRedux: state.users,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    deleteUserRedux: (userDelete: any) =>
      dispatch({ type: "DELETE_USER", payload: userDelete }),
      addUserRedux: () => dispatch({ type: "CREATE_USER" }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(News);
