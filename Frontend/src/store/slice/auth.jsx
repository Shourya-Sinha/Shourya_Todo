import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoggedIn: false,
  token: "",
  tasks: [],
  user_id: null,
  isLoading: false,
  error: false,
};

const slice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        updateIsLoading(state,action){
            state.error = action.payload.error;
            state.isLoading = action.payload.isLoading;
        },
        logIn(state,action){
            state.isLoggedIn = action.payload.isLoggedIn;
            state.token = action.payload.token;
            state.user_id = action.payload.user_id;
            state.email=action.payload.email;;
        },
        logOut(state,action){
            state.isLoggedIn = false;
            state.token = null;
            state.user_id = null;
            state.email=null;
        },
        updateRegisterEmail(state, action) {
            state.email = action.payload.email;
          },
    }
});

export default slice.reducer;
export const {logOut} = slice.reducer;

export const logoutUser = () => (dispatch) => {
    dispatch(
      slice.actions.logOut({
        isLoggedIn: false,
        token: null,
        user_id: null,
        email: null,

      })
    );
   
  };

  export function LoginUser(formValues) {
    return async (dispatch, getState) => {
      dispatch(slice.actions.updateIsLoading({ isLoading: true, error: false }));
  
      await axios
        .post(
          "http://localhost:3000/api/v1/login",
          { ...formValues },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then(function (response) {
          console.log(response);
          dispatch(
            slice.actions.logIn({
              isLoggedIn: true,
              token: response.data.token,
              user_id: response.data.user_id,
              // user: response.data.user,
               email: response.data.email,
              // error: false,
              // isLoading: false,
            })
          );
          window.localStorage.setItem("user_id", response.data.user_id);
          dispatch(
            slice.actions.updateIsLoading({ isLoading: false, error: false })
          );
        })
        .catch(function (error) {
          console.log(error);
          dispatch(
            slice.actions.updateIsLoading({ isLoading: false, error: true })
          );
        }).finally(() => {
            if (!getState().auth.error) {
              window.location.href = "/";
            }
          });;
    };
  }
  
  export function RegisterUser(formValues) {
    return async (dispatch, getState) => {
      dispatch(slice.actions.updateIsLoading({ isLoading: true, error: false }));
  
      await axios
        .post(
          "http://localhost:3000/api/v1/register",
          { ...formValues },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then(function (response) {
          console.log(response);
          dispatch(
            slice.actions.updateRegisterEmail({ email: formValues.email })
          );
  
          dispatch(
            slice.actions.updateIsLoading({ isLoading: false, error: false })
          );
        })
        .catch(function (error) {
          console.log(error);
          dispatch(
            slice.actions.updateIsLoading({ isLoading: false, error: true })
          );
        })
        .finally(() => {
          if (!getState().auth.error) {
            window.location.href = "/login";
          }
        });
    };
  }
  
  export function ForgotPassword(formValues) {
    return async (dispatch, getState) => {
      dispatch(slice.actions.updateIsLoading({ isLoading: true, error: false }));
  
      await axios
        .post(
          "/forgot-password",
          { ...formValues },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then(function (response) {
          console.log(response);
          dispatch(
            slice.actions.updateIsLoading({ isLoading: false, error: false })
          );
        })
        .catch(function (error) {
          console.log(error);
          dispatch(
            slice.actions.updateIsLoading({ isLoading: false, error: true })
          );
        });
    };
  }
  
