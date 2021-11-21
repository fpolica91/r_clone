

FROM node:16.3.0
WORKDIR /app
COPY package.json .
RUN npm install --quiet
COPY . .