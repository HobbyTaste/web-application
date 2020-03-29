FROM node:10
WORKDIR /front-server
COPY ./package.json .
RUN ["yarn"]
COPY ./frontServer ./frontServer
COPY ./webpack.config.js .
COPY ./static ./static
COPY ./config ./config
COPY ./.babelrc .
COPY ./tsconfig.json .
RUN ["yarn", "build:front"]
CMD ["yarn", "start:front"]
