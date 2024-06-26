# wiq_es2c

[![Deploy on release](https://github.com/Arquisoft/wiq_es2c/actions/workflows/release.yml/badge.svg)](https://github.com/Arquisoft/wiq_es2c/actions/workflows/release.yml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Arquisoft_wiq_es2c&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=Arquisoft_wiq_es2c)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=Arquisoft_wiq_es2c&metric=coverage)](https://sonarcloud.io/summary/new_code?id=Arquisoft_wiq_es2c)

This is a base repo for the [Software Architecture course](http://arquisoft.github.io/) in [2023/2024 edition](https://arquisoft.github.io/course2324.html). 

URLs of interest:
- **Aplication**: [20.117.171.228:3000](http://20.117.171.228:3000/)
- **OpenAPI**: [20.117.171.228:8000/](http://20.117.171.228:8000/api-doc/)
- **Grafana**: [20.117.171.228:8000](http://20.117.171.228:9091/)

This repo is a basic application composed of several components.

- **Gateway service**. Express service that is exposed to the public and serves as a proxy to the two previous ones.
- **User service**. Express service that handles the insertion of new users in the system.
- **Auth service**. Express service that handles the authentication of users.
- **Webapp**. React web application that uses the gateway service to allow basic login and new user features.
- **History service**. A new Express service handling users' game history.
- **Ranking service**. Another new Express service managing user ranking based on their game statistics.
- **Question and User APIs**. Additional services providing APIs for managing questions and users, respectively.

Both the user and auth service share a Mongo database that is accessed with mongoose.

## User Guide

### For Normal Users
As a normal user, you can use the web application to access basic features such as:

- Logging in to your account
- Registering a new account
- Accessing the game and playing
- Viewing your game history
- Viewing the ranking

### For Administrators

As an administrator, you have access to additional features, including:

- Access to the APIs for managing questions and users
- Ability to view user accounts
- Ability to view game statistics and the ranking

Please note that administrators do not have access to play the game from registration to gameplay and its functionalities.

## Quick start guide

### Using docker

The fastest way for launching this sample project is using docker. Just clone the project:

```sh
git clone https://github.com/Arquisoft/wiq_es2c.git
```

and launch it with docker compose:

```sh
docker compose --profile dev up --build
```

### Starting Component by component

First, start the database. Either install and run Mongo or run it using docker:

```docker run -d -p 27017:27017 --name=my-mongo mongo:latest```

You can also use services like Mongo Altas for running a Mongo database in the cloud.

Now, launch the auth, user and gateway services. Just go to each directory and run `npm install` followed by `npm start`.

Lastly, go to the webapp directory and launch this component with `npm install` followed by `npm start`.

After all the components are launched, the app should be available in localhost in port 3000.

## Deployment

For the deployment, we have several options. 

The first and more flexible is to deploy to a virtual machine using SSH. This will work with any cloud service (or with our own server). 

Other options include using the container services that most cloud services provide. This means, deploying our Docker containers directly. 

We are going to use the first approach, creating a virtual machine in a cloud service and after installing docker and docker-compose, deploy our containers there using GitHub Actions and SSH.

### Machine requirements for deployment

The machine for deployment can be created in services like Microsoft Azure or Amazon AWS. These are in general the settings that it must have:

- Linux machine with Ubuntu > 20.04.
- Docker and docker-compose installed.
- Open ports for the applications installed (in this case, ports 3000 for the webapp and 8000 for the gateway service).

Once you have the virtual machine created, you can install **docker** and **docker-compose** using the following instructions:

```ssh
sudo apt update
sudo apt install apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"
sudo apt update
sudo apt install docker-ce
sudo usermod -aG docker ${USER}
sudo curl -L "https://github.com/docker/compose/releases/download/1.28.5/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### Continuous delivery (GitHub Actions)

Once we have our machine ready, we could deploy by hand the application, taking our docker-compose file and executing it in the remote machine. 

In this repository, this process is done automatically using **GitHub Actions**. The idea is to trigger a series of actions when some condition is met in the repository. 

As you can see, unitary tests of each module and e2e tests are executed before pushing the docker images and deploying them. Using this approach we avoid deploying versions that do not pass the tests.

The deploy action is the following:

```yml
deploy:
    name: Deploy over SSH
    runs-on: ubuntu-latest
    needs: [docker-push-userservice,docker-push-authservice,docker-push-gatewayservice,docker-push-webapp]
    steps:
    - name: Deploy over SSH
      uses: fifsky/ssh-action@master
      with:
        host: ${{ secrets.DEPLOY_HOST }}
        user: ${{ secrets.DEPLOY_USER }}
        key: ${{ secrets.DEPLOY_KEY }}
        command: |
          wget https://raw.githubusercontent.com/arquisoft/wiq_es2c/master/docker-compose.yml -O docker-compose.yml
          wget https://raw.githubusercontent.com/arquisoft/wiq_es2c/master/.env -O .env
          docker compose down
          docker compose --profile prod up -d
```

This action uses three secrets that must be configured in the repository:
- DEPLOY_HOST: IP of the remote machine.
- DEPLOY_USER: user with permission to execute the commands in the remote machine.
- DEPLOY_KEY: key to authenticate the user in the remote machine.

Note that this action logs in the remote machine and downloads the docker-compose file from the repository and launches it. Obviously, previous actions have been executed which have uploaded the docker images to the GitHub Packages repository.

## Development Team

| 📚 UO | 🧑‍💻 Name | 📧 Email |
| :---: | :---: | :---: | 
| UO289792 | David Muñoz Río | [UO289792@uniovi.es](mailto:UO289792@uniovi.es)  |
| UO289337 | Rubén Pérez Dafonte | [UO289337@uniovi.es](mailto:UO289337@uniovi.es) | 
| UO288559 | Marina Seijo | [UO288559@uniovi.es](mailto:UO288559@uniovi.es) | 
| UO284342 | Ángela Roza | [UO284342@uniovi.es](mailto:UO284342@uniovi.es) | 

