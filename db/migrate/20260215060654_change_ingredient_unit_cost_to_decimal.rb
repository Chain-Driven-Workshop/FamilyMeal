class ChangeIngredientUnitCostToDecimal < ActiveRecord::Migration[8.1]
  def change
    change_column :ingredients, :unit_cost, :decimal
  end
end
