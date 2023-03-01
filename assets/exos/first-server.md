# Votre premier server logique

1. Installer fastify
2. Dans le fichier `index.ts`, créé une application fastify qui écoute sur votre machine, sur le port 4646
3. Ajouter 2 routes :

- `GET /`: Qui retourne la chaine de caractère `Bienvenue sur mon serveur`
- `GET /hello`: Qui retourne la chaine de caractère `Bonjour tout le monde`

4. Utiliser des variables d'environement pour le `port` et le `host` de votre serveur ...

> L'objéctif de l'exercice 4 est de rendre configurable pour `Alban` le `host` et le `port` de notre serveur !

## Tester votre server

1. Créer une fichier `request.http` à la racine de votre projet afin de pouvoir tester notre server
2. Dans ce fichier écrivez une request en méthode GET sur la page d'acceuil de notre server
3. Toujours dans ce fichier, écrivez une seconde requête pour la resource `/hello` sur notre serveur
4. Envoyé chacune des requêtes assurez-vous que tout fonctionne
5. Commit sur gitub et de partager le lien github

## Le format json et la réponse

1. Dans le fichier `index.ts`, créer une route : `/eleves` qui retourne
   le tableaux suivant :

| id  | nom  | prenom | age |
| --- | ---- | ------ | --- |
| 1   | john | john   | 32  |
| 2   | rose | john   | 36  |
| 3   | jane | john   | 40  |
| 4   | jean | john   | 38  |

> il faudra essayer de transformer les données au dessus en tableaux javascript

2. Tester votre route en utilusant le fichier `request.http`
3. Ajouter dans la réponse une en-tête http : `Developed-With: fastify`
4. Tester votre route en utilusant le fichier `request.http`
5. Faite un commit, pousser sur github et envoyer le lien github sur le chat !
