# Student.ch Imageboard

Student.ch is an imageboard for students and teachers to ask for help, amuse, and discuss problems.

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/maximum259492/Student.ch.git
    ```
   
2. Install Docker if you haven't already:

   - [Docker Desktop for Windows](https://hub.docker.com/editions/community/docker-ce-desktop-windows)
   - [Docker Desktop for Mac](https://hub.docker.com/editions/community/docker-ce-desktop-mac)
   - [Docker Engine for Linux](https://docs.docker.com/engine/install/)
   
  If you have Docker installed, you can skip this step.

3. Run the following command to start the development server:

   ```bash
   docker-compose up
   ```
   or
    ```bash
   sudo docker-compose up
   ```
   
4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result

5. This project has initial data, you can login with the following credentials:

  ADMIN:
   - **Username:** admin
   - **Password:** admin

  MODERATOR:
   - **Username:** moderator
   - **Password:** moderator

  USER:
 - **Username:** user
 - **Password:** user


Or you can register a new user by clicking on the register button.

New admin can be registered only on the /reg-admin route.

New moderator can be registered only on the /reg-moderator route.


## Features

- **User roles:** Admin, Moderator, User
- **User authentication:** Login, Register, Logout
- **Thread management:** Create, Read, Like, Unlike, Reply, Hide, Undo Hide, Delete, Post image
- **User management:** Ban, Unban, Give moderator rights, Remove moderator rights

## Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS, Redux Toolkit, pnpm as package manager
- **Backend:** Java, Spring Boot, Spring Security, Spring Data JPA, PostgreSQL, Hibernate, Lombok
- **Infrastructure:** Docker, Docker Compose

  
  
