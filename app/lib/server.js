var $ = require('jquery');

var Server = {
  get: function(url, data, callback, type){
    if ( $.isFunction(data) ){
      type = type || callback,
      callback = data,
      data = {}
    }

    return $.ajax({
      url: url,
      headers: {
        "Accept": "application/json",
        "Accept": "application/vnd.blistapi.v1"
      },
      type: 'GET',
      success: callback,
      data: data,
      contentType: type
    });
  },
  post: function(url, data, callback, type){
    if ( $.isFunction(data) ){
      type = type || callback,
      callback = data,
      data = {}
    }

    return $.ajax({
      url: url,
      headers: {
        "Accept": "application/json",
        "Accept": "application/vnd.blistapi.v1"
      },
      type: 'POST',
      success: callback,
      data: data,
      contentType: type
    });
  },
  put: function(url, data, callback, type){
    if ( $.isFunction(data) ){
      type = type || callback,
      callback = data,
      data = {}
    }

    return $.ajax({
      url: url,
      headers: {
        "Accept": "application/json",
        "Accept": "application/vnd.blistapi.v1"
      },
      type: 'PUT',
      success: callback,
      data: data,
      contentType: type
    });
  },
  patch: function(url, data, callback, type){
    if ( $.isFunction(data) ){
      type = type || callback,
      callback = data,
      data = {}
    }

    return $.ajax({
      url: url,
      headers: {
        "Accept": "application/json",
        "Accept": "application/vnd.blistapi.v1"
      },
      type: 'PATCH',
      success: callback,
      data: data,
      contentType: type
    });
  },
  delete: function(url, data, callback, type){
    if ( $.isFunction(data) ){
      type = type || callback,
          callback = data,
          data = {}
    }

    return $.ajax({
      url: url,
      headers: {
        "Accept": "application/json",
        "Accept": "application/vnd.blistapi.v1"
      },
      type: 'DELETE',
      success: callback,
      data: data,
      contentType: type
    });
  }
};

module.exports = Server
