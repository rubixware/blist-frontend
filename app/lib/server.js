var $ = require('jquery');

var Server = {
  getDefaultHeaders: function(){
    return {
      "Accept": "application/json",
      "Accept": "application/vnd.blistapi.v1"
    };
  },
  get: function(url, data, callback, type){
    if ( $.isFunction(data) ){
      type = type || callback,
      callback = data,
      data = {}
    }

    return $.ajax({
      url: url,
      headers: this.getDefaultHeaders,
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
      headers: this.getDefaultHeaders,
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
      headers: this.getDefaultHeaders,
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
      headers: this.getDefaultHeaders,
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
      headers: this.getDefaultHeaders,
      type: 'DELETE',
      success: callback,
      data: data,
      contentType: type
    });
  }
};

module.exports = Server
