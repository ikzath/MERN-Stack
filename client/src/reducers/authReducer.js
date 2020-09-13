import { 
    USER_LOADING,
    USER_LOADED,
    AUTH_ERR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS

 } from '../actions/types';

 const initialState = {
     token: localStorage.getItem('token'),
     isAuthenticated: null,
     isLoading: false,
     user: null

 };

 export default function(state = initialState, action) {
     switch(action.type) {
      case USER_LOADING:
        return{
           ...state,
           isLoading: true
         };
         
      case USER_LOADED:
        return{
           ...state,
           isAuthenticated: true,
           islLoading: false,
           user: action.payload
         };     

        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
             localStorage.setItem('token', action.payload.token);
             return{
                ...state,
                ...action.payload,
                isAuthenticated: true,
                islLoading: false,
              };     

        case LOGIN_FAIL:      
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
        case AUTH_ERR:
          localStorage.removeItem('token');
        return{
           ...state,
           user: null,
           id: null, 
           isAuthenticated: false,
           islLoading: false
         }; 

        default:
            return state 
     }
 }