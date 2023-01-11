# La calculatrice

Le but de cette exercice et de créer une petite calculatrice

## 1. Installation

En utilisant les supports installer fastify.

## 2. Demarrage du serveur

En utilisant la fonction `listen` de l'application fastify ainsi que 2 variables d'environement, démarrer un serveur http sur le port 5353 et le host 127.0.0.1.

> Placer pour le moment l'intégralité du code dans le fichier `src/index.ts`

### 3. Création de la route d'addition

Créer une route en méthode `GET` permettant d'additioner 2 nombres. Cette route doit avoir comme chemin : `/calcul/add/:x/:y`.

> Vous pouvez tester cette route en utilisant votre navigateur et en vous rendant sur votre serveur à la route donnée.

### 4. Création de la route soustraction

Créer une route en méthode `GET` permettant de soustraire 2 nombres. Cette route doit avoir comme chemin : `/calcul/sub/:x/:y`.

> Vous pouvez tester cette route en utilisant votre navigateur et en vous rendant sur votre serveur à la route donnée.

### 5. Création de la route multiplication

Créer une route en méthode `GET` permettant de multiplier 2 nombres. Cette route doit avoir comme chemin : `/calcul/mul/:x/:y`.

> Vous pouvez tester cette route en utilisant votre navigateur et en vous rendant sur votre serveur à la route donnée.

### 5. Création de la route division

Créer une route en méthode `GET` permettant de diviser 2 nombres. Cette route doit avoir comme chemin : `/calcul/div/:x/:y`.

> Vous pouvez tester cette route en utilisant votre navigateur et en vous rendant sur votre serveur à la route donnée.

### 6. Création d'une route générique :

Créer une route en méthode `GET` permettant d'éxécuter un calcul. Cette route avoir comme chemin : `calculate/:x/:y`. Très important,
nous devons spécifier un querystring avec l'opération (`div`, `mul`, `sub` et `add`).

> Vous pouvez tester cette route en utilisant votre navigateur et en vous rendant sur votre serveur à la route donnée.

### Tester la calculatrice avec l'extension REST Client

1. Créer un fichier `request.http` à la racine de votre projet (vous pouvez inspirer du fichier [dèja existant](../../request.http))

2. Dans ce fichier créer
   une requête pour opération de notre calculatrice !
