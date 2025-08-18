module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: '', // ganti sesuai kebutuhan
      database: 'toko-online-db-1',
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
