import { Map } from 'immutable';
import { getToken } from '../../helpers/utility';
import actions from './actions';
import { persistor } from "../../dashApp";

const initState = new Map({
  idToken: '',
    user: {},
    userInfo: {}
});

export default function authReducer(
  state = initState.merge(getToken()),
  action
) {
  switch (action.type) {
    case actions.LOGIN_SUCCESS:
      return state.set('idToken', action.token)
                  .set('user', action.profile);
	  case actions.USER_DATA:
	  	return state.set('userInfo', action.data);
      case actions.USER_DATA_UPDATE:
          const { userInfo } = action.payload;
	      return state.set('userInfo', userInfo);
    case actions.LOGOUT:
      return initState;
    default:
      return state;
  }
}
