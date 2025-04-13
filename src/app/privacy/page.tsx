import { H1 } from '@/components/ui/H1';
import { H2 } from '@/components/ui/H2';
import { H3 } from '@/components/ui/H3';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
};

const DEVELOPER_DOMAIN = 'daoizm.online';
const APP_NAME = 'Daoism - Laozi AI';
const updateDate = 'June 2024';

export default function Page() {
  return (
    <section className="space-y-6">
      <div className="space-y-3">
        <H1>
          Privacy Policy for &quot;{APP_NAME}&quot; Website and Mobile App
        </H1>
        <p>Last Updated: {updateDate}</p>
      </div>
      <div className="space-y-3">
        <H2>Introduction</H2>
        <p>
          Welcome to the {APP_NAME} website and mobile application. This Privacy
          Policy explains our practices regarding the collection, use, and
          disclosure of information we receive through both our website and our
          mobile apps. Our primary goal is to provide a thoughtful experience
          while respecting your privacy.
        </p>
        <H2>Information We Collect</H2>
        <p>
          We do not actively collect personal data from visitors. No account
          creation is required, and we do not use cookies for tracking or
          personal data collection.
        </p>
        <H3>1. Log Files</H3>
        <p>
          Like many other websites, we collect information that your browser
          sends whenever you visit our site (&quot;Log Data&quot;). This Log
          Data may include information such as your computer&apos;s Internet
          Protocol (&quot;IP&quot;) address, browser type, browser version, the
          pages of our site that you visit, the time and date of your visit, the
          time spent on those pages, and other statistics.
        </p>
        <H3>2. Contact Information</H3>
        <p>
          If we provide an option for you to contact us via email or a contact
          form, any information you provide is voluntary and used solely to
          respond to your inquiries.
        </p>
        <H3>3. Mobile App Usage Data</H3>
        <p>
          Our mobile app does not require you to create an account or provide
          any personal information. However, anonymous usage data such as device
          type, OS version, and general interaction patterns may be collected
          through third-party services (e.g., Apple, Google Play, or crash
          reporting tools) to help us improve the app.
        </p>
        <H2>Use of Information</H2>
        <p>The information we collect is used in the following ways:</p>
        <ul className="list-inside list-disc">
          <li>To ensure the proper functioning of our website </li>
          <li>
            To improve our website based on the information and feedback we
            receive from you{' '}
          </li>
          <li>
            To respond to your customer service requests and support needs
          </li>
        </ul>
        <H2>Information Sharing and Disclosure</H2>
        <p>
          We do not sell, trade, or rent users&apos; personal identification
          information to others. We may share generic aggregated demographic
          information not linked to any personal identification information
          regarding visitors and users with our business partners, trusted
          affiliates, and advertisers for the purposes outlined above.
        </p>
        <H2>Security</H2>
        <p>
          The security of your Personal Information is important to us, but
          remember that no method of transmission over the Internet, or method
          of electronic storage, is 100% secure. While we strive to use
          commercially acceptable means to protect your Personal Information, we
          cannot guarantee its absolute security.
        </p>
        <H2>Changes to This Privacy Policy</H2>
        <p>
          This Privacy Policy is effective as of {updateDate} and will remain in
          effect except with respect to any changes in its provisions in the
          future, which will be in effect immediately after being posted on this
          page. We reserve the right to update or change our Privacy Policy at
          any time, and you should check this Privacy Policy periodically.
        </p>
        <H2>Contact Us</H2>
        <p>
          If you have any questions about this Privacy Policy, please contact us
          at{' '}
          <a href={`mailto:support@${DEVELOPER_DOMAIN}`}>
            support@{DEVELOPER_DOMAIN}
          </a>
          .
        </p>
      </div>
    </section>
  );
}
