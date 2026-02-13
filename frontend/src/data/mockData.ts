export type Recipe = {
  id: string
  name: string
  description: string
  instructions: string
  notes: string
  ingredients: string[]
}

export type Ingredient = {
  id: string
  name: string
  description: string
  cost: number
  unit: string
  allergens: string
}

export const recipes: Recipe[] = [
  {
    id: 'r-1',
    name: 'Classic Pancakes',
    description: 'Fluffy breakfast pancakes with a buttery finish.',
    instructions:
      'Whisk dry ingredients, fold in wet ingredients, rest batter 10 minutes, then cook on a hot griddle.',
    notes: 'Great for weekend brunch. Add blueberries for variety.',
    ingredients: ['i-1', 'i-2', 'i-3', 'i-4'],
  },
  {
    id: 'r-2',
    name: 'Garden Tomato Soup',
    description: 'Smooth tomato soup with basil and cream.',
    instructions:
      'Saute onion and garlic, add tomatoes and stock, simmer 25 minutes, blend, finish with cream.',
    notes: 'Serve with grilled cheese.',
    ingredients: ['i-5', 'i-6', 'i-7', 'i-8'],
  },
  {
    id: 'r-3',
    name: 'Herb Roast Chicken',
    description: 'Roasted chicken with lemon, garlic, and herbs.',
    instructions:
      'Season chicken, stuff with lemon and herbs, roast at 425F until internal temp is 165F.',
    notes: 'Rest 15 minutes before carving.',
    ingredients: ['i-9', 'i-10', 'i-11', 'i-12'],
  },
]

export const ingredients: Ingredient[] = [
  { id: 'i-1', name: 'All-Purpose Flour', description: 'Standard baking flour.', cost: 0.9, unit: 'cup', allergens: 'Gluten' },
  { id: 'i-2', name: 'Whole Milk', description: 'Milk for batter hydration.', cost: 0.5, unit: 'cup', allergens: 'Dairy' },
  { id: 'i-3', name: 'Eggs', description: 'Large chicken eggs.', cost: 0.35, unit: 'each', allergens: 'Egg' },
  { id: 'i-4', name: 'Butter', description: 'Unsalted butter.', cost: 0.4, unit: 'tbsp', allergens: 'Dairy' },
  { id: 'i-5', name: 'Roma Tomatoes', description: 'Fresh tomatoes for soup base.', cost: 0.8, unit: 'cup', allergens: 'None' },
  { id: 'i-6', name: 'Yellow Onion', description: 'Aromatic base ingredient.', cost: 0.25, unit: 'each', allergens: 'None' },
  { id: 'i-7', name: 'Vegetable Stock', description: 'Low-sodium vegetable stock.', cost: 0.6, unit: 'cup', allergens: 'Celery' },
  { id: 'i-8', name: 'Heavy Cream', description: 'Cream for texture and richness.', cost: 0.7, unit: 'cup', allergens: 'Dairy' },
  { id: 'i-9', name: 'Whole Chicken', description: 'Fresh whole chicken.', cost: 9.5, unit: 'each', allergens: 'None' },
  { id: 'i-10', name: 'Lemon', description: 'Fresh lemon for brightness.', cost: 0.6, unit: 'each', allergens: 'None' },
  { id: 'i-11', name: 'Garlic', description: 'Fresh garlic cloves.', cost: 0.15, unit: 'clove', allergens: 'None' },
  { id: 'i-12', name: 'Mixed Herbs', description: 'Rosemary, thyme, and parsley blend.', cost: 0.3, unit: 'tbsp', allergens: 'None' },
]
