import Vue from 'vue';
import config from '../config/config.js';
import {store} from './store.js';

exports.campaign = {
  byTitle: function(title, success, failure) {
     Vue.http.get(config.api + '/api/campaign/' + title)
      .then((response) => {
        success(response);
      }, (response) => {
        failure(response);
      });
  }
}

exports.guilds = {
  all: function(success, failure) {
    if (store.guilds.length === 0) {
      Vue.http.get(config.api + '/api/guilds/')
        .then((response) => {
          var guilds = response.json();
          guilds.forEach(function(guild) {
            store.guilds.push(guild);
          });
          success(guilds);
        }, (response) => {
          failure(response);
        });
    } else {
      success(store.guilds);
    }
  }
}
