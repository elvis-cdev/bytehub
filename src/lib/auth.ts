import { betterAuth } from "better-auth";
import { emailOTP } from "better-auth/plugins";
import { prismaAdapter } from "@better-auth/prisma-adapter";
import { Resend } from "resend";
import prisma from "@/lib/prisma";

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  secret: process.env.BETTER_AUTH_SECRET!,
  baseURL: process.env.BETTER_AUTH_URL!,
  advanced: {
    skipTrailingSlashes: true,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "DEVELOPER",
        input: true,
      },
    },
  },
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        const subject =
          type === "sign-in"
            ? "Your ByteHub sign-in code"
            : "Verify your ByteHub email";

        await resend.emails.send({
          from: "ByteHub <onboarding@resend.dev>",
          to: email,
          subject,
          html: `
            <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
              <h2 style="color: #b8842e;">ByteHub</h2>
              <p>Your verification code is:</p>
              <p style="font-size: 32px; font-weight: bold; letter-spacing: 8px;">${otp}</p>
              <p style="color: #888; font-size: 14px;">This code expires in 10 minutes. If you didn't request this, you can ignore this email.</p>
            </div>
          `,
        });
      },
    }),
  ],
});
