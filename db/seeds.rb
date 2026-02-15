# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

# --- Users ---
user1 = User.create!(
  email: "user@example.com",
  password: "aoeuaoeu",
  password_confirmation: "aoeuaoeu"
)

user2 = User.create!(
  email: "chef@example.com",
  password: "aoeuaoeu",
  password_confirmation: "aoeuaoeu"
)

# --- Ingredients ---
flour = Ingredient.create!(
  name: "Flour",
  description: "All-purpose flour",
  unit_cost: 2
)

sugar = Ingredient.create!(
  name: "Sugar",
  description: "Granulated sugar",
  unit_cost: 1
)

eggs = Ingredient.create!(
  name: "Eggs",
  description: "Large chicken eggs",
  unit_cost: 3
)

milk = Ingredient.create!(
  name: "Milk",
  description: "Whole milk",
  unit_cost: 4
)

butter = Ingredient.create!(
  name: "Butter",
  description: "Unsalted butter",
  unit_cost: 5
)

# --- Recipes ---
pancakes = Recipe.create!(
  name: "Pancakes",
  description: "Fluffy breakfast pancakes",
  instructions: "Mix ingredients. Cook on griddle."
)

cookies = Recipe.create!(
  name: "Sugar Cookies",
  description: "Classic soft cookies",
  instructions: "Mix dough. Bake at 350°F for 10 minutes."
)

omelette = Recipe.create!(
  name: "Omelette",
  description: "Simple egg omelette",
  instructions: "Whisk eggs. Cook in pan with butter."
)

# --- Recipe Ingredients ---
RecipeIngredient.create!([
  { recipe: pancakes, ingredient: flour },
  { recipe: pancakes, ingredient: eggs },
  { recipe: pancakes, ingredient: milk },
  { recipe: pancakes, ingredient: butter },

  { recipe: cookies, ingredient: flour },
  { recipe: cookies, ingredient: sugar },
  { recipe: cookies, ingredient: butter },
  { recipe: cookies, ingredient: eggs },

  { recipe: omelette, ingredient: eggs },
  { recipe: omelette, ingredient: butter },
  { recipe: omelette, ingredient: milk }
])

# --- User Ingredients (pantry items) ---
UserIngredient.create!([
  { user: user1, ingredient: eggs },
  { user: user1, ingredient: milk },
  { user: user1, ingredient: butter },

  { user: user2, ingredient: flour },
  { user: user2, ingredient: sugar },
  { user: user2, ingredient: eggs }
])

# --- User Recipes (saved recipes) ---
UserRecipe.create!([
  { user: user1, recipe: pancakes },
  { user: user1, recipe: omelette },

  { user: user2, recipe: cookies }
])

