import {store} from './store';

function setAuthToken(token, email) {
  var user = JSON.stringify({
    email: email,
    token: token
  });
  localStorage.setItem('bluser', user);
  store.user.token = token;
  store.user.authenticated = true;
}

exports.login = function(token, email) {
  setAuthToken(token, email);
};

exports.getAuthToken = function() {
  var user = localStorage.getItem('bluser');
  if(user) {
    user = JSON.parse(user);
    return 'Bearer ' + user.token;
  }
  return '';
};

exports.checkAuth = function() {
  var user = localStorage.getItem('bluser');
  if(user) {
    user = JSON.parse(user);
    setAuthToken(user.token, user.email);
  }
}

exports.logout = function() {
  localStorage.removeItem('bluser');
  store.user.token = null;
  store.user.email = '';
  store.user.authenticated = false;
};