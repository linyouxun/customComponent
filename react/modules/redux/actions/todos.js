export const addTodo = text => {
  console.log('ADD_TODO');
  return {
    type: 'ADD_TODO',
    text
  };
};
