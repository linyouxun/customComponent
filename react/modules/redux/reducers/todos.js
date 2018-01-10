const todos = (state = {text: ''}, action) => {
  console.log('type:', action.type);
  switch (action.type) {
    case 'ADD_TODO': {
      return {text: action.text};
    }
    default:
      return state;
  }
};

export default todos;
