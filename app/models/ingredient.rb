class Ingredient < ApplicationRecord

  # Associations #######################################################
  has_one :user, :through => :user_ingredients
  has_many :recipe_ingredients

end