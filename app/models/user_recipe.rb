class UserRecipe < ApplicationRecord

  # Associations #######################################################
  has_one :user
  has_one :recipe

end