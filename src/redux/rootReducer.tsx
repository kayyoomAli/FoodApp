import {combineReducers} from 'redux';
import AuthenticateReducer from '../auth/authenticateReducer';
// import signUpReducer from "../modules/screens/signUp/reducer";
// import verificationReducer from "../modules/screens/verifyOTP/reducer";
const rootReducer = combineReducers({
  // signUpReducer,
  // verificationReducer
  AuthenticateReducer,
});

export default rootReducer;
