# Confiugurer nodemon et dotenv

## 1. Nodemon

En vous inspirant de ce qui a été fais sur le support, créer une commande `npm run start:demon` qui démarre l'application avec nodemon.

## 2. La configuration

Créer à la racine de votre projet un fichier `.env` et ajouter le contenu suivant :

```
FIRSTNAME=John
LASTNAME=Doe
```

Après avoir installé et configuré la librairie `dotenv`, afficher dans la console (en utilisant le fichier `src/index.ts`) la phrase suivante : `Bonjour ${FIRSTNAME} ${LASTNAME}, Comment allez-vous ?`
