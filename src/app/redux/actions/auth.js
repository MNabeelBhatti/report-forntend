import { AUTH } from "../../utils/constants/auth";

export const onAuth = (session) => {
  const key = session ? session?.user?.id : "";
  return dispatch => {
    dispatch({ type: AUTH, payload: { key, session } });
  }
}