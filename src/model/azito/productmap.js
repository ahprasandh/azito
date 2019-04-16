let mongo = require('../../utils/persistence/mongodb');

class ProductMap {
  constructor() {

  }

  static getMap() {
    return {
      modules: [{

          name: "Dashboard",
          model: "dashboard"
        },
        {
          name: "Todo's",
          model: "todos",
          schema: '',
          api: {
            getTodos: {
              method: 'GET',
              url: '/api/v1/todos',
              params: {
                top: 0,
                limit: 100
              }
            }
          },
          init: 'getTodos'

        },
        {

          name: "Expenses",
          model: "expenses"

        }
      ],
      init: 'getSettings',
      api: {
        getSettings: {
          url: '/api/v1/settings',
          method: 'GET'
        }
      }
    }
  }
}

export default ProductMap