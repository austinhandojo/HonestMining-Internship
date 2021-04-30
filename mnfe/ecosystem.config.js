module.exports = {
  apps : [
    {
      name: "mnfe-dev",
      script: "yarn",
      args: "run dev",
      instances: 1,
      autorestart: true,
      watch: true,
      max_memory_restart: '1G',
    },
    {
      name: "mnfe-prod",
      script: "yarn",
      args: "run start",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
    }
  ]
}