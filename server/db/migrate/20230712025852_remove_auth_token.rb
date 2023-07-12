class RemoveAuthToken < ActiveRecord::Migration[7.0]
  def change
    remove_column :users, :auth_token
  end
end
