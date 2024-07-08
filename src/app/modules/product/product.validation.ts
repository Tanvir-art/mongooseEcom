import { z } from 'zod';

const variantSchema = z.object({
  type: z.string({ required_error: 'Type is required' }),
  value: z.string({ required_error: 'Value is required' }),
});

const inventorySchema = z.object({
  quantity: z.number({ required_error: 'Quantity is required' }),
  inStock: z.boolean({ required_error: 'InStock is required' }),
});

const productCreateValidation = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    description: z.string({ required_error: 'Description is required' }),
    price: z.number({ required_error: 'Price is required' }),
    category: z.string({ required_error: 'Category is required' }),
    tags: z.array(z.string({ required_error: 'Tags is required' })),
    variants: z.array(variantSchema),
    inventory: inventorySchema,
  }),
});

const productUpdateValidation = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }).optional(),
    description: z
      .string({ required_error: 'Description is required' })
      .optional(),
    price: z.number({ required_error: 'Price is required' }).optional(),
    category: z.string({ required_error: 'Category is required' }).optional(),
    tags: z.array(z.string({ required_error: 'Tags is required' })).optional(),
    variants: z.array(variantSchema).optional(),
    inventory: inventorySchema.optional(),
  }),
});

export const productValidation = {
  productCreateValidation,
  productUpdateValidation,
};
