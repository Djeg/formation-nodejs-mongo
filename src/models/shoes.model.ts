import { z } from 'zod'
import zodToJsonSchema from 'zod-to-json-schema'
import { UserModel } from './users.model'

/**
 * @module shoes.model
 *
 * @description
 *  Ce module contient les modèles concernant les chaussures
 */

/**
 * Définission de NewShoesModel
 */
export const NewShoesModel = z.object({
  title: z.string().min(3),
  price: z.number().min(5),
  model: z.string().min(2),
  brand: z.string().min(2),
  pictures: z.array(z.string().url()),
  description: z.string().optional(),
  color: z.string().regex(/^[a-f0-9A-F]{6}$|^[a-f0-9A-F]{3}$/),
  condition: z.enum(['new', 'less new', 'worn', 'very worn']),
  size: z.number().min(10).max(70),
})

/**
 * Type de NewShoesModel
 */
export type NewShoesType = z.infer<typeof NewShoesModel>

/**
 * Schéma de NewShoesModel
 */
export const NewShoesSchema = zodToJsonSchema(NewShoesModel)

/**
 * Définission de ShoesModel
 */
export const ShoesModel = NewShoesModel.extend({
  _id: z.preprocess(id => `${id}`, z.string()),
  user: UserModel,
})

/**
 * Type de ShoesModel
 */
export type ShoesType = z.infer<typeof ShoesModel>

/**
 * Schéma de ShoesModel
 */
export const ShoesSchema = zodToJsonSchema(ShoesModel)
