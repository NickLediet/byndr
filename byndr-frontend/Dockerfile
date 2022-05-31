FROM node:18-alpine as base
WORKDIR /usr/src/app

COPY . ./
EXPOSE 3000


RUN npm install

# Running the app
CMD [ "npm", "start" ]