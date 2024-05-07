FROM node:20.10.0-slim

# Install OpenSSL
RUN apt-get update && apt-get install -y openssl

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json /app
COPY package-lock.json /app

# Copy prisma
COPY prisma /app/prisma

# Install app dependencies
RUN npm install

# Bundle app source
COPY . /app

# Expose the port the app runs in
EXPOSE 3000

# Serve the app
CMD ["npm", "run" ,"start:prod"]