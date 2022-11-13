import Image from './Image'

interface Product {
  _id: string,
  name: string,
  category: string,
  price: number,
  currency: string,
  image: Image,
  bestseller: boolean,
  featured: boolean,
  description: string,
  updated_at: string,
  created_at: string
  people_also_buy: Array<Product>
}

export default Product