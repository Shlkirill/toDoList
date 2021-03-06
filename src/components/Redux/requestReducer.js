import { act } from "react-dom/test-utils";
import { apiAddPost, apiDeletPost, apiEditPost, apiGetPosts } from "../../api/api";
import { compose } from "redux";

const GET_POSTS = 'GET_POSTS';
const ADD_POST = 'ADD_POST';
const DELETE_POST = 'DELETE_POST';
const EDIT_POST = 'EDIT_POST';
const LOADING = 'LOADING';

export const getPostsAC = (posts) => ({ type: GET_POSTS, posts });
export const addPostAC = (newPost) => ({ type: ADD_POST, newPost })
export const deletePostAC = (postId) => ({ type: DELETE_POST, postId });
export const editPostAC = (postId, postTittle, postBody) => ({ type: EDIT_POST, postId, postTittle, postBody });
export const loadingAC = () => ({ type: LOADING })

let initialState = {
  postsList: [],
  loadingProcess: false,
}

const requestReducer = (state = initialState, action) => {
  let stateCopy;
  switch (action.type) {
    case GET_POSTS:
      const splitArrayDate= (dateObj) => {

        let dateArray = (dateObj.datePublisher.date.split('.'))
        let dateString = (dateArray[2] + '-' + dateArray[1] + '-' + dateArray[0])
        return dateString + 'T' + dateObj.datePublisher.time
      }
      
      action.posts.sort((a, b) => {
        return new Date(splitArrayDate(b)) - new Date(splitArrayDate(a))})
        
      stateCopy = {
        ...state,
        postsList: action.posts
      }
      return stateCopy;
    case ADD_POST:
      stateCopy = {
        ...state,
      }
      stateCopy.postsList.unshift(action.newPost)
      return stateCopy;
    case DELETE_POST:
      let arrDeleteItem = state.postsList.filter(item => {
        if (item.id !== action.postId) return item
      })
      stateCopy = {
        ...state,
        postsList: arrDeleteItem,
      }
      return stateCopy;
    case EDIT_POST:
      let arrEdit = state.postsList.map(item => {
        if (item.id == action.postId) {
          item.title = action.postTittle
          item.body = action.postBody
          item.datePublisher.edit = true
        }
        return item
      })
      stateCopy = {
        ...state,
        postsList: arrEdit,
      }
      return stateCopy;
    case LOADING:
      stateCopy = {
        ...state,
        loadingProcess: !state.loadingProcess
      }
      return stateCopy
    default:
      return state;
  }
}

export const getPostsTC = () => {
  return (
    async (dispatch) => {
      let response = await apiGetPosts();
      dispatch(getPostsAC(response));
    }
  )
}
export const deletePostTC = (idPost) => {
  return (
    async (dispatch) => {
      dispatch(loadingAC())
      await apiDeletPost(idPost); // Delete to server posts
      dispatch(deletePostAC(idPost));
      dispatch(loadingAC())
    }
  )
}
export const editPostTC = (idPost, postTittle, postBody) => {
  return (
    async (dispatch) => {
      dispatch(loadingAC())
      await apiEditPost(idPost, postTittle, postBody);
      dispatch(editPostAC(idPost, postTittle, postBody))
      dispatch(loadingAC())
    }
  )
}

export const addPostTC = (postTittle, postBody) => {
  return (
    async (dispatch) => {
      dispatch(loadingAC())
      let response = await apiAddPost(postTittle, postBody);
      dispatch(addPostAC(response.data))
      dispatch(loadingAC())
    }
  )
}
export default requestReducer