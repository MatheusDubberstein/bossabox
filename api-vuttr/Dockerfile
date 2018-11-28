FROM node:alpine

WORKDIR /usr/app

COPY package*.json ./
RUN npm install

CMD ["npm", "build"]

COPY ./dist .

EXPOSE 3000

CMD ["npm", "start"]
