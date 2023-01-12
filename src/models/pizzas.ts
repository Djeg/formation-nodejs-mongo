import { z } from 'zod'
import zodToJsonSchema from 'zod-to-json-schema'

/**
 * @module models.pizzas
 *
 * @description
 *  Contient les models, types et schémas pour des pizzas
 */

/**
 * Définission de PizzaModel
 */
export const PizzaModel = z.object({
  _id: z.string(),
  name: z.string().min(3),
  prix: z.number(),
})

/**
 * Type de PizzaModel
 */
export type PizzaType = z.infer<typeof PizzaModel>

/**
 * Schéma de PizzaModel
 */
export const PizzaSchema = zodToJsonSchema(PizzaModel)

/**
 * Définission de NewPizzaModel
 */
export const NewPizzaModel = PizzaModel.omit({ _id: true })

/**
 * Type de NewPizzaModel
 */
export type NewPizzaType = z.infer<typeof NewPizzaModel>

/**
 * Schéma de NewPizzaModel
 */
export const NewPizzaSchema = zodToJsonSchema(NewPizzaModel)

/**
 * Définission de PizzaListModel
 */
export const PizzaListModel = z.array(PizzaModel)

/**
 * Type de PizzaListModel
 */
export type PizzaListType = z.infer<typeof PizzaListModel>

/**
 * Schéma de PizzaListModel
 */
export const PizzaListSchema = zodToJsonSchema(PizzaListModel)
