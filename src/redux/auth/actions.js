const authActions = {
    LOGIN_REQUEST: 'LOGIN_REQUEST',
    FETCH_USER_DATA: 'GET_USER_DATA',
    USER_DATA: 'USER_DATA',
	USER_DATA_UPDATE: 'USER_DATA_UPDATE',
    LOGOUT: 'LOGOUT',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_ERROR: 'LOGIN_ERROR',
    login: (loginType, email, password, notification, self) => ({
    	type: authActions.LOGIN_REQUEST,
	    payload: {
      		loginType,
      		email,
      		password,
      		notification,
      		self
    	}
    }),
	updateUserData: (userInfo) => ({
		type: authActions.USER_DATA_UPDATE,
		payload: {
			userInfo
		}
	}),
    logout: () => ({
        type: authActions.LOGOUT,
    })
};
export default authActions;
