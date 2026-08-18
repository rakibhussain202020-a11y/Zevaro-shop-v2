import { z } from 'zod';

export const checkoutSchema=z.object({
 customer:z.object({fullName:z.string().min(2).max(100),mobile:z.string().regex(/^[6-9]\d{9}$/),email:z.string().email().max(160),house:z.string().min(1).max(120),street:z.string().min(1).max(160),landmark:z.string().max(160).optional().default(''),city:z.string().min(2).max(80),state:z.string().min(2).max(80),pincode:z.string().regex(/^\d{6}$/)}),
 items:z.array(z.object({productId:z.string().min(1),slug:z.string().optional(),size:z.string().min(1).max(20),color:z.string().min(1).max(60),quantity:z.number().int().min(1).max(10)})).min(1).max(30),
 coupon:z.string().max(40).optional(), paymentMethod:z.literal('cod')
});
