# Utiliser l'image de base officielle de n8n
FROM n8nio/n8n:latest

# Créer un répertoire de travail pour les nouveaux nœuds personnalisés
WORKDIR /data

# Copier les fichiers package.json et package-lock.json dans le répertoire de travail
COPY package*.json ./

# Installer les dépendances pour les nœuds personnalisés
RUN npm install

# 
# Build the project
RUN npm install typescript
RUN npx tsc && npx gulp build:icons

# Expose the port n8n will run on
EXPOSE 5678
# Copier les fichiers du projet dans le conteneur

# Construire les nœuds personnalisés
RUN npm run build

# Démarrer n8n
CMD ["n8n", "start"]
