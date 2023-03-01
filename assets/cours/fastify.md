# Découvrir fastify

Fastify est une librairie nodejs permettant de créer des server logique HTTP.

## Les serveurs

![Les servers](../images/server.png)

## Les urls

![Les urls](../images/url.png)

## Le protocol HTTP

![HTTP](../images/http.png)

## Fastify

Nodejs à été conçu dans l'optique de créer des serveurs logique HTTP. Pour cela il existe plusieurs librairie :

- [**Express**](http://expressjs.com/) : La toute première librairie créé pour faires de serveurs HTTP en nodejs
- [**Fastify**](https://www.fastify.io/) : Plus récente et plus rapide, elle s'inspire d'express et supporte typescript, c'est celle que nous allons utilisé dans ce cours.
- [**NestJS**](https://nestjs.com/) : Framework complet basé sur le paradigm MVC, plus difficile d'accès mais bien plus complet !

### Installer fastify

Pour installer fastify :

```bash
npm i fastify
```

### Créer une application fastify

Afin de pouvoir créer notre premier server, nous devons créer une application fastify :

```ts
import fastify from 'fastify'

// Création d'une application fastify
const app = fastify()
```

### Lancer le serveur HTTP (listen)

Afin de démarrer notre serveur nous devons demander à notre application fastify d'écouter un port et un host :

```ts
// Écoute un port et un host
app.listen({ port: 5353, host: '127.0.0.1' }, () => {
  // Affiche un message dans la console nous indiquant que le serveur est démarré
  console.log("Le serveur http est prêt sur l'address : http://127.0.0.1:5353")
})
```

> ATTENTION : Il est fortement conseillé de mettre le port et le host dans des variales d'environements.

### Ajouter des routes

De base un serveur http ne fais rien du tout, pour ajouter des « actions » à notre serveur, nous allons devoir lui ajouter des route. Par éxemple je souhaiterais que mon serveur me dise bonjour :

```ts
// On utilise l'application fastify pour ajouter des routes. Chaque route possède une méthode HTTP et
// un chemin (Resource, Path) :
app.get('/', () => {
  return 'Bonjour les amis'
})
app.post('/', () => { ... })
app.delete('/', () => { ... })

```

## Transmettre des données à notre serveur

Pour faire des « vrais » requêtes (écrire la Request nous même), il éxiste une extension VSCode super pratique : c'est [Rest API Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)

Cette extension permet d'écrire de véritable « request » et de visualiser de véritable « response ». Le principe est simple, nous pouvons créer des fichier `.http` et commencer à écrire nos requêtes et recevoir des réponses :

Exemple :

Création d'un fichier `request.http` à la racine du projet

```
GET http://127.0.0.1:4646
```

Une fois la requête écrite, il suffit de cliquer sur « send request » afin de consulter le fichier request !

Vous pouvez écrire plusieurs requête dans ce fichier, pour cela il suffit de les séparer par 3 `###` :

```http
GET http://127.0.0.1:4646

###

GET http://127.0.0.1:4646/hello
```

### La `request` et la `response`

Lorsque nous faisons une route avec fastify, nous pouvons recevoir 2 paramètres :

- [La request](https://www.fastify.io/docs/latest/Reference/Request/)
- [La response](https://www.fastify.io/docs/latest/Reference/Reply/)

Ces deux paramètres nous permettent de totalement personaliser notre réponse mais aussi de récupérer des informations de notre request !

### Personaliser le status de réponse

Il est parfois essentiel que notre serveur retourne le bon status. Par éxemple le status `200 Ok` est utilisé lorsque tout ce passe bien, cependant si une erreur survient notre serveur doit répondre le bon status :

- `400` : Une erreur c'est produit côté client
- `500` : Une erreur c'est produit sur le serveur
- `404` : La page n'éxiste pas

Vous retrouverez la liste des stautus http ici :

[Liste des status HTTP](https://developer.mozilla.org/fr/docs/Web/HTTP/Status)

Pour personnaliser le status :

```ts
app.get('/test', (request, response) => {
  // Pour personnaliser le status, nous utilisons la réponse :
  response.code(400)

  return 'Une erreur est survenue'
})
```

### Personaliser les `header` de notre réponse

Il est possible d'envoyer au client nos propres `header` HTTP. Ce sont des « meta informations », des informations que le serveur peut transmettre au clietn mais qui ne s'affiche pas (exemple les cookie).

Pour personnaliser nos `header` http, nous utilisons la `response` :

```ts
app.get('/test', (request, response) => {
  // Ajouter un entête http
  response.header('Coded-In', 'fastify')

  return 'coucou'
})
```

cIl éxiste un très grand nombre d'en-tete http :

- [Liste des en-tête http](https://developer.mozilla.org/fr/docs/Web/HTTP/Headers)

L'en-tête le plus incontournable c'est le `Content-Type`, il définie le type de contenue que nous souhaitons envoyé au client. Il en existe un [très grand nombre](https://developer.mozilla.org/fr/docs/Web/HTTP/Basics_of_HTTP/MIME_types).

Le plus répandu aujourd'hui (53% du trafic) c'est `application/json` soit, le format `json`.

## Le format JSON

Lorsque l'on souhaite échanger des données entre un client et un serveur, le format de prédilection est JSON. Simple, lisible, léger c'est le plus répandu au monde (anciennement c'était le `xml`).

Voici un exemple de fichier json :

### Les string

```json
"Coucou les amis"
```

> Très similaire à javascript sauf attention, uniquement les guillemets double sont valide !

### Les numbers

```json
12
12.5
-56
```

### Les boolean

```json
true
false
```

### Les array

```json
["coucou", "les", "amis", 12, false]
```

### Les objets

```json
{
  "nom": "Doe",
  "prenom": "John",
  "age": 32
}
```

> En json les guillemets sont obligatoire pour les clefs de vos objets !

### Exemple de json une fiche de présence :

```json
{
  "AMIN Ali": {
    "email": "....",
    "presence": {
      "lundi": {
        "matin": "P",
        "après midi": "P"
      },
      "mardi": {
        "matin": "P",
        "après midi": "P"
      },
      "mercredi": {
        "matin": "P",
        "après midi": "P"
      }
    }
  }
}
```

### Faire du JSON avec fastify

`jSON` est un format, inspiré de javascript, il est « natif » au langage de programmation. Aucune installation, aucun apprentissage, il suffit tout simplement de retourner un tableaux ou un objet pour faire du JSON !

```ts
app.get('/notes', () => {
  // On retourne un tableaux javascript
  // fastify utilisera tout seul le format JSON
  return [12, 8, 6, 19, 17]
})

app.get('/john', () => {
  // On retourne un objet javascript
  // fastify utilisera tout seul le format JSON
  return {
    id: 1,
    email: 'john@mail.com',
    firstname: 'john',
    lastname: 'doe',
  }
})
```

### Récupérer ses données dans notre route fastify

Il est possible d'envoyé des données à notre server en utilisant différentes techniques :

#### 1. Utiliser le body

Pour envoyer des données en utilisant le body, il suffit de spécifier un type de
contenue (ici `application/json`) et ensuite de mettre nos données

```http
POST http://127.0.0.1:5353/eleves
Content-Type: application/json

{
  "nom": "john",
  "prenom": "john",
  "age": 34
}
```

Il est possible de récupérer les données envoyé dans le body en utilisant `request` :

```ts
app.post('/eleves', request => {
  // On récupére le nom envoyé dans la requète
  request.body.nom
  request.body.age
})
```

En typescript, il faut typer le contenue de notre body :

```ts
/**
 * Création d'un type pour toute la route
 */
type EleveRoute = {
  Body: {
    nom: string
    prenom: string
    age: number
  }
}

// On indique à fastify ce que contient notre body
app.post<EleveRoute>('/eleves', request => {
  // On récupére le nom
  request.body.nom
})
```

#### 2. Utiliser les query strings

VOici un éxemple de requête qui utilise des query string :

```http
GET http://127.0.0.1:5353/eleves?sortBy=alpha&direction=ASC
```

Pour récupérer ces « query string » (ou filtres) dans notre code il faut aussi utiliser la `request` :

```ts
/**
 * Création d'un type pour toute la route
 */
type EleveRoute = {
  Querystring: {
    sortBy: string
    direction: string
  }
}

// On indique à fastify ce que contient notre body
app.post<EleveRoute>('/eleves', request => {
  // Pour récupérer un filtre
  request.query.sortBy
})
```

#### 3. Utiliser les `headers`

Je peux aussi envoyer des données en utilisant les headers :

```http
POST http://127.0.0.1:5353/eleves
nom: john
prenom: john
age: 32
```

Pour récupérer ces « headers » (ou en-tête http) dans notre code il faut aussi utiliser la `request` :

```ts
/**
 * Création d'un type pour toute la route
 */
type EleveRoute = {
  Headers: {
    nom: string
    prenom: string
    age: string
  }
}

// On indique à fastify ce que contient notre body
app.post<EleveRoute>('/eleves', request => {
  // Pour récupérer le nom d'un élève :
  request.headers.nom
})
```

#### 4. Les paramètres de route

Sur la plupart des sites internet il éxiste des routes ditent « dynamique ».

Exemple :

```
https://www2.hm.com/fr_fr/homme/nouveautes/vetements.html
https://www2.hm.com/fr_fr/femme/nouveautes/vetements.html
```

Certaine route peuvent contenir des paramètres ! Ce paramètres nous permettent d'être plus spécifique dans URL. Par exemple, `homme` peut être remplacè par `femme`

Pour envoyer des requêtes à une route dynamique :

```http
GET http://127.0.0.1:5353/vetements/25

###

GET http://127.0.0.1:5353/vetements/150

###

GET http://127.0.0.1:5353/vetements/14
```

Pour créer des routes dynamique avec des paramètres :

```ts
/**
 * Créer le type pour notre route
 */
export type VetementRoute = {
  Params: {
    id: string
  }
}

// Création d'un route qui contient un paramètre
// « id »
app.get<VetementRoute>('/vetements/:id', request => {
  // Pour récupérer l'identifiant, on utilise
  request.params.id
})
```

#### Important

Il n'y a que le `body` qui accépte des types différent de `string`. Pour les querystring, params ou headers, on ne peut envoyer que des `string`.

### Comprendre le généric envoyé à la route

Un route à besoin d'un type générique afin de définir ce que contient la request et plus spécifiquement les éléments suivant :

```ts
// Type permettant de dire à typescript ce que contient une request
type MaRoute = {
  // Définie ce ques contient les Params de la route
  Params: {
    id: string
  }
  // Définie ce que contient les Querystring de la route
  Querystring: {
    orderBy: string
  }
  // Définie ce que contient le body de la route
  Body: {
    title: string
  }
  // Définie les en-tête http que doit contenir notre request
  Headers: {
    'Content-Type': string
  }
}

app.get<MaRoute>('/test', request => {
  // Ici request.params doit contenir MaRoute['Params']
  console.log(request.params) // { id: '...' }
  // request.query doit contenir MaRoute['Querystring']
  console.log(request.query) // { orderBy: '...' }
  console.log(request.body) // { title: '...' }
  console.log(request.headers) // { "Content-Type": '.....' }
})
```

## Les plugins

Dans une véritable API Web, il est possible d'avoir un très grand nombres routes (parfois même des centaines). On ne vas pas mettre toutes les routes dans le même fichier. Pour séparer nos routes en plusieurs fichier, fastify à mis en place un système de « plugin » (Des petites extensions).

Pour pouvoir utiliser les plugins nous avons besoin d'installer un package :

```
npm i fastify-plugin
```

Généralement, les différentes routes de notre applications sont rangé dans un dossier : `src/routes`

Dans ce dossier nous allons pouvoir créer nos premiers plugins :

```ts
// src/routes/users.ts

/**
 * Un plugin est une fonction asynchrone recevant l'application fastify :
 */
export default async function userRoute(app: FastifyInstance) {
  /**
   * Grâce à l'application fastify, nous pouvons facilement
   * déclarer des routes
   */
  app.get('/users', async () => {
    return { ... }
  })
}
```

Maintenant que nous avons notre premier plugin, nous pouvons l'assembler (ou le connécter) dans notre fichier principal :

```ts
// src/index.ts
import fastify from 'fastify'
import fp from 'fastify-plugin'
import userRoute from './routes/users'

/**
 * Création d'un app fastify
 */
const app = fastify()

/**
 * Maintenant nous pouvons connécter notre plugin :
 */
app.register(fp(userRoute))
```

## La décoration

Fastify offre la possibilité d'enregistrer dans l'application des données et des fonctions. Cela vous nous permettre de transmettres des informations entre les différents plugins. Pour cela nous pouvons décorer l'application :

```ts
// src/routes/users.ts

/**
 * Création du plugin
 */
export default async function userRoute(app: FastifyInstance) {
  /**
   * Nous pouvons décorer l'application :
   */
  app.decorate('collection', 'user_collection')
}
```

Maintenant grace à la décoration nous pouvons récupérer la variable `collection` n'importe ou !

```ts
// src/routes/pizzas.ts

/**
 * Création du plugin
 */
export default async function pizzaRoute(app: FastifyInstance) {
  /**
   * Route récupérer les pizzas
   */
  app.get('/pizzas', async () => {
    // Je peux récupére la collection :
    app.collection // 'user_collection'
  })
}
```
