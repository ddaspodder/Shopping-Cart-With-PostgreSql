import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { Prisma } from "@prisma/client";

const connectionString = `postgresql://neondb_owner:npg_rDa0O4gEGxLo@ep-billowing-feather-apl4nno8-pooler.c-7.us-east-1.aws.neon.tech/shopping_cart_prisma?sslmode=require&channel_binding=require`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const getAllProducts = async () => {
  const filters = {
    name: { contains: "Gaming Chair", mode: "insensitive" },
  };
  return prisma.products.findMany({
    where: { isActive: true, ...(filters as Prisma.ProductsWhereInput) },
  });
};

const totalSpentByUser = async (userId: number) =>
  prisma.orders.aggregate({
    _sum: { totalAmount: true },
    where: { userId },
  });

const totalItemsSoldPerProduct = async () => {
  const totalItems = await prisma.orderItems.groupBy({
    by: ["productId"],
    _sum: { quantity: true },
  });

  const products = await prisma.products.findMany({
    where: { id: { in: totalItems.map((r) => r.productId) } },
  });

  const result = totalItems.map((r) => ({
    totalItems: r._sum.quantity,
    ...products.find((p) => p.id === r.productId),
  }));
  return result;
};

const totalItemsSoldPerProductBetter = async () =>
  prisma.products
    .findMany({
      select: { id: true, name: true, orderItems: { select: { id: true } } },
      where: {
        orderItems: { some: {} },
      },
    })
    .then((res) =>
      res.map((r) => ({
        id: r.id,
        name: r.name,
        totalItems: r.orderItems.reduce((s) => s + 1, 0),
      })),
    );

const totalItemsSoldPerProductRaw =
  async () => prisma.$queryRaw`SELECT p.*, SUM(oi.quantity) AS total_items
FROM products AS p INNER JOIN order_items as oi ON p.id = oi.product_id GROUP BY p.id`;

const numberOfOrdersPerDay = async () => {
  const result: { created_date: string; order_count: BigInt }[] =
    await prisma.$queryRaw`SELECT
    created_at::DATE as created_date,
    COUNT(id) as order_count
FROM orders
GROUP BY
    created_at::DATE;`;

  return result.map((r) => ({ ...r, order_count: Number(r.order_count) }));
};

const top5ProductsByRevenue = async () => {
  const revenuePerProduct = await prisma.orderItems.groupBy({
    by: ["productId"],
    _sum: { price: true },
  });
  return revenuePerProduct.slice(0, 5);
};

const usersWithMoreThan1Orders = async () =>
  prisma.orders.groupBy({
    by: ["userId"],
    _count: { _all: true },
    having: {
      userId: {
        _count: {
          gt: 1, // only include users with > 5 orders
        },
      },
    },
  });

const revenuePerUser = async () =>
  prisma.orders.groupBy({ by: ["userId"], _sum: { totalAmount: true } });

const revenuePerProduct = async () =>
  prisma.orderItems.groupBy({ by: ["productId"], _sum: { price: true } });

const usersWithNoOrders = async () =>
  prisma.users.findMany({
    where: {
      orders: {
        none: {},
      },
    },
  });

const productsNotOrdered = async () =>
  prisma.products.findMany({
    where: { orderItems: { none: {} } },
  });

const cartsWithMoreThan3Items = async () =>
  prisma.cartItems.groupBy({
    by: ["cartId"],
    having: { cartId: { _count: { gt: 3 } } },
  });

const totalItemsInCart = async () =>
  prisma.carts.findMany({
    where: {
      cartItems: { some: {} },
    },
    select: {
      _count: { select: { cartItems: true } },
    },
  });

const totalItemsQuantityInCart = async () =>
  prisma.cartItems.groupBy({ by: ["cartId"], _sum: { quantity: true } });

const expensiveCartProducts = async () =>
  prisma.products.findMany({
    where: { price: { gt: 100 }, cartItems: { some: {} } },
  });

const productsInMoreThan1Cart = async () => {
  return prisma.cartItems.groupBy({
    by: ["productId"],
    _count: { cartId: true },
    having: {
      cartId: {
        _count: {
          gt: 1,
        },
      },
    },
  });
};

const numberOfOrdersPerUser = async () =>
  prisma.users.findMany({
    select: {
      id: true,
      email: true,
      _count: { select: { orders: true } },
    },
  });

const deleteCartItemsWithInactiveProducts = async () =>
  prisma.cartItems.deleteMany({
    where: {
      products: {
        isActive: false,
      },
    },
  });

const latest5Orders = async () =>
  prisma.orders.findMany({ orderBy: { createdAt: "desc" }, take: 5 });

const mostExpensiveProductEverOrdered = async () =>
  prisma.products.findMany({
    orderBy: {
      price: "desc",
    },
    take: 1,
    where: {
      orderItems: {
        some: {},
      },
    },
  });

const createDuplicateCart = async () => {
  const userId = 1;
  const productId = 1;
  const quantity = 1;
  const cart = await prisma.carts.create({
    data: { userId, cartItems: { create: { productId, quantity } } },
  });
  return cart;
};

const createDuplicateUser = async () => {
  const user = await prisma.users.create({
    data: {
      email: "test5@gmail.com",
      password: "test1234",
    },
  });
  return user;
};

getAllProducts().then(console.log);
