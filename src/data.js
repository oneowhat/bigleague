import Vue from 'vue';
import config from '../config/config.js';

var http = Vue.http;

exports.campaign = {
  byTitle: function(title, success, failure) {
    http.get(config.api + '/api/campaign/' + title)
      .then((response) => {
        success(response);
      }, (response) => {
        failure(response);
      });
  }
}
