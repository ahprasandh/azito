var security = {
  urls: {
    "/": {
      authentication: false,
      methods: {
        GET: {}
      }
    },
    "/css/.*": {
      authentication: false,
      methods: {
        GET: {}
      }
    },
    "/js/.*": {
      authentication: false,
      methods: {
        GET: {}
      }
    },
    "/img/.*": {
      authentication: false,
      methods: {
        GET: {}
      }
    },
    "/fonts/.*": {
      authentication: false,
      methods: {
        GET: {}
      }
    },
    "/login": {
      authentication: false,
      methods: {
        GET: {}
      }
    },
    "/auth/login": {
      authentication: false,
      methods: {
        POST: {
          params: {
            userName: {
              regex:"[a-z]+",
              minLength:8,
              maxLength:100,
              mandatory:true
            },
            password: {
              maxLength:100,
              mandatory:true
            },
            serurl: {
              minLength:1,
              maxLength:100,
            }
          }
        }
      }
    },
    "/auth/signup": {
      authentication: false,
      methods: {
        POST: {
          params: {
            userName: {
              regex:"[a-z]+",
              minLength:8,
              maxLength:100,
              mandatory:true
            },
            password: {
              maxLength:100,
              mandatory:true
            },
            serurl: {
              minLength:1,
              maxLength:100,
            },
            displayName:{
              regex:"[a-zA-z]+",
              minLength:1,
              maxLength:100,
              mandatory:true
            }
          }
        }
      }
    },
    "/app": {
      authentication: true,
      methods: {
        GET: {}
      }
    },
    "/accounts": {
      authentication: true,
      methods: {
        GET: {}
      }
    },
    "/auth/logout": {
      authentication: true,
      methods: {
        POST: {}
      }
    },
  }
};
export default security;