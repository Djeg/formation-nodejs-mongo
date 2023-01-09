# Créer son premier projet nodejs

En utilisant NPM, créer dans un dossier votre premier `package.json` !

> BONUS : Vous pouvez utiliser GIT pour mettre votre projet sur github !

## Installer et configurer typescript

À l'aide des commandes dans le support installer typescript et le support de nodejs. Ensuite généré un fichier de configuration pour typescript.

Dans le fichier de configuration typescript changer les options "outDir" et "rootDir" par réspéctivement "dist", "src".

> Bonus, n'hésiter pas ignorer les dossiers node_modules et dist sur git

## Créer notre premier fichier typescript

Créé un dossier `src` à la racine de votre application et placer un fichier `index.ts` avec le contenu suivant :

```ts
console.log('coucou')
```

## Mettre en place les commande du projet

Dans le fichier `package.json` ajouter les commandes suivantes :

- "build" : Cette commande doit compiler tout le code typescript dans un dossier `dist`
- "start" : Cette commande lance le fichier compilé par typescript `dist/index.js`
- "start:dev" : Cette commande utilise `ts-node` et compile + lance le fichier `src/index.ts`

> A la fin mettre votre code sur github
