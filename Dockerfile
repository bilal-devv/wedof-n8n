# Utiliser l'image de base officielle de n8n
FROM n8nio/n8n:latest

# Créer un répertoire de travail pour les nouveaux nœuds personnalisés
WORKDIR /data

# Copier les fichiers package.json et package-lock.json dans le répertoire de travail
COPY package*.json ./

# Installer les dépendances pour les nœuds personnalisés
RUN npm install

# Copier les fichiers du projet dans le conteneur
COPY .idea .

# Construire les nœuds personnalisés
RUN npm run build

# Démarrer n8n
CMD ["n8n", "start"]
