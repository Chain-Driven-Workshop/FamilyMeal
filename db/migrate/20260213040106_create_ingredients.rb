class CreateIngredients < ActiveRecord::Migration[8.1]
  def change
    create_table :ingredients do |t|
      t.timestamps
      t.string :name
      t.text :description
      t.integer :unit_cost
    end
  end
end
