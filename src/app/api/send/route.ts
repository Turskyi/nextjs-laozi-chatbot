import { env } from '@/lib/env';
import { NextRequest } from 'next/server';
import { Resend } from 'resend';
import { APP_NAME, RESEND_DOMAIN } from '../../../../constants';

const resend = new Resend(env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, subject, message } = body;
  try {
    const data = await resend.emails.send({
      from: `Do Not Reply ${APP_NAME} <no-reply@${RESEND_DOMAIN}>`,
      to: [env.SUPER_ADMIN],
      subject: subject,
      text: message,
    });
    
    await resend.emails.send({
      from: `Do Not Reply ${APP_NAME} <no-reply@${RESEND_DOMAIN}>`,
      to: [email],
      subject: `Thank You! Your Support Message Has Been Sent to ${APP_NAME}`,
      text: `
        Thank you for reaching out to us! 
        Your support message has been received and will be reviewed promptly. 
        We appreciate your feedback and will get back to you soon.

        Best regards,
        The ${APP_NAME} Team.
      `.trim(),
    });
    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
