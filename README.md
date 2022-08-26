QQ交流群：785357955

## Install tools
### basic
```console
$ sudo apt install curl wget gcc g++ make nano git -y
```
### nvm
```console
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```
### node
```console
$ nvm install 12
```
### yarn pm2 nodemon 
```console
$ npm install yarn pm2 nodemon -g
```
### set root permission
```console
$ sudo ln -s "$NVM_DIR/versions/node/$(nvm version)/bin/node" "/usr/local/bin/node"
$ sudo ln -s "$NVM_DIR/versions/node/$(nvm version)/bin/npm" "/usr/local/bin/npm"
$ sudo ln -s "$NVM_DIR/versions/node/$(nvm version)/bin/pm2" "/usr/local/bin/pm2"
$ sudo ln -s "$NVM_DIR/versions/node/$(nvm version)/bin/yarn" "/usr/local/bin/yarn"
$ sudo ln -s "$NVM_DIR/versions/node/$(nvm version)/bin/nodemon" "/usr/local/bin/nodemon"
```
## Install nodem_modules
Install the latest using yarn:
```console
$ git clone https://github.com/ApolloRobot/car500-driver-pi.git car500driver
$ cd car500driver
$ yarn 
```

## start
```console
$ sudo pm2 startOrRestart ecosystem.config.js --env development
```
## log
```console
$ sudo pm2 log car-driver
```
## Important System Requirements

This script  only test on hardware on Linux&macOs.