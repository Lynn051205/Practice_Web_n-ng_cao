import type { Product } from '../stores/useFavoritesStore'

export const products: Product[] = [
  {
    id: 1,
    name: 'Kinto Travel Tumbler',
    category: 'Đồ dùng hằng ngày',
    price: 680000,
    color: '#d9e8df',
    accent: '#567d68',
    image: '/products/kinto.svg',
    description:
      'Bình giữ nhiệt minh họa trong bộ sưu tập demo, thiết kế gọn nhẹ cho những chuyến đi hằng ngày.',
  },
  {
    id: 2,
    name: 'Rains Backpack Mini',
    category: 'Phụ kiện',
    price: 1450000,
    color: '#e6d9cd',
    accent: '#9a6243',
    image: '/products/rains.svg',
    description:
      'Ba lô mini minh họa với kiểu dáng tối giản, được giới thiệu như dữ liệu mẫu của bài tập.',
  },
  {
    id: 3,
    name: 'New Balance 530',
    category: 'Giày thể thao',
    price: 2390000,
    color: '#d9e1eb',
    accent: '#61768f',
    image: '/products/new-balance.svg',
    description:
      'Giày thể thao minh họa trong danh mục demo; tên và giá chỉ phục vụ bài tập giao diện.',
  },
  {
    id: 4,
    name: 'Muuto Kettle Teapot',
    category: 'Nhà cửa',
    price: 1120000,
    color: '#ead8dc',
    accent: '#a55c70',
    image: '/products/muuto.svg',
    description:
      'Ấm trà minh họa dành cho danh mục nhà cửa, với hình ảnh và thông tin mẫu.',
  },
]

export function getProductById(id: number): Product | undefined {
  return products.find((product) => product.id === id)
}
