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

## La calculatrice !

Dans le fichier `index.ts`, réaliser les routes suivantes :

### L'addition

1. Créer une route `get /calc/add/:x/:y` avec le bon type associer
2. Retourner un objet json de cette forme :

```json
{
  "result": <resultat>,
  "x": <x>,
  "y": <y>,
  "operation": "addition"
}
```

3. Utiliser le fichier `request.http` pour tester cette route !

### Les autres opérations

1. En suivant les même étapes que l'exercice précédent réaliser
   les routes suivantes :

```
GET /calc/sub/:x/:y
GET /calc/mul/:x/:y
GET /calc/div/:x/:y
```

### La route calculatrice

1. Créer la route suivante `post /calculate`
2. Cette route accépte un en tête HTTP : `Operation` pouvant contenir la chaine de caractère suivante :

- add
- mul
- sub
- div

3. Cette route accépte aussi des données JSON dans son body, ces données doivent être de cette forme :

```json
{
  "x": 15,
  "y": 26
}
```

4. En utilisant l'en-tête http `Operation` ainsi que les données envoyé dans le `body`, réaliser la bonne opération

> Attention à bien gérer le cas d'une division par 0 ...

Une fois terminer envoyer le lien de votre github avec l'exercice :)

## Le plugin calulcatrice

1. Installer fastify plugin
2. Créer un dossier dans `src/` nommé `routes`
3. Ajouter un fichier `calculatrice.ts` dans le dossier `src/routes`
4. Placez toutes les routes concernant la calculatrice dans un plugin du fichier `calculatrice.ts`
5. Branchez votre plugin dans le fichier `index.ts` (vous pouvez supprimer les routes concernant la calculatrice)
6. Tester puis publié sur github
