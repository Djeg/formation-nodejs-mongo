# Nodemon et DotEnv

## Nodemon

Lorsque l'on développe une application node js, il y a de forte chance que cette application soit ce que l'on appel un `daemon` : **C'est un programme qui démarre et qui n'as pas de fin**.

Du coup, il est parfois difficile de modifier le code source d'un daemon sans avoir à le redémarrer. Il éxiste pour ça un programme s'occupant du redémarrage automatiquement pour nous, c'est `nodemon`.

L'idée est très simple, redémarrer automatiquement à chaque changement de code notre programme.

Pour mettre en place ce `nodemon`, il suffit tout d'abord de l'installer :

```bash
npm i -D nodemon
```

Une fois l'installation faite, il suffit de le paramètré dans le script de notre package.json :

```json
"start:dev": "ts-node src/index.ts",
"start:daemon": "nodemon -e .ts,.js,.json -w src -x \"npm run start:dev\""
```
