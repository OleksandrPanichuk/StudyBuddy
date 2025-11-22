"use server";
import { createTransport } from "nodemailer";

const transporter = createTransport({
    host: process.env.MAIL_HOST!,
    port: parseInt(process.env.MAIL_PORT!),
    secure: true,
    auth: {
        user: process.env.MAIL_USER!,
        pass: process.env.MAIL_PASSWORD!,
    },
    from: process.env.MAIL_FROM!,
});

interface ISendEmailOptions {
    to: string;
    subject: string;
    html: string;
}

export async function sendEmail(options: ISendEmailOptions) {
    await transporter.sendMail({
        ...options,
    });
}
