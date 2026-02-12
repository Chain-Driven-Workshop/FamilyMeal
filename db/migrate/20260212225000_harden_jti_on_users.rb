class HardenJtiOnUsers < ActiveRecord::Migration[8.1]
  class MigrationUser < ActiveRecord::Base
    self.table_name = "users"
  end

  def up
    MigrationUser.reset_column_information

    MigrationUser.where(jti: nil).find_each do |user|
      user.update_columns(jti: SecureRandom.uuid)
    end

    remove_index :users, :jti if index_exists?(:users, :jti)
    change_column_null :users, :jti, false
    add_index :users, :jti, unique: true
  end

  def down
    remove_index :users, :jti if index_exists?(:users, :jti)
    add_index :users, :jti
    change_column_null :users, :jti, true
  end
end
