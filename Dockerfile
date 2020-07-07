FROM mhart/alpine-node:12

ENV DEBUG='*,-babel,-eslint:*,-babel:config:config-chain,-eslint-module-utils:*'
# Set thew working directory inside the docker
WORKDIR /app

# Entire filesystem copied after install
COPY dist .

EXPOSE 8080
CMD ["node", "server.bundle.js"]