# DotEnv

## Configuration et de variables d'environements

Pour mettre en place de la configuration pour notre application, il faut utiliser des **variables d'environement**. C'est un format universelle pour toutes application "moderne". Afin de créer de la configuration pour notre application nous devons créer un fichier `.env` à la racine de notre projet. Ce fichier contiendra toute la configuration de notre application.

Voici un exmple de fichier `.env`

```env
# Le diése représente un commentaire. Ensuite c'est un fichier
# simple contenant des clefs en majuscule et des valeurs :
DATABASE_URL="mongodb://......."
DEFAULT_RESULT_NUMBER=25
USERNAME=root
```

### Lire et récupérer des variables d'environement

Pour pouvoir récupérer et lire des variables d'environement en nodejs il faut tout d'abord installer `dotenv` :

```bash
npm i dotenv
```

Maintenant il faut changer notre script de démarrage (`npm run start` et `npm run start:dev`) :

```json
"start": "node -r dotenv/config dist/index.js",
"start:nodemon": "nodemon -r dotenv/config dist/index.js"
```

Nous pouvons accéder à n'importe quelle configuration n'importe ou dans notre code en utilisant :

```ts
process.env.NOM_DE_LA_VARIABLE_ENVIRONEMENT
```

### Attention au versionnement !

Il est **formellement déconseillé voir même très dangereux** de partager sur github votre fichier de configuration `.env`. Il est donc conseillé de s'organiser de cette manière :

1. On ignore le fichier `.env` dans le `.gitignore`
2. On créé un fichier **d'éxemple** `.env.dist` contenant les exemples de toutes les valeurs de configuration. Attention aucune informations sensible ne doit être présent dans ce fichier `.env.dist`
3. Lors de l'installation du projet, il nous faudra copié `.env.dist` en `.env` et éditer les valeurs de configuration
