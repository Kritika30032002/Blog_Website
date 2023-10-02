# Blog Website

## Introduction

Welcome to the Blog Website, a platform that empowers users to create, share, and engage with blogs. This repository contains the source code for the website, which securely stores blogs in a database while providing a seamless experience for writers and readers.

## Features

- **User-Friendly Interface:** The intuitive user interface allows users to effortlessly compose and edit blogs.

- **Database Storage:** All blogs are securely stored in a database, making it easy to manage and retrieve them whenever needed.

- **Responsive Design:** The website is designed to be responsive, ensuring an optimal experience on both desktop and mobile devices.

## Getting Started

### Prerequisites

Before you begin, make sure you have the following prerequisites installed on your local machine:

- [Node.js](https://nodejs.org/)

- [MongoDB](https://www.mongodb.com/)

### Installation

1. **Clone the Repository**

   Clone this repository to your local machine:

   ```
   git clone https://github.com/yourusername/blog-website.git
   ```
   
2. **Navigate to the Project Directory**
3. **Install Dependencies**
    ``` npm install ```

### Configuration
To configure the project, follow these steps:

- **Create a .env File**
  Create a .env file in the root directory of the project to store your environment variables. Replace your_session_secret with a secure, random string for session management.
  
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/blog-website
SESSION_SECRET=your_session_secret
```

### Running the Application
1. **Start the application**
   Start the application by running:
   ```npm start```
    or
    ```node app.js```
2. **Access the website**
   Open your web browser and navigate to http://localhost:3000 to access the blog website.

### Contributing
We enthusiastically welcome contributions from the community. If you discover a bug or have an enhancement in mind, please don't hesitate to open an issue or create a pull request. Your input is invaluable to us.


Join the [discord server](https://discord.gg/JdFsJPrayj) for more discussion: 
