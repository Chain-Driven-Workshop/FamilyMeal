class Api::V1::RecipesController < ApplicationController

  before_action :authenticate_user!

  def index
    @recipes = current_user.recipes
    render json: {
      status: 200,
      data: @recipes,
    }, status: :ok
  end

  def show
    @recipe = current_user.recipes.find(params[:id])
    render json: {
      status: 200,
      data: @recipe,
    }, status: :ok 
  end
end