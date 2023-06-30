- install pm2 tool: npm install pm2 -g
- using pm2:
    + pm2 start process.json --env development
    + pm2 restart all -> restart api server
    + pm2 logs -> view logs
    + pm2 monit -> start monitoring
    + pm2 ps -a -> get list of processes
    + pm2 stop [process id] -> stop process which has id
    + pm2 delete [process id] -> delete process which has id
