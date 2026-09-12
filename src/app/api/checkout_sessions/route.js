import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { doctorId, doctorName, consultationFee, applicantId } = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd", 
            product_data: {
              name: `Appointment with ${doctorName}`,
            },
            unit_amount: consultationFee * 100, 
          },
          quantity: 1,
        },
      ],
      mode: "payment",
     
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/appointments/patient?userId=${applicantId}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/doctors/${doctorId}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}