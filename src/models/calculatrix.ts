import { z } from 'zod'
import zodToJsonSchema from 'zod-to-json-schema'

/**
 * @module model.calculatrix
 *
 * @description
 *  Contient les models, schémas et types pour la calculatrix
 */

/**
 * Création du model utiliser pour réaliser un calcule
 */
export const CalculModel = z.object({
  x: z.number(),
  y: z.number(),
  operation: z.enum(['addition', 'soustraction', 'multiplication', 'division']),
})

/**
 * Type typescript pour un calcul
 */
export type CalculType = z.infer<typeof CalculModel>

/**
 * Schéma pour le calcul
 */
export const CalculSchema = zodToJsonSchema(CalculModel)

/**
 * Model représentant le résultat de calculatrix
 */
export const ResultModel = z.object({
  resultat: z.number(),
})

/**
 * Type pour le resultat de la calculatrix
 */
export type ResultType = z.infer<typeof ResultModel>

/**
 * Schéma pour le resultat
 */
export const ResultSchema = zodToJsonSchema(ResultModel)
