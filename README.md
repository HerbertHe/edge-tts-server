# edge-tts-server

Deploy [edge-tts](https://github.com/rany2/edge-tts) with docker.

## Getting Started

### Docker

You can directly use docker image:

```shell
docker run -p 8088:8088 herberthe0229/edge-tts-server
```

### Nodejs

First, you need to setup python environment.

Then, run the following command:

- install dependencies: `yarn install`
- build scripts: `yarn build`
- create python venv: `python3 -m venv .venv`
- activate venv: `source .venv/bin/activate`
- install `edge-tts`: `pip3 install edge-tts`
- run server: `yarn serve`

## LICENSE

GPL-3.0 &copy; Herbert He
