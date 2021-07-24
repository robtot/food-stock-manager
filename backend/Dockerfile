FROM node:10-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --only=prod

COPY src/ src/

EXPOSE 3000
CMD [ "npm", "start"]
