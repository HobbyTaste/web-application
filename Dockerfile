FROM node:10

WORKDIR /app

COPY package.json ./

RUN ["yarn", "install", "--set-timeout", "1000000"]

COPY . .

RUN ["yarn", "build"]
CMD ["yarn", "start"]
