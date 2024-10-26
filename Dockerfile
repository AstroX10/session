FROM node:20
WORKDIR /api
RUN apt-get update && apt-get install -y git
RUN git clone https://github.com/AstroX10/session .
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]
