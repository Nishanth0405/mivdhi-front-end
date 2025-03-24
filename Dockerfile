# Use an official Node.js image as the build stage
FROM node:18 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Use an Nginx image for serving the built React app
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Add a custom Nginx configuration to handle React Router
# COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
