FROM node:14
LABEL authors="zhuyimin"

WORKDIR /app
COPY . .
RUN yarn install
EXPOSE 9527
CMD [ "yarn", "run", "serve" ]