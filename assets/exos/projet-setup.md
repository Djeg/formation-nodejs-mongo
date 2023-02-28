# Votre premier projet nodejs

1. Commencer par créer un fichier `package.json` en vous inspirant des commandes
   du cours.
2. Installer typescript et les types pour node
3. Générer le fichier de configuration pour typescript
4. Configurer typescript (`tsconfig.json`) pour qu'il compile le dossier `src` dans le dossier `dist`
5. Créer un fichier dans `src/index.ts`, placer un simple console.log de votre choix, et lancer la compilation!
6. Créer une commande `npm` (dans la partie `script` du package.json) nommé `compiler` qui lance la compilation
   typescript avec l'option `watch`
7. Lancer cette NPM et assurez-vous que tout fonctionne bien
8. Faite un commit et pousser sur github

> **ATTENTION** : Certains dossier ne doivent pas être versionné

Envoyer votre lien github à votre formateur !

## Nodemon

1. Commencer par installer `nodemon`
2. Créer un scripts dans le fichier `package.json` qui lance `nodemon` sur le fichier `dist/index.js`
3. Assurez-vous que tout fonctionne
4. Envoyer votre sur github et le lien à votre formateur :)

## Concurrently

1. Commencer par installer `concurrently`
2. Créer un script nommé `start` dans le fichier `package.json` qui, graçe à concurrently lance la compilateur typescript ainsisi que le compilateur de l'application
3. Assurez-vous que tout fonctionne
4. Envoyer sur github et votre lien au formateur
