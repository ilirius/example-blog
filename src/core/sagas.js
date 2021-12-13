import { fork } from "redux-saga/effects";

import { appBlogPageWatch } from "./redux/blog/sagas";

export default function* () {
  yield fork(appBlogPageWatch);
}
