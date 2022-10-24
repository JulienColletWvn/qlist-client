import { all, takeEvery } from "redux-saga/effects";

export const createUser = {
  type: "CREATE_USER",
  action: function (payload: { name: string }) {
    return {
      type: this.type,
      payload,
    };
  },
  _saga: function* () {
    yield takeEvery(this.type, function* () {});
  },
};

export default function* () {
  yield all([createUser._saga()]);
}
