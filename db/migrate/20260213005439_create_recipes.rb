class CreateRecipes < ActiveRecord::Migration[8.1]
  def change
    create_table :recipes do |t|
      t.timestamps
      t.string :name, null: false
      t.text :description
      t.text :instructions
    end
  end
end
