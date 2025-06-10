export default {
  apps: [{
    name: 'app',
    script: './dist/server/entry.mjs',
    env_production: {
      NODE_ENV: 'production',
    },
  }],
}
