class Api::ProductsController < ApplicationController

  def index
    @products = Product.all
    render json: @products
  end

  def create
    @product = Product.create(product_params)
    if @product.save
      render json: @product, status: :created
    else
      render json: @product.errors, status: :unprocessable_entity
    end
  end

  def update
    @product = Product.find(params[:id])
    if @product.update(product_params)
      render json: @product, status: "Product updated"
    else
      render json: @product.errors, status: :unprocessable_entity
    end
  end

  def erase
    Product.destroy_all
  end

  def destroy
    @product = Product.find(params[:id])
    @product.destroy
  end

  private

  def product_params
    params.permit(:name, :price, :image)
  end

end
