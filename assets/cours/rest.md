# Les API Rest

Les api REST c'est une méthode utilisé afin de partager des données avec tout un tas de client (des téléphones, consoles de jeux, GPS, TV etc ...). C'est aussi la possibilité de partager des données avec d'autres API Rest (des api d'amazon, google etc ...).

Ces api rest sont basé sur le protocole HTTP. Elle s'organise en suivant des règles stricts.

## Resource

Les api rest possède des `Resources`, ces "resources" représente la donnée de votre application. Elles sont généralement présenté et formatté en utilisant le format JSON.

> C'est un peu comme un table d'une base de données, mais en JSON !

En REST chaque resource représente de la données.

Exemple :

immaginons une api de vente de chaussure "shoes.me", nous pouvons immaginer les resources suivante :

```
https://shoes.me/shoes
https://shoes.me/users
https://shoes.me/orders
etc ...
```

## Les Collections et les Documents

Il éxiste 2 formes de resources :

- La collection, représente une suite de documents, généralement nous utilisons une tableaux JSON pour la représenté : (`[]`)
- Le document, réprésente une données au singulier, généralement nous utilison un objet JSON pour la représenté : (`{}`)

Exemple :

```
https://shoes.me/shoes (Collection)
https://shoes.me/users (Collection)
https://shoes.me/orders (Collection)
https://shoes.me/me (Document)
```

> Les API Rest sont ditent « idempotante », c'est à dire à dire qu'une resource qui est un collection restera toujours une collection. Il en vas de même pour les document, si une resource est un document alors il restera document toute sa vie.

> Une collection ne peut pas se transformer en document, les documents ne peuvent pas se transformer en collection !

## L'imbrication des resources

Les API Rest on était conçu pour représenter n'importe quelle données. Pour cela il éxiste une notion "d'imbrication", des collections peuvent contenir des documents qui eux même peuvent contenir des collection etc ...

```
http://shoes.me/shoes/10 (Document)
http://shoes.me/shoes/10/comments (Collection)
http://shoes.me/shoes/10/comments/4 (Document)
http://shoes.me/shoes/10/comments/4/user (Document)
```

> Attention, si les resources s'imbrique dans un sens elle s'imbrique aussi dns l'autre .... exemple :
>
> ```
> http://shoes.me/connected/user (Document, Invalide ....)
> http://shoes.me/connected (INvalide, ni à un document, ni à une collection)
> ```
>
> Généralement, lorsque l'on as un verbe dans notre resources ... C'est mauvais signe.

## Les actions

Les API Rest possède des actions symbolisé graçe aux méthode HTTP :

- `GET` : Obtenir, récupérer
- `POST` : Créer
- `DELETE` : Effacer, supprimer
- `PUT` : Modifier **l'intégralité de la resource** (d'une collection ou d'un document)
- `PATCH` : Modifier **une partie de la resource**

Exemple :

```
Je veux créer une nouvelle chausure :
POST https://shoes.me/shoes

Je veux récupérer des chaussures
GET https://shoes.me/shoes
```

> Pour qu'une API Rest soit valide, les méthodes HTTP sont interchangeable. Si je peux faire un GET alors, je peux faire un POST / PUT / PATCH et DELETE !

## Les filtres

Il est possible de filtrer des resources. Pour cela nous utilisons les `QueryString` :

Exemple :

```
Je veux récupérer les 10 chaussure trier par pix croissant
https://shoes.me/shoes?limit=10&orberBy=price&direction=ascending

Je veux récupérer les chaussure de marque "nike"
https://shoes.me/shoes?brand=nike
```

**Les filtres ne change pas le forme d'une resource, si c'est collection ça restera une collection, si c'est un document ça restera un document** :

```
https://shoes.me/shoes?id=10 (Collection)
```

> Les query strings se place à la fin de le resource, nous ne pouvons pas imbriquer query string et resource :
>
> ```
> https://shoes.me/shoes?limit=10&brand=nike/52/comments (Invalide, on imbrique des query dans des resources)
> ```

## Entrainez-vous !

Voici une série d'énoncé, pour chaque ennoncé immaginé la forme de la resource, des query string et de la méthode HTTP (plusieurs solution sont possible).

```
Je veux récupérer toutes les chaussures
---------------------------------------
GET http://shoes.me/shoes (Valide, Collection)


Je veux créer une chaussure
---------------------------
POST https://shoes.me/shoes (Valide, Collection / Document)
POST http://shoes.me/shoe (Invalid)


Je veux modifier la chaussure avec l'identifiant n°10
-----------------------------------------------------
PUT/PATCH https://shoes.me/shoes?id=10 (Valide, Collection)
PATCH https://shoes.me/shoes/10 (Valide, Document)


Je veux récupérer les chaussures de la marque nike et ayant un prix maxium de 100 euros
----------------------------------------------------------------------------------------
GET https://shoes.me/shoes?brand=nike&price<=100 (Invalide ... Collection)
GET https://shoes.me/shoes?brand=nike&price<=100€&orberBy=price&direction=ascending (Invalide ...)
GET https://shoes.me/shoes?brand=nike&maxprice=100 (Valide)
GET https://shoes.me/shoes?brand=nike&devise=€&price<=100 (Invalide ...)


Je veux récupérer l'utilisateur qui vend la chassure n°9
--------------------------------------------------------
GET https://shoes.me/shoes/id=09?seller=user (Pas valide)
GET https://shoes.me/users?shoe=9 (Valide, Collection)
get https://shoes.me/users?type=vendeur&idshoes=9 (Valide, Collection)
GET https://shoes.me/users?shoe_id=9 (Valide, Collection)
GET https://shoes.me/shoes/9?vendor  (Pas valide, Document)
GET https://shoes.me/shoes?id=9&user=vendor  [] (Pas valide, Collection)
GET http://shoes.me/users/vendors?idshoes=9 (Pas valide)
GET http://shoes.me/users?user=vendor&shoesid=9  (Valide, Collection)
GET https://shoes.me/shoes/9/user=ID (Pas valide)
GET https://shoes.me/shoes/9/Orders/user=ID (Pas valide)
GET https://shoes.me/shoes?id=9&idorder=ok/user=ID (Pas valide)
GET https://shoes.me/shoes/9/seller (valide, Document)

Je veux récupérer toutes les commandes de l'utilisateur avec l'id 53
--------------------------------------------------------------------
GET https://shoes.me/orders?user=53 (Valide, Collection)
GET https://shoes.me/shoes/id=09?seller=user (Pas valide)
GET http://shoes.me/shoes/orders=users?id=53 (Pas valide)
GET http://shoes.me/users/53/comments (Valide)
GET http://shoes.me/users/53?comments (Pas valide)
get https://shoes.me/commands?iduser=53 (Valide, Collection)
GET http://shoes.me/users/53/commands (Valide, Collection)
GET https://shoes.me/orders/53 (Pas valide)
GET https://shoes.me/order?userid=53 (Pas valide)
GET https://shoes.me/orders/userid=53 (Pas valide)
GET https://shoes.me/orders/users/53 (Pas valide)


Je veux supprimer le commentaire avec l'id n°56 de la chaussure avec l'id n° 65
-------------------------------------------------------------------------------
DELETE https://shoes.me/comments?shoes=56&id=65 (Valide, Collection)
DELETE https://shoes.me/shoes?shoe=65&comment=56 (Pas valide)
DELETE https://shoes.me/shoes/65/comments/56 (Valide, Document)
DELETE http://shoes.me/shoes/65/user/56/comment (Pas valide)
DELETE https://shoes.me/65/comment/56 (Pas valide) * pas recommandé
DELETE https://shoes.me/65/comments/56 (Valide) * pas recommandé
DELETE http://shoes.me/shoes/65/comments/56 (Valide, Document)
DELETE http://shoes.me/shoes/65/comments?id=56  [] (Valide, Collection)
DELETE http://shoes.me/shoes?id=65&comment=56  [] (Pas valide)
DELETE http://shoes.me/comments/56?idshoes=56 [] (Valide, Document)
DELETE http://shoes.me/comments/56 [] (Valide, Document)

Je veux modifier mon adresse email dans mes informations personnelles
---------------------------------------------------------------------
PUT https://shoes.me/users/12 (Presque ..., Document)
PATCH https://shoes.me/users/12 (Valide, Document)
PUT http://shoes.me/me/mail (Valide, String)
PATCH https://shoes.me/users?yannick=email (Pas valide)

# Pas Recommandé
patch https://shoes.me/me?mail=marcel.mimouni@gmail.com (Valide)
DELETE https://shoes.me/connected?mail=marcel.mimouni@gmail.com (Valide)
GET https://shoes.me/connected (Valide)
GET https://shoes.me/connected?mail=marcel.mimouni@gmail.com (Valide)

PATCH http://shoes.me/users/me?email  {} (Valide)
PATCH https://shoes.me/users/user?adressemail=test@gmail.com (Pas valide)
PATCH https://shoes.me/users?id=10&adressemail=test@gmail.com (Valide, collection, pas recommandé)
PATCH https://shoes.me/me/email (Valide, String)
PATCH http://shoes.me/connected?mail=soumayal@gmail.com (Valide, Pas recommandé, Document)
PATCH http://shoes.me/connected (Valide, Pas recommandé, Document)

PATCH http://shoes.me/users (Valide, Document, Dangereux)

Je veux récupérer les utilisateurs qui vendent des chaussure avec la marque "nike"
---------------------------------------------------------------------------------
GET https://shoes.me/users?brand=nike (Valide, Collection)
get  https://shoes.me/users?type=vendeur&brands=nike (Valide, Collection)
GET http://shoes.me/users?type=vendeur&brand=nike (Valide, Collection)
GET https://shoes.me/shoes?brand=nike&order=ok/users (Pas valide)
GET https://shoes.me/users/shoes?brand=nike&order=ok (Pas valide)
GET https://shoes.me/band=nike?users=seller (Pas valide)
GET https://shoes.me/shoes/users/brand=nike (Pas valide)
GET http://shoes.me/users?vendor=nike (Valide, Collection)

GET https://shoes.me/users?shoes.brand=nike

GET http://shoes.me/users/vendors?brand=nike (Pas valide)
GET http://shoes.me/users?brand=nike (Pas valide)
GET http://shoes.me/vendors?brand=nike (Pas valide)
GET http://shoes.me/users?brand=nike (Pas valide)
GET http://shoes.me/users?vendorsnike (Valide)

```
