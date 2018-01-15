FROM node:6-alpine
LABEL org.label-schema.vcs-url="https://github.com/david-kroell/keylog.rest"
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY ["package.json", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 3000
CMD npm start
