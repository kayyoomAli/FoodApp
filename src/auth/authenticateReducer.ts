const initialState = {
  UserEmail: '',
  AdminEmail: '',
};
const AuthenticateReducer = (state = initialState, action: any) => {
  const {type, payload} = action;
  // console.log('Auth reducer>>>', payload);
  switch (type) {
    case 'User_Data':
      return {...state, UserEmail: payload};
    case 'Admin_Data':
      return {...state, AdminEmail: payload};
    default:
      return state;
  }
};

export default AuthenticateReducer;
