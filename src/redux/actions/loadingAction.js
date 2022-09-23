import {REDUX_CONSTANTS} from '../../constants/reduxConstants';

export function setLoadingStatus(data){
    return{
      type: REDUX_CONSTANTS.SET_LOADING_STATUS,
      payload: {
        status:data
      }
    };
}
