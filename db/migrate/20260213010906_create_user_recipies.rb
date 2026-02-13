class CreateUserRecipies < ActiveRecord::Migration[8.1]
  def change
    create_table :user_recipies do |t|
      t.timestamps
      t.integer :user_id
      t.integer :recipe_id
    end

    add_index :user_recipies, [:user_id, :recipe_id], unique: true
  end
end
