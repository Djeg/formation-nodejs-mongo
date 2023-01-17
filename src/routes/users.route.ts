import { FastifyInstance } from 'fastify'
import { NewUserModel, UserModel } from '../models/users.model'

/**
 * @module users.route
 *
 * @description
 *  Contient la logique de toutes les routes concernant les utilisateurs
 */

/**
 * Plugin contenant toutes les routes concernant les utilisateurs
 */
export default async function users(app: FastifyInstance) {
  /**
   * Route permettant de créer un nouvel utilisateur sur l'application.
   */
  app.post('/users', async (request, reply) => {
    // Je valide la "body" de la requête en utilisant le
    // NewUserModel. Je m'assure ainsi que toutes les données
    // sont correct
    const newUser = NewUserModel.parse(request.body)

    // On enregistre le nouvel utilisateur dans la base de données
    const result = await app.mongo.db?.collection('users').insertOne({
      email: newUser.email,
      firstname: newUser.firstname,
      lastname: newUser.lastname,
      password: newUser.password,
    })

    // On récupére l'utilisateur tout juste enregistré dans la base de données
    const user = await app.mongo.db?.collection('users').findOne({
      _id: result?.insertedId,
    })

    // On retourne l'utilisateur validé par un Model
    return UserModel.parse(user)
  })
}
