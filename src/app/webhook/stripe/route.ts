// import { env } from "@/env";
// import { db } from "@/server/db";
// import { Prisma } from "@prisma/client";
// import { headers } from "next/headers";
// import { NextRequest, NextResponse } from "next/server";
// import Stripe from "stripe";

// const stripe = new Stripe(env.STRIPE_SECRET_KEY);
// const webhookSecret = env.STRIPE_WEBHOOK_SECRET;

// export async function POST(req: NextRequest) {
//   const body = await req.text();
//   const signature = headers().get("stripe-signature");

//   let data;
//   let eventType;
//   let event!: Stripe.Event;

//   try {
//     if(signature)
//       event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
//   } catch (err: {err:{err:{message:string}}}) {
//     console.error(`Webhook signature verification failed. ${err.message}`);
//     return NextResponse.json({ error: err.message }, { status: 400 });
//   }

//   data = event.data;
//   eventType = event.type;

//   try {
//     switch (eventType) {
//       case "checkout.session.completed": {

//         let user;
//         const session = await stripe.checkout.sessions.retrieve(
//           data.object.id,
//           {
//             expand: ['line_items']
//           },
//         );
//         const customerId = session?.customer;
//         const customer = await stripe.customers.retrieve(customerId)
//         const priceId = session ?.line_items?.data[0]?.price?.id;

//         if(customer.email){
//             user = db.user.findUnique({email:customer.email})
//             if(!user) {
//                 console.error("something went wrong")
//                 throw new Error("something went wrong")
//             }
//         }else{
//             console.error("No User found")
//             throw new Error('No user found')
//         }

//         user = await db.user.update({
//             where: { email: customer.email },
//             data: {
//                 priceId: priceId,
//                 hasAccess: true
//             }
//         });
//         break;
//       }
//       case 'customer.subscription.deleted':{
//         const subscription = await stripe.subscriptions.retrieve(
//             data.object.id
//         )
//         const user = await db.user.findUnique({
//             id: subscription.customer
//         });
//         await db.user.update(
//             {
//                 where:{id: subscription.customer},
//                 data: {
//                     hasAccess: false
//                 }
//             }
//         )
//         break

//       }
//       default;
//     }
//   } catch (err: {err: {message:string}}) {
//     console.error(
//       "stripe error: " + err.message + "| EVENT TYPE: " + eventType,
//     );
//   }
//   return NextResponse.json
// }
