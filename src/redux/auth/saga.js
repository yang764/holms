import { all, takeEvery, put, fork, take, cancelled, call} from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { push } from 'react-router-redux';
import { clearToken } from '../../helpers/utility';
import actions from './actions';
import Firebase from '../../helpers/firebase/index';
import { persistor, store } from "../../dashApp";

export function* loginRequest() {
  let isError = false;

  yield takeEvery('LOGIN_REQUEST', function*(action) {

      const { payload: {loginType, email, password, notification, self} } = action;

      Firebase.login(loginType, { email, password })
        .catch(function(result) {
          const message =
            result && result.message ? result.message : 'Sorry Some error occurs';
          notification('error', message);
          self.setState({
            confirmLoading: false
          });
          isError = true;
        })
        .then(function(result) {
          if (isError) {
            return;
          }
          if (!result || result.message) {
            const message =
              result && result.message
                ? result.message
                : 'Sorry Some error occurs';
            notification('error', message);
            self.setState({
              confirmLoading: false
            });
          } else {
            self.setState({
              visible: false,
              confirmLoading: false
            });

          }
      });


      const authEventsChannel = eventChannel( emit => {
          const unsubscribe = Firebase.auth().onAuthStateChanged( user => {
              if(user) {
                  user.exists = true;
                  emit({user});
              }
              else {
                  user = { exists: false };
                  emit({user});
              }
          });
          // return a function that can be used to unregister listeners when the saga is cancelled
          return unsubscribe;
      });

    // then monitor those events in your saga
      try {
          while (true) {
              const { user, profile } = yield take (authEventsChannel);
              if(user) {
                  if(user.exists == true) {
	                  yield put({
		                  type: actions.FETCH_USER_DATA,
		                  user
	                  });
                      break;
                  }
                  else if(user.exists == false) {
                      yield put({
                          type: actions.LOGIN_ERROR
                      })
                  }
                  else {
                      continue;
                  }
              }
          }
        } finally {
          // unregister listener if the saga was cancelled
          if (yield cancelled()) authEventsChannel.close();
        }
    });
}


export function* userData() {
    yield takeEvery(actions.FETCH_USER_DATA, function*(payload) {
	    let userDoc = Firebase.firestore.collection("users").doc(payload.user.uid);


		const data = yield Promise.resolve(userDoc.get().then(doc => {
			if (doc.exists) {
				return doc.data();
			} else {
				// doc.data() will be undefined in this case
				console.log("No such document!");
			}
		}).catch(function(error) {
			console.log("Error getting document:", error);
		}));



	    if(data.activated == true) {
		    yield put({
			    type: actions.LOGIN_SUCCESS,
			    token: payload.user.id,
			    profile: payload.user
		    });
		    yield put({type: "USER_DATA", data: data});
		    yield localStorage.setItem('user_profile', JSON.stringify(data));
		    yield put(push('/dashboard/account'));
        }

        else {
		    yield localStorage.setItem('user_profile', JSON.stringify(data));
	        yield put(push(`/activate/${payload.user.uid}`));
        }



		    // return a function that can be used to unregister listeners when the saga is cancelled

    });

}

export function* loginSuccess() {
  yield takeEvery(actions.LOGIN_SUCCESS, function*(payload) {
    yield localStorage.setItem('id_token', payload.token);
  });
}

export function* loginError() {
  yield takeEvery(actions.LOGIN_ERROR, function*() {});
}

export function* logout() {
  yield takeEvery(actions.LOGOUT, function*() {
      Firebase.auth().signOut().then(function() {
          clearToken();
      }, function(error) {
          console.error('Sign Out Error', error);
      });


	  store.dispatch({
		  type: 'RESET'
	  })

    yield put(push('/'));
  });
}
export default function* rootSaga() {
  yield all([
      fork(loginRequest),
      fork(loginSuccess),
      fork(loginError),
      fork(logout),
      fork(userData)
  ]);
}
