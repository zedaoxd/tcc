FROM node:20.10.0-slim

RUN apt-get update && apt-get install -y openssl procps

USER node

RUN mkdir /home/node/backend

WORKDIR /home/node/backend

CMD ["/home/node/backend/scripts/start-dev.sh"]