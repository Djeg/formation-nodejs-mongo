// Pour réaliser ces exercices vous pouvez utiliser les supports typescript :
// https://github.com/Djeg/formation-react/tree/training/typescript

// Créer deux constantes de type number
// contenant les chiffres 10 et 5
const a: number = 10
const b: number = 5

// Utiliser console.log pour afficher les 2 constantes
console.log(a, b)

// Créer une constante notes de type tableaux de number
// contenant les deux constantes plus haut ainsi que la note 12
const notes: number[] = [a, b, 12]

// Afficher dans la console le tableaux de note en utilisant console.table
console.table(notes)

// Créer une fonction nommé « ordonnerNotes » accéptant un paramètre
// de type tableaux de notes. Cette fonction doit retourner un nouveau
// tableaux de note mais trier par note croissante
// (indice il vous faudra utiliser la méthode d'un tableaux : sort)
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
// function ordonnerNotes(notes: number[]) {
//   const newNotes = [...notes]
//
//   newNotes.sort((a, b) => a - b)
//
//   return newNotes
// }
// const ordonnerNotes = (notes: number[]) => {
//   const newNotes = [...notes]
//
//   newNotes.sort((a, b) => a - b)
//
//   return newNotes
// }
//
// const ordonnerNotes = (notes: number[]) => {
//   return [...notes].sort((a, b) => a - b)
// }

const ordonnerNotes = (tartenpion: number[]) =>
  [...tartenpion].sort((a, b) => a - b)

// Essayer d'afficher le resultat de la fonction ordonnerNote dans la console
console.table(ordonnerNotes(notes))
console.table(notes)

// Créer un type « Student » qui sera un objet contenant les champs suivant
// nom: string, prenom: string, age: number, notes: tableaux de number
type Student = {
  nom: string
  prenom: string
  age: number
  notes: number[]
}

// Créer une constante de type « Student », vous pouvez lui spécifier les valeurs
// de votre choix
const john: Student = {
  nom: 'Doe',
  prenom: 'John',
  age: 32,
  notes: [12, 5, 13, 14, 17],
}

// Afficher la constante dans la console en utilisant console.table
console.table(john)

// Créer une fonction, accéptant un paramètre de Type student et affichant la chaïne de
// caractère suivante :
// « Bonjour <eleve.nom> <eleve.prenom>, vous avez <eleve.age> ans »
// function displayStudent(student: Student) {
//   return `Bonjour ${student.nom} ${student.prenom}, vous avez ${student.age} ans`
// }
// const displayStudent = (student: Student) =>
//  `Bonjour ${student.nom} ${student.prenom}, vous avez ${student.age} ans`
const displayStudent = ({ nom, prenom, age }: Student) =>
  `Bonjour ${nom} ${prenom}, vous aves ${age} ans`

// Afficher le resultat de cette fonction dans la console
console.log(displayStudent(john))

// Créer une fonction afficher notes qui accépte un paramètre de type tableaux de number
// et qui retourne un chaïne de caractère suivante :
// imaginons les notes suivante: [12, 10, 5] la fonction doit retourner :
// « Note n°1 : 12 / 20, Note n°2 : 10 / 20, Note n°3 : 05 / 20 »
// Solution Imperative :
// const displayNotes = (notes: number[]) => {
//   let sentence = ''
//
//   for (let index in notes) {
//     if (sentence === '') {
//       sentence = `Note n°${parseInt(index) + 1} : ${notes[index]} / 20`
//     } else {
//       sentence = `${sentence}, Note n°${parseInt(index) + 1} : ${
//         notes[index]
//       } / 20`
//     }
//   }
//
//   return sentence
// }
//
// Solution Fonctionnel :
// const displayNote = (note: number, numero: number) =>
//   `Note n°${numero + 1} : ${note} / 20`
//
// const displayNotes = (notes: number[]) => notes.map(displayNote).join(', ')

/**
 * Cette fonction affiche toutes les notes. Elle utilise les opérations
 * sur les tableaux : map et join
 */
const displayNotes = (notes: number[]) =>
  notes.map((note, index) => `Note n°${index + 1} : ${note} / 20`).join(', ')

console.log(displayNotes(john.notes))

// Créer une fonction moyenne qui accépte un tableaux de notes et retourne la moyenne
// de toutes les notes

// Créer un type ProfPrincipal qui peut être soit :
// une chaine de caractère
// un objet avec les champs suivant : { nom: string, prenom: string, matiere: string }

// Créer un type Identifiable qui accépte un générique et produit le type suivant :
// { id: <Generic> }

// En utilisant le type identifiable, créer un type IdentifiableStudent qui fusionne
// un identifiable d'un nomber avec une Student
