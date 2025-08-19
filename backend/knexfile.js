module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      // host: '127.0.0.1',
      // user: 'root',
      // password: '', // ganti sesuai kebutuhan
      // database: 'toko-online-db-1',
      // port: 3306 // ganti sesuai port MySQL jika berbeda
      host: 'bn8mw3fhnkqmwgtwxiak-mysql.services.clever-cloud.com',
      user: 'urqov1gdsrgq4r0y',
      password: 'IumBahlcVvzhJPHn2B6d', // ganti sesuai kebutuhan
      database: 'bn8mw3fhnkqmwgtwxiak',
      port: 3306 // ganti sesuai port MySQL jika berbeda
    },
    migrations: {
      directory: './migrations'
    },
    seeds: {
      directory: './seeds'
    }
  }
};
