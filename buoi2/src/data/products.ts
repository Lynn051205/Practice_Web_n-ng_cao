export interface Product {
  id: number
  name: string
  category: string
  price: number
  color: string
  accent: string
}

export const products: Product[] = [
  { id: 1, name: 'Aurora Desk Lamp', category: 'Workspace', price: 890000, color: 'Warm white', accent: '#d66b48' },
  { id: 2, name: 'Kanso Ceramic Set', category: 'Kitchen', price: 620000, color: 'Stone', accent: '#778c72' },
  { id: 3, name: 'Field Notes Journal', category: 'Stationery', price: 185000, color: 'Terracotta', accent: '#c48761' },
  { id: 4, name: 'Linen Throw Blanket', category: 'Living', price: 1240000, color: 'Oat', accent: '#b19b7d' },
  { id: 5, name: 'Orbit Wall Clock', category: 'Workspace', price: 980000, color: 'Ink', accent: '#53636f' },
  { id: 6, name: 'Noma Glass Bottle', category: 'Everyday', price: 390000, color: 'Sage', accent: '#819c8a' },
  { id: 7, name: 'Cedar Tray', category: 'Kitchen', price: 740000, color: 'Cedar', accent: '#a66c48' },
  { id: 8, name: 'Folded Canvas Tote', category: 'Everyday', price: 460000, color: 'Indigo', accent: '#5d6f95' },
  { id: 9, name: 'Mori Table Vase', category: 'Living', price: 530000, color: 'Moss', accent: '#6f7d66' },
  { id: 10, name: 'Studio Pen Set', category: 'Stationery', price: 270000, color: 'Graphite', accent: '#5e6263' },
]
