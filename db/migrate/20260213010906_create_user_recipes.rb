class CreateUserRecipes < ActiveRecord::Migration[8.1]
  def change
    create_table :user_recipes do |t|
      t.timestamps
      t.integer :user_id
      t.integer :recipe_id
    end

    add_index :user_recipes, [:user_id, :recipe_id], unique: true
  end
end
