// 1.Enum //
enum OrderStatus{
    PENDING = "PENDING",
    PROCESSING = "PROCESSING",
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED",
}
// 2.INTERFACE CUSTOMER //
interface Customer {
    id: number;
    name: string;
    email: string
    phone: string;
    address: string;
    createdAt: Date;
}
// INTERFACE PRODUCT //
interface Product{
    id: number;
    name: string;
    price: number;
    stock: number;
    description: string;
}
// INTERFACE ORDER ITEM //
interface OrderItem{
    id: number;
    productId: number;
    quantity: number;
    price: number;
}
// 5.INTERFACE ORDER //
interface Order{
    id: number;
    customerId: number;
    items: OrderItem[];
    status: OrderStatus;
    totalAmount: number;
    createdAt: Date;
}
// 6.GENERIC INTERFACE //
interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}
// 7.GENERIC RESPOSITORY //
interface Repository<T extends { id: number }> {
  getAll(): T[];

  getById(id: number): T | undefined;

  create(item: T): T;

  update(id: number, data: Partial<T>): T | undefined;

  delete(id: number): boolean;
}
// 8.UTILITY TYPE - PICK//
type CreateCustomerDTO = Pick<
  Customer,
  "name" | "email" | "phone" | "address"
>;
// 9. UTILITY TYPE - OMIT //
type CreateProductDTO = Omit<Product, "id">;
// 10. UTILITY TYPE - PARTIAL //
type UpdateOrderDTO = Partial<
  Pick<Order, "status" | "items">
>;
// 11. GENERIC REPOSITORY IMPLEMENTATION //
class MemoryRepository<T extends { id: number }>
  implements Repository<T>
{
  private items: T[] = [];

  getAll(): T[] {
    return this.items;
  }

  getById(id: number): T | undefined {
    return this.items.find(
      (item) => item.id === id
    );
  }

  create(item: T): T {
    this.items.push(item);
    return item;
  }

  update(
    id: number,
    data: Partial<T>
  ): T | undefined {
    const item = this.getById(id);

    if (!item) {
      return undefined;
    }

    Object.assign(item, data);

    return item;
  }

  delete(id: number): boolean {
    const index = this.items.findIndex(
      (item) => item.id === id
    );

    if (index === -1) {
      return false;
    }

    this.items.splice(index, 1);

    return true;
  }
}
// 12. KHỞI TẠO REPOSITORY //
const customerRepository =
  new MemoryRepository<Customer>();

const productRepository =
  new MemoryRepository<Product>();

const orderRepository =
  new MemoryRepository<Order>();

// 13. TẠO CUSTOMER //
const newCustomer: Customer = {
  id: 1,
  name: "Nguyễn Văn A",
  email: "nguyenvana@gmail.com",
  phone: "0123456789",
  address: "Hà Nội",
  createdAt: new Date(),
};

customerRepository.create(newCustomer);

// 14. TẠO PRODUCT //
const product1: Product = {
  id: 1,
  name: "Laptop Dell",
  price: 20000000,
  stock: 10,
  description: "Laptop phục vụ học tập và làm việc",
};

const product2: Product = {
  id: 2,
  name: "Chuột Logitech",
  price: 500000,
  stock: 50,
  description: "Chuột không dây tiện lợi",
};

productRepository.create(product1);

productRepository.create(product2);


// 15. TẠO ORDER ITEM //

const orderItems: OrderItem[] = [
  {
    id: 1,
    productId: product1.id,
    quantity: 1,
    price: product1.price,
  },
  {
    id: 2,
    productId: product2.id,
    quantity: 2,
    price: product2.price,
  },
];
// 16. TÍNH TỔNG TIỀN //
function calculateTotal(
  items: OrderItem[]
): number {
  return items.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );
}
// 17. TẠO ORDER //
const newOrder: Order = {
  id: 1,
  customerId: newCustomer.id,
  items: orderItems,
  status: OrderStatus.PENDING,
  totalAmount: calculateTotal(orderItems),
  createdAt: new Date(),
};
//  18. CẬP NHẬT ORDER //
const updateData: UpdateOrderDTO = {
  status: OrderStatus.PROCESSING,
};

orderRepository.update(
  1,
  updateData
);
// 19. GENERIC FUNCTION //
function createResponse<T>(
  data: T,
  message: string
): ApiResponse<T> {
  return {
    success: true,
    message,
    data,
  };
}
// 20. TEST GENERIC RESPONSE //
const customerResponse =
  createResponse<Customer>(
    newCustomer,
    "Lấy thông tin khách hàng thành công"
  );

const orderResponse =
  createResponse<Order>(
    newOrder,
    "Tạo đơn hàng thành công"
  );

console.log(customerResponse);

console.log(orderResponse);

console.log(
  "Danh sách khách hàng:",
  customerRepository.getAll()
);

console.log(
  "Danh sách sản phẩm:",
  productRepository.getAll()
);

console.log(
  "Danh sách đơn hàng:",
  orderRepository.getAll()
);
