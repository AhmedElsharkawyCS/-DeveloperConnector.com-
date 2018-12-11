import {CURRENT_USER} from '../types'
import isEmpty from '../../validations/isEmpty';

const initialState={
    userAuth:false,
    user:{}
}
export default function(state=initialState,action){
    switch (action.type) {
        case CURRENT_USER:
            return{
                ...state,
                userAuth:!isEmpty(action.payload),
                user:action.payload
            }
        default:
            return state;
    }
  
}
