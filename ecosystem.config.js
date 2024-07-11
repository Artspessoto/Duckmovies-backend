module.exports = {
  apps : [{
    name: "app",
    script: "./src/index.js",
    interpreter: "node",
    instances: 1,
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}