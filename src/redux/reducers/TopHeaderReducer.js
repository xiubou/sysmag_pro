import  {topTypes} from '../actions/TopHeaderAction'

// 顶部
const initialState = {
    rightIsExpand: false
}

// 顶部reducer
export const TopHeaderReducer = (prevState = initialState,action) => {
    switch(action.type){
        case topTypes.CHANGERIGHTISEXPAND:
            let newState = {...prevState}
            newState.rightIsExpand = !newState.rightIsExpand
            return newState
        default:
            return prevState
    }
}

export const changeRightIsExpand = ()=> {return {type: topTypes.CHANGERIGHTISEXPAND}}