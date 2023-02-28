# Configurer son projet nodejs

1. Installer la librairie permettant de lire les variables d'environement
2. Modifier la `package.json` et ajouter l'option permettant d'inclure la librairie
3. Créer un fichier `.env` et placez-y les variables suivantes :

```env
NODE_ENV=development
TZ=europe/paris
HOST=localhost
PORT=5656
```

4. Dans le fichier `src/index.ts`, afficher le contenue de chacune de ces variables

5. Assurez-vous que tout fonctionne, en consultant le terminal !

6. Envoyer le code sur github et donner le lien à votre formateur

> **ATTENTION** : CERTAINS FICHIER NE DOIVENT PAS ÊTRE VERSIONNÉ, ATTENTION À BIEN SUIVRE LE COURE !

> Si un `.env` est présent sur github, c'est une erreur FATALE !
