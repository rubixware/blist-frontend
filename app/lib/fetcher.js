export default class Fetcher {

  static headers(){
    return {
      'Accept': 'application/json',
      'Accept': 'application/vnd.blistapi.v1',
      'Content-Type': 'application/json'
    }
  }

  static errorHandler(response){
    if (response.status >= 200 && response.status < 300) {
      return response
    } else {
      var error = new Error(response.statusText)
      error.response = response
      throw error
    }
  }

  static jsonParser(response){
    return response.json()
  }

  static simpleFetch(route, content, success, error){
    fetch(route, content)
    .then(Fetcher.errorHandler)
    .then(Fetcher.jsonParser)
    .then(success)
    .catch(error)
  }
  static get(route, success, error){
    const content = {
      method: 'get',
      headers: Fetcher.headers()
    }
    Fetcher.simpleFetch(route, content, success, error)
  }

  static post(route, body, success, error){
    const content = {
      method: 'post',
      headers: Fetcher.headers(),
      body: body
    }
    Fetcher.simpleFetch(route, content, success, error)
  }

  static put(route, body, success, error){
    const content = {
      method: 'put',
      headers: Fetcher.headers(),
      body: body
    }
    Fetcher.simpleFetch(route, content, success, error)
  }

  static patch(route, body, success, error){
    const content = {
      method: 'patch',
      headers: Fetcher.headers(),
      body: body
    }
    Fetcher.simpleFetch(route, content, success, error)
  }

  static patch(route, body, success, error){
    const content = {
      method: 'patch',
      headers: Fetcher.headers(),
      body: body
    }
    Fetcher.simpleFetch(route, content, success, error)
  }

}
