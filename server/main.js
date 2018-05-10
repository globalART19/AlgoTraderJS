const PORT = 1337
const server = require('./index')
const { db } = require('./db')

db.sync({ force: false })
  .then(() => {
    server.listen(PORT, () => console.log(`

        Listening on port ${PORT}

        http://localhost:${PORT}/

    `))
  })
