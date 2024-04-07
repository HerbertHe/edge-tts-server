FROM node:alpine

RUN apk add --no-cache python3 py3-pip
RUN pip3 install edge-tts

WORKDIR /app
COPY . /app

RUN npm install -g yarn
RUN yarn install
RUN yarn build

# 声明端口
EXPOSE 8080

# 运行启动命令
CMD ["yarn", "serve"]