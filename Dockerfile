FROM node:20

WORKDIR /api

RUN apt-get update && apt-get install -y git

RUN git clone https://github.com/AstroX10/session .

RUN npm install

EXPOSE 8000

CMD ["node", "server.js"]
