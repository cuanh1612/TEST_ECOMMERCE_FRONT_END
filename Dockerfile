FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./

# install dependencies
RUN yarn install --frozen-lockfile

# Copy source
COPY . .

# Build production
RUN yarn build

# add serve global
RUN yarn global add serve

EXPOSE 4000

CMD ["serve", "-s", "dist", "-l", "4000"]