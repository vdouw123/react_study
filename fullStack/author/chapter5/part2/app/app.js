import { combineReducers, createStore } from 'redux';


// inital states
const initalPostsState = [];

const initalUserState = {
  isLogin: false,
  userData: {

  }
};


// action names
const CREATE_POST = 'CREATE_POST';
const DELETE_POST = 'DELETE_POST';
const USER_LOGIN = 'USER_LOGIN';

// action creators
function createPost(data) {
  return {
    type: CREATE_POST,
    data
  };
}
function deletePost(id) {
  return {
    type: DELETE_POST,
    id
  };
}
function userLogin(data) {
  return {
    type: USER_LOGIN,
    data
  };
}
function posts(state = initalPostsState, action) {
  switch (action.type) {
    case CREATE_POST:
      return [...state, action.data];
    case DELETE_POST:
      return state.filter(post => post.id !== action.id);
    default:
      return state;
  }
}

function user(state = initalUserState, action) {
  switch (action.type) {
    case USER_LOGIN:
      return Object.assign({}, state, {
        isLogin: true,
        userData: action.data
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  posts,
  user
});

const store = createStore(rootReducer);

document.body.innerHTML += '<h2>初始化状态</h2>';

// User login
document.body.innerHTML += '<h2>用户登录</h2>';
store.dispatch(userLogin({ name: 'viking', email: 'viking@v.me' }));
// store.dispatch({type: USER_LOGIN, data: {name: 'viking', email: 'viking@v.me'}});

// create two posts
document.body.innerHTML += '<h2>创建两篇文章</h2>';
store.dispatch(createPost({ id: 1, title: 'new title' }));
// store.dispatch({type: CREATE_POST, data: {id: 1, title: 'new title'}});
store.dispatch(createPost({ id: 2, title: 'the second title' }));
// store.dispatch({type: CREATE_POST, data: {id: 2, title: 'the second title'}});

// delete one post
document.body.innerHTML += '<h2>删除一篇文章</h2>';
store.dispatch(deletePost(1));
// store.dispatch({type: DELETE_POST, id: 1});