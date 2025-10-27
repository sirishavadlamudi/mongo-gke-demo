FROM node:20-alpine

WORKDIR /app
COPY package.json package-lock.json* ./ 
RUN npm install --production

COPY src ./src
EXPOSE 8080
CMD ["node", "src/index.js"]
