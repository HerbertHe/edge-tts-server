# edge-tts-server

[![Docker Build](https://img.shields.io/docker/automated/herberthe0229/edge-tts-server?style=flat-square)](https://hub.docker.com/r/herberthe0229/edge-tts-server)
[![Docker Version](https://img.shields.io/docker/v/herberthe0229/edge-tts-server/latest?style=flat-square)](https://hub.docker.com/r/herberthe0229/edge-tts-server)
[![Docker Image](https://img.shields.io/docker/image-size/herberthe0229/edge-tts-server/latest?style=flat-square)](https://hub.docker.com/r/herberthe0229/edge-tts-server)
[![Docker Pulls](https://img.shields.io/docker/pulls/herberthe0229/edge-tts-server?style=flat-square)](https://hub.docker.com/r/herberthe0229/edge-tts-server)
[![Docker Stars](https://img.shields.io/docker/stars/herberthe0229/edge-tts-server?style=flat-square)](https://hub.docker.com/r/herberthe0229/edge-tts-server)

Deploy [edge-tts](https://github.com/rany2/edge-tts) with docker.

## Getting Started

### Docker

You can directly use docker image:

```shell
docker run -p 8088:8088 herberthe0229/edge-tts-server
```

### Nodejs

First, you need to setup python environment.

Then, run the following commands:

- install dependencies: `yarn install`
- build scripts: `yarn build`
- create python venv: `python3 -m venv .venv`
- activate venv: `source .venv/bin/activate`
- install `edge-tts`: `pip3 install edge-tts`
- run server: `yarn serve`

## API

| Method | Path      | Query                     | Description                |
| ------ | --------- | ------------------------- | -------------------------- |
| GET    | `/voices` | `search`(optional)        | Get all supported voices   |
| GET    | `/tts`    | `text`, `voice`(required) | Convert text to speech     |
| GET    | `/clean`  | `secret`(required)        | Clean the exised mp3 files |

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=HerbertHe/edge-tts-server&type=Date)](https://star-history.com/#HerbertHe/edge-tts-server&Date)

## LICENSE

GPL-3.0 &copy; Herbert He
