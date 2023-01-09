# Présentation & Installation

Pour commencer à développer en NodeJS il faut tou d'abord installer :

- node : Le compilateur (ou interpréteur)
- npm : Le package manager (chef d'orchestre)

Pour l'installation rien de plus simple, [rendez-vous sur le site officiel](https://nodejs.org/en/download/)

Pour s'assurer de l'instalation des 2 outils, il suffit d'ouvrir un terminal et de lancer
les commandes suivantes :

```bash
# Affiche la version de node (l'interpréteur)
node --version
# Affiche la version de npm
npm --version
```

## Commencer un projet

Pour démarrer n'importe quel projet nodejs, il faut tout d'abord générer un `package.json`. C'est un petit fichier qui contient toutes les inos de notre projet.

Pour créer ce `package.json` il faut utiliser la commande :

```bash
npm init
```

> Important : Il faut lancer cette commande uniquement au tout début du projet et dans un dossier vide de votre choix

## Anatomie d'un package.json

![Package.json](../images/package.png)
