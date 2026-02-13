class CreateRecipeIngredients < ActiveRecord::Migration[8.1]
  def change
    create_table :recipe_ingredients do |t|
      t.timestamps
      t.integer :recipe_id
      t.integer :ingredient_id
    end

    add_index :recipe_ingredients, [:recipe_id, :ingredient_id], unique: true
  end
end
