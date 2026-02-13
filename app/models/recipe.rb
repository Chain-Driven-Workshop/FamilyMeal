class Recipe < ApplicationRecord

  # Associations #######################################################
  has_many :users, :through => :user_recipes
  has_many :ingredients, :through => :recipe_ingredients

end