class Product < ActiveRecord::Base
  validates_presence_of :name, :price
  has_attached_file :image
  validates_attachment :image,
                       content_type: { content_type: ["image/jpeg", "image/gif", "image/png", "image/jpg"] }
end
