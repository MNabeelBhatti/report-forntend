import { AUTH } from "../../utils/constants/auth";
const INIT_STATE = {
  key: "",
  session: null,
}
const reducerFunc = (state = INIT_STATE, action) => {
  switch (action.type) {
    case AUTH: {
      return {
        ...state,
        key: action.payload.key,
        session: action.payload.session,
      }
    }
    default: {
      return state;
    }
  }
}
export default reducerFunc;
