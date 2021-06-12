FROM node:latest

WORKDIR /productoverview

COPY package.json  /productoverview/package.json
COPY package-lock.json /productoverview/package-lock.json
COPY . /productoverview/

RUN npm install

EXPOSE 3002

CMD ["npm", "start"]

