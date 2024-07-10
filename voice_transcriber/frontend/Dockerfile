# Dockerfile for the frontend
FROM node:20.15-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# # Ensure the correct file permissions
# RUN chown -R node:node /app

# # Switch to a non-root user
# USER node

# # Install ESLint and Tailwind CSS dependencies
# RUN npm install eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y eslint-plugin-import eslint-plugin-tailwindcss
# RUN npm install tailwindcss postcss autoprefixer

# Build the application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]
