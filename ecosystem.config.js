module.exports = {
  apps: [{
    name: 'app',
    script: 'dist/server/entry.mjs',
    env: {
      NODE_ENV: 'production',
    },
  }],
}
