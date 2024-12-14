FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy your project files into the container
COPY . .

# Install dependencies (if any)
RUN npm install -g live-server

# Expose the default live-server port
EXPOSE 8080

# Define the command to start the service
CMD ["npx", "live-server", "--host=0.0.0.0"]
