import { QUERY_ACTION_TYPE_PREFIX } from "./vars";

export const middleware =
  ({ getState, dispatch }) =>
  (next) =>
  (action) => {
    if (
      new RegExp(
        `^${QUERY_ACTION_TYPE_PREFIX}\\/(\\w*)\\/(fetch|mutation)`
      ).test(action.type) &&
      typeof action.payload === "function"
    ) {
      action.payload({ state: getState(), dispatch });
    }

    return next(action);
  };
