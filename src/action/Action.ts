import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { RootState } from "../config/Store";
import { AnyAction } from "redux";

interface ReduxData {
  type: string;
  value: any;
}

export const setDataInRedux =
  (data: ReduxData): ThunkAction<void, RootState, unknown, AnyAction> =>
    async (
      dispatch: ThunkDispatch<RootState, unknown, AnyAction>
    ): Promise<void> => {
      dispatch({
        type: data.type,
        payload: data.value,
      });
    };

export const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAIL = "USER_LOGIN_FAIL";
export const USER_LOGOUT = "USER_LOGOUT";