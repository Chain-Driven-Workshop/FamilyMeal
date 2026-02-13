class CreateUserIngredients < ActiveRecord::Migration[8.1]
  def change
    create_table :user_ingredients do |t|
      t.timestamps
      t.integer :user_id
      t.integer :ingredient_id
    end

    add_index :user_ingredients, [:user_id, :ingredient_id], unique: true
  end
end
