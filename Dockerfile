FROM node:22-alpine

WORKDIR /home/node/app

# Installer AdonisJS CLI globalement
RUN npm install -g @adonisjs/cli

# Copie des fichiers package.json
COPY package*.json ./

# Installation des dépendances
RUN npm install

# Copier le reste du projet
COPY . .

# Build du projet
#RUN npm run build

