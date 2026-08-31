"use strict";
// 1.Enum //
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["PENDING"] = "PENDING";
    OrderStatus["PROCESSING"] = "PROCESSING";
    OrderStatus["COMPLETED"] = "COMPLETED";
    OrderStatus["CANCELLED"] = "CANCELLED";
})(OrderStatus || (OrderStatus = {}));
// 11. GENERIC REPOSITORY IMPLEMENTATION //
class MemoryRepository {
    items = [];
    getAll() {
        return this.items;
    }
    getById(id) {
        return this.items.find((item) => item.id === id);
    }
    create(item) {
        this.items.push(item);
        return item;
    }
    update(id, data) {
        const item = this.getById(id);
        if (!item) {
            return undefined;
        }
        Object.assign(item, data);
        return item;
    }
    delete(id) {
        const index = this.items.findIndex((item) => item.id === id);
        if (index === -1) {
            return false;
        }
        this.items.splice(index, 1);
        return true;
    }
}
// 12. KHỞI TẠO REPOSITORY //
const customerRepository = new MemoryRepository();
const productRepository = new MemoryRepository();
const orderRepository = new MemoryRepository();
// 13. TẠO CUSTOMER //
const newCustomer = {
    id: 1,
    name: "Nguyễn Văn A",
    email: "nguyenvana@gmail.com",
    phone: "0123456789",
    address: "Hà Nội",
    createdAt: new Date(),
};
customerRepository.create(newCustomer);
// 14. TẠO PRODUCT //
const product1 = {
    id: 1,
    name: "Laptop Dell",
    price: 20000000,
    stock: 10,
    description: "Laptop phục vụ học tập và làm việc",
};
const product2 = {
    id: 2,
    name: "Chuột Logitech",
    price: 500000,
    stock: 50,
    description: "Chuột không dây tiện lợi",
};
productRepository.create(product1);
productRepository.create(product2);
// 15. TẠO ORDER ITEM //
const orderItems = [
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
function calculateTotal(items) {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
}
// 17. TẠO ORDER //
const newOrder = {
    id: 1,
    customerId: newCustomer.id,
    items: orderItems,
    status: OrderStatus.PENDING,
    totalAmount: calculateTotal(orderItems),
    createdAt: new Date(),
};
//  18. CẬP NHẬT ORDER //
const updateData = {
    status: OrderStatus.PROCESSING,
};
orderRepository.update(1, updateData);
// 19. GENERIC FUNCTION //
function createResponse(data, message) {
    return {
        success: true,
        message,
        data,
    };
}
// 20. TEST GENERIC RESPONSE //
const customerResponse = createResponse(newCustomer, "Lấy thông tin khách hàng thành công");
const orderResponse = createResponse(newOrder, "Tạo đơn hàng thành công");
console.log(customerResponse);
console.log(orderResponse);
console.log("Danh sách khách hàng:", customerRepository.getAll());
console.log("Danh sách sản phẩm:", productRepository.getAll());
console.log("Danh sách đơn hàng:", orderRepository.getAll());
