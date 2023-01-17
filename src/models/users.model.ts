import { createHash, createHmac } from 'crypto'
import { z } from 'zod'
import zodToJsonSchema from 'zod-to-json-schema'

/**
 * @module users.model
 *
 * @description
 *  Ce module contient tous les modèles concernant les utilisateurs
 */

/**
 * Model pour un mot de passe
 */
export const PasswordModel = z
  .string()
  .min(5)
  .transform(pass =>
    createHmac('sha256', process.env.API_KEY_SECRET || 'secret')
      .update(pass)
      .digest('hex'),
  )

/**
 * Définission de NewUserModel
 */
export const NewUserModel = z
  .object({
    email: z.string().email(),
    firstname: z.string(),
    lastname: z.string(),
    password: PasswordModel,
    repeatedPassword: PasswordModel,
  })
  .refine(newUser => newUser.password === newUser.repeatedPassword, {
    message: 'Your passwords must match',
  })

/**
 * Type de NewUserModel
 */
export type NewUserType = z.infer<typeof NewUserModel>

/**
 * Schéma de NewUserModel
 */
export const NewUserSchema = zodToJsonSchema(NewUserModel)

/**
 * Définission de UserModel
 */
export const UserModel = z.object({
  _id: z.preprocess(id => `${id}`, z.string()),
  email: z.string().email(),
  firstname: z.string(),
  lastname: z.string(),
  password: z.string(),
})

/**
 * Type de UserModel
 */
export type UserType = z.infer<typeof UserModel>

/**
 * Schéma de UserModel
 */
export const UserSchema = zodToJsonSchema(UserModel)

/**
 * Définission de UserSearchCriteriaModel
 */
export const UserSearchCriteriaModel = z.object({
  limit: z.number().min(2).max(100).optional().default(20),
  page: z.number().min(1).optional().default(1),
  orderBy: z
    .enum(['_id', 'email', 'firstname', 'lastname'])
    .optional()
    .default('_id'),
  direction: z
    .enum(['asc', 'desc'])
    .optional()
    .default('asc')
    .transform(dir => ('asc' === dir ? 1 : -1)),
  email: z.string().optional(),
})

/**
 * Type de UserSearchCriteriaModel
 */
export type UserSearchCriteriaType = z.infer<typeof UserSearchCriteriaModel>

/**
 * Schéma de UserSearchCriteriaModel
 */
export const UserSearchCriteriaSchema = zodToJsonSchema(UserSearchCriteriaModel)

/**
 * Définission de UserCollectionModel
 */
export const UserCollectionModel = z.array(UserModel)

/**
 * Type de UserCollectionModel
 */
export type UserCollectionType = z.infer<typeof UserCollectionModel>

/**
 * Schéma de UserCollectionModel
 */
export const UserCollectionSchema = zodToJsonSchema(UserCollectionModel)

/**
 * Définission de UserCredentialModel
 */
export const UserCredentialModel = z.object({
  email: z.string().email(),
  password: PasswordModel,
})

/**
 * Type de UserCredentialModel
 */
export type UserCredentialType = z.infer<typeof UserCredentialModel>

/**
 * Schéma de UserCredentialModel
 */
export const UserCredentialSchema = zodToJsonSchema(UserCredentialModel)

/**
 * Définission de UserTokenModel
 */
export const UserTokenModel = z.object({
  token: z.string(),
})

/**
 * Type de UserTokenModel
 */
export type UserTokenType = z.infer<typeof UserTokenModel>

/**
 * Schéma de UserTokenModel
 */
export const UserTokenSchema = zodToJsonSchema(UserTokenModel)
