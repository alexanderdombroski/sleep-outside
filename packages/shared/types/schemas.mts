import { z } from "zod";

// --------------- Collection: Address ---------------
const AddressSchema = z.object({
  _id: z.string(),
  name: z.string(),
  line1: z.string(),
  line2: z.string().nullable(),
  city: z.string(),
  state: z.string(),
  postalCode: z.string(),
  country: z.string(),
});

// --------------- Collection: User ---------------
export type User = z.infer<typeof UserSchema>;
export const UserSchema = z.object({
  _id: z.string(),
  name: z.string(),
  email: z.email(),
  password: z.string(),
  addressIds: z.array(z.string()), // Option to save address only at checkout
  joinDate: z.date(),
  role: z.enum(["user", "admin"]),
});

// --------------- Collection: Order ---------------

const paymentStatus = z.enum(["unpaid", "pending", "paid", "refunded"]);
export type PaymentStatus = z.infer<typeof paymentStatus>;
const orderStatus = z.enum(["processing", "shipped", "delivered", "cancelled"]);
export type OrderStatus = z.infer<typeof orderStatus>;

/** Take a snapshot of products at purchase time to caption details of price and/or name changes */
const ProductSnapshotSchema = z.object({
  productId: z.string(),
  nameSnapshot: z.string(),
  priceSnapshot: z.number(),
  quantity: z.number(),
});
export type ProductSnapshot = z.infer<typeof ProductSnapshotSchema>;

export type Order = z.infer<typeof OrderSchema>;
export const OrderSchema = z.object({
  _id: z.string(),
  userId: z.string(),
  items: z.array(ProductSnapshotSchema),
  paymentStatus,
  orderStatus,
  paymentMethodType: z.string().nullable(),
  shippingAddress: AddressSchema,
  createdAt: z.date(),

  // Aggregates
  subtotal: z.number(),
  tax: z.number(),
  total: z.number(),
});

// --------------- Collection: Product ---------------

export type Brand = z.infer<typeof BrandSchema>;
export const BrandSchema = z.object({
  _id: z.string(),
  name: z.string(),
  url: z.string(),
  productsUrl: z.string(),
  logoSrc: z.string(),
});

export type Category = z.infer<typeof category>;
const category = z.enum(["sleeping-bags", "backpacks", "tents", "hammocks"]);

export type Product = z.infer<typeof ProductSchema>;
export const ProductSchema = z
  .object({
    _id: z.string(),
    brand: BrandSchema,
    name: z.string(),
    descriptionHtmlSimple: z.string(),
    listPrice: z.number(),
    finalPrice: z.number(),
    discountPercentage: z.number().nullable(), // 0-100 or null if no discount
    category,
    images: z.object({
      primarySmall: z.string(),
      primaryMedium: z.string(),
      primaryLarge: z.string(),
      primaryExtraLarge: z.string(),
      extraImages: z
        .array(z.object({ title: z.string(), src: z.string() }))
        .nullish(),
    }),
    stock: z.number(),
    isActive: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date(),
    isClearance: z.boolean(),
    reviews: z.object({
      reviewsUrl: z.string(),
      reviewCount: z.number(),
      averageRating: z.number(),
    }),
  })
  .catchall(z.any());

// --------------- Collection: Alert ---------------
export type Alert = z.infer<typeof AlertSchema>;
export const AlertSchema = z.object({
  _id: z.string(),
  title: z.string(),
  type: z.enum(["warning", "info", "promotion"]),
  scope: z.enum(["brand", "category", "product"]),
  targetIds: z.array(z.string()),
  status: z.enum(["active", "inactive"]),
  startsAt: z.date(),
  endsAt: z.date().nullable(),
});

// --------------- Collection: Review ---------------
export type Review = z.infer<typeof ReviewSchema>;
export const ReviewSchema = z.object({
  _id: z.string(),
  productId: z.string(),
  userId: z.string(),
  rating: z.number().min(1).max(5),
  title: z.string(),
  comment: z.string(),
  createdAt: z.date(),
  modifiedAt: z.date(),

  // Aggregate
  isVerifiedPurchase: z.boolean(),
});
