import { products } from '../../../data/products'

export async function GET(): Promise<Response> {
  return Response.json(products)
}
