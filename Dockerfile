# Use an official Nginx image as a base image
FROM nginx:alpine

# Copy the build files to the Nginx web root directory
COPY build/ /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Command to run Nginx
CMD ["nginx", "-g", "daemon off;"]
