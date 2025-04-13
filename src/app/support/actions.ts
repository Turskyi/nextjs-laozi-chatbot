'use server';

import { env } from '@/lib/env';
import { redirect } from 'next/navigation';
import { APP_NAME } from '../../../constants';

export interface SupportEmail {
  email: string;
  name: string;
  message: string;
}

export async function sendSupportEmail(supportEmail: SupportEmail) {
  const email = supportEmail.email;
  const subject = `New Message Received from ${APP_NAME}`;
  // Format the order details into a message.
  const message = `New support message received:\n\n
  Email: ${supportEmail.email}\n\nName: ${supportEmail.name}\n\n
  Message: ${supportEmail.message}.`;
  try {
    await fetch(`${env.DOMAIN_URL}/api/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, subject, message }),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error:', error);
      });
  } catch (error) {
    console.error('Error sending email:', error);
  }

  redirect('/');
}

