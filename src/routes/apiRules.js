var security = {
  urls: {
    "/api/v1/users/me": {
      authentication: true,
      methods: {
        GET: {},
        POST: {},
        DELETE: {
          params: {
            password: {
              mandatory: true
            }
          }
        }
      }
    },
    "/api/v1/productmap":{
      authentication:true,
      methods:{
        GET:{

        }
      }
    },
    "/api/v1/settings":{
      authentication:true,
      methods:{
        GET:{
          
        },
        PATCH:{
          
        }
      }
    },
    "/api/v1/todos":{
      authentication:true,
      methods:{
        GET:{
          
        },
        POST:{
          
        }
      }
    }
  }
};
export default security;