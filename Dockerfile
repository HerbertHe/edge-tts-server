FROM node:alpine

# 安装 python 环境
RUN apk add --no-cache python3 py3-pip

WORKDIR /app
COPY . /app

# 运行 node
RUN yarn install
RUN yarn build

# 创建虚拟环境安装依赖
RUN pip3 install edge-tts --break-system-packages

# 声明端口
EXPOSE 8088

# 运行启动命令
CMD ["yarn", "serve"]