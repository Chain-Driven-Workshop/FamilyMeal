class User < ApplicationRecord
  extend Devise::Models

  include Devise::JWT::RevocationStrategies::JTIMatcher
  before_validation :ensure_jti

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: self

  private

  def ensure_jti
    self.jti ||= SecureRandom.uuid
  end
end
