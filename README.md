![CI Status](https://github.com/DraftBashFantasySports/draftbash/actions/workflows/backend_ci.yml/badge.svg) ![CD Status](https://github.com/DraftBashFantasySports/draftbash/actions/workflows/backend_cd.yml/badge.svg)
# DraftBash Fantasy Sports App

A fantasy sports app for managing football and basketball teams.

## Table of Contents
- [DraftBash Fantasy Sports App](#draftbash-sports-app)
  - [About](#about)
  - [Features](#features)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Usage](#usage)
  - [Contributing](#contributing)
  - [License](#license)
  - [Acknowledgements](#acknowledgements)

## About

The Draftbash fantasy sports app allows users to do simulated fantasy sport mock drafts.

## Features

- Have real-time fantasy sport mock drafts with friends.

## Getting Started

Follow these instructions to set up the project locally and start using the Fantasy Sports App.

### Prerequisites

- JDK 17.0

- Gradle Build Tool
    Gradle installation: [Download Gradle](https://gradle.org)

- Docker Desktop and Engine
    1. **Windows**:
   - Docker Desktop for Windows: [Download Docker Desktop](https://www.docker.com/products/docker-desktop)

    2. **Mac**:
    - Docker Desktop for Mac: [Download Docker Desktop](https://www.docker.com/products/docker-desktop)

    3. **Linux**:
    - Docker Engine for Ubuntu: [Install Docker Engine on Ubuntu](https://docs.docker.com/engine/install/ubuntu/)
    - Docker Desktop for other Linux distributions: [Install Docker Desktop on Linux](https://www.docker.com/products/docker-desktop)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/DraftBashFantasySports/draftbash.git

2. Navigate to the project directory:

    ```bash
    cd draftbash

3. Build and start the project's Docker image and Postgres Database image with docker-compose

    ```bash
    cd apps/backend && docker-compose up --build

4. Start the API.
    ```bash
    cd apps/backend && gradle bootRun

5. Start the frontend
    cd apps/web-frontend && npm run dev

### Usage

1. Open your web browser and navigate to http://localhost:3000 to see the API running

2. Use Postman or curl to test some API endpoints.

3. View database through the terminal while the containers from docker-compose are still running
    Open a new terminal from the project directory.
    Visit https://tomcam.github.io/postgres to learn about the commands in the Postgres psql cli.

    ```bash
    cli/db.sh

4. Visit the site at http http://localhost:5173

## Contributing

Contributions are welcome! Contributions take many forms, from new code, enhancements, bug fixes and enhancements, new tests, and documentation.

### Running Tests

3. To run the test suite, run:

    ```bash
    cd apps/backend && gradle test

## People

The original author of DraftBash is [Stephen Feddes](https://github.com/StephenFeddes)

The current lead maintainer is [Stephen Feddes](https://github.com/StephenFeddes)

## License

This project is licensed under the Apache License 2.0 [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0).