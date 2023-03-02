# Exercice MongoDB

## Enregistrer et mémoriser les résultat de notre calculatrice !

Dans le plugin des calculatrice `src/routes/calculatrice.ts`

> Il vous faut au préalable une base de données mongodb ATLAS

1. Installer et le plugin mongodb
2. Enregistrer et configurer le plugin mongodb dans `src/index.ts`
3. Dans toutes les routes du plugin `src/routes/calculatrice.ts`, enregistré le retour de la fonction dans une collection
   mongodb nommé `calculatrices`
4. (BONUS) Créer une routes `/calculatrice/results` qui retourne tout les résultats enregistré dans mongodb
