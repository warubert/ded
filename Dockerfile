FROM node:20.17.0
WORKDIR /app
COPY package*.json ./
RUN npm install -g @ionic/cli@7.2.0
RUN npm i
COPY . .
EXPOSE 8100
ENTRYPOINT ["ionic"]
CMD ["serve", "--host", "0.0.0.0"]
