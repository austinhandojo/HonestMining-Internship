FROM keymetrics/pm2:10-alpine

# Bundle APP files
#COPY src src/
#COPY package.json .
#COPY ecosystem.config.js .
RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . .

#RUN apk update && apk upgrade \
#       && apk add --no-cache git \
#       && apk --no-cache add --virtual builds-deps build-base python \
#       && npm install -g nodemon npm-run-all node-gyp node-pre-gyp && npm install\
#       && npm rebuild bcrypt --build-from-source

RUN apk update
RUN apk upgrade
RUN apk add --no-cache-git
RUN apk --no-cache add --virtual builds-deps build-base python
RUN npm install -g nodemon npm-run-all node-gyp node-pre-gyp
RUN npm install yarn -g
RUN npm rebuild node-sass
RUN yarn install
#RUN npm rebuild bcrypt --build-from-source
RUN yarn run build
# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
#RUN npm install --production

# Expose the listening port of your app
EXPOSE 3000

# Show current folder structure in logs
#RUN ls -al -R

CMD [ "pm2-runtime", "start", "ecosystem.config.js", "--only", "mnfe-dev" ]