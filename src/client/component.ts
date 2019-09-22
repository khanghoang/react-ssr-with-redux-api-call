import React from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import { makeFetchAction } from "redux-api-call";

export const todoAPI = makeFetchAction("FETCH_TODOS", () => ({
  endpoint: "https://jsonplaceholder.typicode.com/todos/1"
}));

const Component = ({ data = {} }) => {
  return <div>{data && data.title}</div>;
};

export default compose(
  connect(
    state => {
      const { dataSelector } = todoAPI;
      return {
        data: dataSelector(state)
      };
    },
    dispatch => ({ dispatch })
  )
)(Component);
