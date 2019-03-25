// Uses webtask.io
// To create a server, navigate to the /stripe folder and enter the following code on the CLI:
// wt create stripe.js --secret elistripelive=STRIPELIVESECRET --parse-body --meta 'wt-node-dependencies'='{"stripe":"6.20.0"}'
// Then add the resulting URL to the Stripe url in the index.js file.
module.exports = (body, callback) => {

  var stripe = require('stripe')(body.secrets.elistripelive)
  
  const updateCustomer = ({ customer, final }) => {
    const { description, id } = customer
    if (description) {
      const cleanDescription = description.substring(0, description.lastIndexOf(' <'))
        ? description.substring(0, description.lastIndexOf(' <'))
        : description
      stripe.customers.update(
        id,
        {
          description: cleanDescription
        }
      )
        .then(() => {
          if (final) {
            callback(null, { done: true })
          }
        })
    }
  }

  let lastCustomer = ''
  // 1 - 100
  stripe.customers.list(
    { limit: 100 },
    (err, customers) => {
      customers.data.forEach(customer => {
        updateCustomer({ customer })
        lastCustomer = customer.id
      })
      // 101 - 200
      stripe.customers.list(
        { limit: 100, starting_after: lastCustomer },
        (err, customers) => {
          customers.data.forEach(customer => {
            updateCustomer({ customer })
            lastCustomer = customer.id
          })
          // 201 - 300
          stripe.customers.list(
            { limit: 100, starting_after: lastCustomer },
            (err, customers) => {
              customers.data.forEach(customer => {
                updateCustomer({ customer })
                lastCustomer = customer.id
              })
              // 301 - 400
              stripe.customers.list(
                { limit: 100, starting_after: lastCustomer },
                (err, customers) => {
                  customers.data.forEach(customer => {
                    updateCustomer({ customer })
                    lastCustomer = customer.id
                  })
                  // 401 - 500
                  stripe.customers.list(
                    { limit: 100, starting_after: lastCustomer },
                    (err, customers) => {
                      customers.data.forEach(customer => {
                        updateCustomer({ customer })
                        lastCustomer = customer.id
                      })
                      // 501 - 600
                      stripe.customers.list(
                        { limit: 100, starting_after: lastCustomer },
                        (err, customers) => {
                          customers.data.forEach(customer => {
                            updateCustomer({ customer })
                            lastCustomer = customer.id
                          })
                          // 601 - 700
                          stripe.customers.list(
                            { limit: 100, starting_after: lastCustomer },
                            (err, customers) => {
                              customers.data.forEach(customer => {
                                updateCustomer({ customer })
                                lastCustomer = customer.id
                              })
                              // 701 - 800
                              stripe.customers.list(
                                { limit: 100, starting_after: lastCustomer },
                                (err, customers) => {
                                  customers.data.forEach(customer => {
                                    updateCustomer({ customer })
                                    lastCustomer = customer.id
                                  })
                                  // 801 - 900
                                  stripe.customers.list(
                                    { limit: 100, starting_after: lastCustomer },
                                    (err, customers) => {
                                      customers.data.forEach(customer => {
                                        updateCustomer({ customer })
                                        lastCustomer = customer.id
                                      })
                                      // 901 - end
                                      stripe.customers.list(
                                        { limit: 100, starting_after: lastCustomer },
                                        (err, customers) => {
                                          customers.data.forEach(customer => {
                                            updateCustomer({ customer, final: true })
                                            lastCustomer = customer.id
                                          })
                                        }
                                      )

                                    }
                                  )

                                }
                              )

                            }
                          )

                        }
                      )

                    }
                  )

                }
              )

            }
          )

        }
      )

    }
  )

}
