import { GET_ITEMS, ADD_ITEM, DELETE_ITEMS, ITEMS_LOADING } from './/types';
import axios from "axios";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";


export const getItems = ()=> dispatch => {
    dispatch(setItemsLoading());
    axios.get('api/items').then(res =>
      dispatch({
          type: GET_ITEMS,
          payload: res.data
      })        
    )
    .catch(error =>
        dispatch.returnErrors(error.response.data, error.response.status)
    );     
};

export const deleteItems = id => (dispatch, getState) =>{
    axios.delete(`api/items/${id}`, tokenConfig(getState)).then(res =>
        dispatch({
            type: DELETE_ITEMS,
            payload: id
        })        
      )
      .catch(error =>
        dispatch.returnErrors(error.response.data, error.response.status)
    );  
};

export const addItem = item => (dispatch, getState) =>{
    axios.post('api/items', item, tokenConfig(getState)).then(res =>
        dispatch({
            type: ADD_ITEM,
            payload: res.data
        })        
      )
      .catch(error =>
        dispatch.returnErrors(error.response.data, error.response.status)
    );    
};

export const setItemsLoading = ()=> {
    return {
        type: ITEMS_LOADING
    }
}