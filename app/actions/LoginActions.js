import AppDispatcher from '../dispatchers/AppDispatcher.js';
import AuthService from '../services/AuthService';

export default {
  authenticateUser(username, password) {
    AppDispatcher.dispatch({
      actionType: "USER_AUTH_STARTED"
    });
    AuthService.authenticateUser(username, password);
  },

  loginUser() {
    console.log("Login user action has started");
    AppDispatcher.dispatch({
      actionType: "LOGIN_USER"
    });
  },

  // authenticateUser: function(username, password) {
  //   AppDispatcher.dispatch({
  //     actionType: "USER_AUTH_STARTED"
  //   });
  //   AuthService.authenticateUser(username, password);
  // },

  // loginUser: function() {
  //   console.log("Login user action has started");
  //   AppDispatcher.dispatch({
  //     actionType: "LOGIN_USER"
  //   });
  // }
}