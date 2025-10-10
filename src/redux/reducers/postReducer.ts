const initialState = {
  postsByCategory: []
};

export const postReducer = (state = initialState, action: any) => {
  switch(action.type) {
    case 'SET_POSTS_BY_CATEGORY':
      return { ...state, postsByCategory: action.payload };
    default:
      return state;
  }
};
