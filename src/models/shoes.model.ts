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

/**
 * Définission de SearchShoesCriteriaModel
 */
export const SearchShoesCriteriaModel = z.object({
  limit: z.number().optional().default(20),
  page: z.number().min(1).optional().default(1),
  orderBy: z
    .enum([
      '_id',
      'price',
      'title',
      'model',
      'brand',
      'color',
      'size',
      'condition',
    ])
    .optional()
    .default('_id'),
  direction: z
    .enum(['-1', '1'])
    .optional()
    .default('1')
    .transform(dir => parseInt(dir)),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  color: z.string().optional(),
  minSize: z.number().optional(),
  maxSize: z.number().optional(),
  condition: z.string().optional(),
  user: z.string().optional(),
})

/**
 * Type de SearchShoesCriteriaModel
 */
export type SearchShoesCriteriaType = z.infer<typeof SearchShoesCriteriaModel>

/**
 * Schéma de SearchShoesCriteriaModel
 */
export const SearchShoesCriteriaSchema = zodToJsonSchema(
  SearchShoesCriteriaModel,
)

/**
 * Définission de ShoesCollectionModel
 */
export const ShoesCollectionModel = z.array(ShoesModel)

/**
 * Type de ShoesCollectionModel
 */
export type ShoesCollectionType = z.infer<typeof ShoesCollectionModel>

/**
 * Schéma de ShoesCollectionModel
 */
export const ShoesCollectionSchema = zodToJsonSchema(ShoesCollectionModel)

/**
 * Définission de UpdateShoesModel
 */
export const UpdateShoesModel = NewShoesModel.partial()

/**
 * Type de UpdateShoesModel
 */
export type UpdateShoesType = z.infer<typeof UpdateShoesModel>

/**
 * Schéma de UpdateShoesModel
 */
export const UpdateShoesSchema = zodToJsonSchema(UpdateShoesModel)

/**
 * Définission de IdOwnerModel
 */
export const IdOwnerModel = z.object({
  id: z.string(),
})

/**
 * Type de IdOwnerModel
 */
export type IdOwnerType = z.infer<typeof IdOwnerModel>

/**
 * Schéma de IdOwnerModel
 */
export const IdOwnerSchema = zodToJsonSchema(IdOwnerModel)
