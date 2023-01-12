# Le calculatrix

L'object de cette exercice est de créer une route permettant de réaliser des opérations mathématique classique (addition, soustraction, multiplication et division).

## L'utilisation :

L'objectif est de pouvoir lancer la requête suivante à notre application :

```http
POST http://127.0.0.1:5353/calculatrix
Content-Type: application/json

{
  "operation": "addition",
  "x": 12,
  "y": 15
}
```

La réponse attendu doit ressembler à ça :

```http
HTTP/1.1 200 Ok
Content-Type: application/json

{
  "result": 27
}
```

## 1. Installation

Pour réaliser l'exercice assurez-vous d'avoir les librairies suivantes d'installer :

```bash
npm i zod zod-to-json-schema fastify-plugin
```

## 2. Les Model

Créer un fichier `src/models/calculatrix.ts`, ce fichier vas contenir les models, schéma et type de notre calculatrix.

Créer un model pour lancer un calcul : `CalculModel`. Ce model doit correspondre à l'objet suivant :

| Propriété | type              | description                                                                                        |
| --------- | ----------------- | -------------------------------------------------------------------------------------------------- |
| operation | string (enum ...) | Contient l'opération à réaliser : `addition`, `soustraction`, `multiplication` ou alors `division` |
| x         | number            | Contient le premier chiffre de l'opération                                                         |
| y         | number            | Contient le deuxième chiffre de l'opérartion                                                       |

Créer un type `CalculType` en utilisant `z.infer` et créer `CalculSchema` en utilisant `zodToJsonSchema`.

Toujous dans le même fichier créer un model `ResulModel` correspondant à l'objet suivant :

| Propriété | Type   | Description                         |
| --------- | ------ | ----------------------------------- |
| resultat  | number | Contient le résultat de l'opération |

Créer un type `ResultType` en utilisant `z.infer` et créer `ResultSchema` en utilisant `zodToJsonSchema`.

## 2. Le plugin

Créer une fichier `src/routes/calculatrix.ts` dans ce fichier, exporter un plugin (`export default async function calulatrixRoute(...)`).

Dans ce plugin, créer une route `POST /calculatrix` avec les types et schémas suivant :

- Body : CalculType
- response 200 : ResultSchema

En utilisant le `CalculModel` ainsi que le `ResulModel`, codé le code nescessaire pour réaliser une opération !

## 3. Connécté le plugin à l'application fastify

Dans le fichier `src/index.ts`, utiliser fastify-plugin afin de connécter notre plugin de calculatrix !

## 4. Tester !

Utiliser le fichier `request.http` afin de tester cette calculatrix :)
