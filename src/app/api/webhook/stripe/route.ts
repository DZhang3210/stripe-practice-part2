import { env } from "@/env";
import { db } from "@/server/db";
import { Prisma } from "@prisma/client";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe with the correct API version
const stripe = new Stripe(env.STRIPE_SECRET_KEY);
const webhookSecret = env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = headers().get("stripe-signature");

  let event: Stripe.Event;

  try {
    if (signature) {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } else {
      throw new Error("Missing Stripe signature header");
    }
  } catch (err: any) {
    console.error(`Webhook signature verification failed. ${err.message}`);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  const eventType = event.type;
  //   console.log(event);

  try {
    switch (eventType) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        const customerId = session.customer as string;
        const customer = await stripe.customers.retrieve(customerId);

        if ("email" in customer && customer.email) {
          const user = await db.user.findUnique({
            where: { email: customer.email },
          });
          if (!user) {
            console.error("User not found");
            throw new Error("User not found");
          }

          const priceId = session.line_items?.data[0]?.price?.id;

          await db.user.update({
            where: { email: customer.email },
            data: {
              id: priceId ?? undefined,
              hasAccess: true,
            },
          });
        } else {
          console.error("No email found for customer or customer is deleted");
          throw new Error("No email found for customer or customer is deleted");
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const customer = await stripe.customers.retrieve(
          subscription.customer as string,
        );

        // Check if the retrieved customer has an email
        if ("email" in customer && customer.email) {
          // Find the user in your database using the email
          const user = await db.user.findUnique({
            where: { email: customer.email },
          });

          if (user) {
            // Update the user's access status
            await db.user.update({
              where: { email: customer.email },
              data: {
                hasAccess: false,
              },
            });
          } else {
            console.error("User not found for subscription deletion");
            throw new Error("User not found for subscription deletion");
          }
        } else {
          console.error("Customer email not found or customer is deleted");
          throw new Error("Customer email not found or customer is deleted");
        }
        break;
      }

      default:
        console.warn(`Unhandled event type ${eventType}`);
    }
  } catch (err: any) {
    console.error(`Stripe error: ${err.message} | EVENT TYPE: ${eventType}`);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
