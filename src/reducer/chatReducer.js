export const initialState = {
  selectedUser:'',
  messages:{}
}
export const initialChatHistory = {}

export const chatUserStateReducer = (state,action)=>{
  switch(action.type) {
    case 'changed_user':{
      console.log('user select: ',state);
      return {
        ...state,
        'selectedUser':action.selectedUser,
      }
    }
    case 'send_message':{
      // console.log('send');
      return {
        ...state,
        messages:{
          ...state.messages,
          [state.selectedUser]:''
        }
      }
    }
    case 'edited_message':{
      console.log('state',state);
      return {
        ...state,
        messages:{
          ...state.messages,
          [state.selectedUser]:action.message
        }
      }
    }
    default:{
      throw Error('Unknown action: ' + action.type);
    }
  }
}

export const chatHistoryReducer = (state,action)=>{
  switch(action.type){
    case 'new_message':{
      const senderHistory = state[action.sender]?[...state[action.sender]]:[];
      return {
        ...state,
        [action.sender]:[
          ...senderHistory,
          {
            sender:action.sender,
            message:action.message
          }
        ]
      }
    }
    case 'send_message':{
      console.log(state[action.selectedUser])
      const prev = state[action.selectedUser]?[...state[action.selectedUser]]:[];
      return {
        ...state,
        [action.selectedUser]:[
          ...prev,
          {
            sender:action.sender,
            message:action.message
          }
        ]
      }
    }
    default : {
      throw Error('Unknown action: ' + action.type)
    }
  }
}