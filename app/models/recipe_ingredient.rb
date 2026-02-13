class RecipeIngredient < ApplicationRecord

  # Associations #######################################################
  belongs_to :recipe
  belongs_to :ingredient

end