import { FastifyInstance } from 'fastify'
import {
  NewUserModel,
  NewUserSchema,
  UserCollectionModel,
  UserCollectionSchema,
  UserCredentialModel,
  UserCredentialSchema,
  UserModel,
  UserSchema,
  UserSearchCriteriaModel,
  UserSearchCriteriaSchema,
  UserTokenModel,
  UserTokenSchema,
} from '../models/users.model'

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
  app.post(
    '/users',
    { schema: { body: NewUserSchema, response: { 201: UserSchema } } },
    async (request, reply) => {
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

      // On retourne le code 201
      reply.code(201)

      // On retourne l'utilisateur validé par un Model
      return UserModel.parse(user)
    },
  )

  /**
   * Route permettant de lister des utilisateurs de l'api
   */
  app.get(
    '/users',
    {
      schema: {
        querystring: UserSearchCriteriaSchema,
        response: { 200: UserCollectionSchema },
      },
    },
    async request => {
      // Je vérifie de bien recevoir un jeton de connexion
      await request.jwtVerify()

      // Récupération des critéres de recherches
      const criterias = UserSearchCriteriaModel.parse(request.query)

      // On lance la requête à la base de données permettant de récupérer
      // les utilisateurs correspondant aux critéres de recherche
      const data = await app.mongo.db
        ?.collection('users')
        .find(
          criterias.email
            ? {
                email: new RegExp(`${criterias.email}`),
              }
            : {},
        )
        .limit(criterias.limit)
        .skip((criterias.page - 1) * criterias.limit)
        .sort({ [criterias.orderBy]: criterias.direction })
        .toArray()

      // On retourne les résultat de la recherche
      return UserCollectionModel.parse(data)
    },
  )

  /**
   * Route de création d'un jeton de connexion
   */
  app.post(
    '/token',
    {
      schema: {
        body: UserCredentialSchema,
        response: { 201: UserTokenSchema },
      },
    },
    async (request, reply) => {
      // On récupére les données envoyé par l'utilisateur
      const credential = UserCredentialModel.parse(request.body)

      // On récupére l'utilisateur correspondant dans la base de données
      const data = await app.mongo.db?.collection('users').findOne({
        email: credential.email,
        password: credential.password,
      })

      // Si il n'éxiste pas d'utilisateur
      if (!data) {
        reply.code(400)

        return {
          error: 'Bad credentials',
        }
      }

      // On s'assure que les données de la base de données corresponde bien
      // à notre model
      const user = UserModel.parse(data)

      // On génére notre UserTokenModel avec un jeton de connexion
      return UserTokenModel.parse({
        token: app.jwt.sign({ _id: user._id, email: user.email }),
      })
    },
  )
}
