import React from 'react';
import { Container } from 'react-bootstrap';
import '../styles/pages.css';

const LAST_UPDATED = 'July 15, 2026';

function Privacy() {
  return (
    <Container className="privacy-page py-5">
      <h1 className="privacy-heading">Privacy Policy</h1>
      <p className="privacy-meta">Last updated: {LAST_UPDATED}</p>

      <p className="privacy-body">
        Park LoFi Studio is a sole proprietorship based in New Jersey, USA. I run this shop
        independently. This Privacy Policy explains what information is collected when you use
        this website, how it is used, and who it may be shared with. If you have any questions,
        please reach out via the <a href="/contact" className="privacy-link">Contact</a> page.
      </p>

      <h2 className="privacy-section-heading">Information I Collect</h2>
      <p className="privacy-body">I collect information only when you actively provide it:</p>
      <ul className="privacy-list">
        <li><strong>Purchases</strong> — When you check out, you are redirected to Stripe's secure
        payment page. Stripe collects your name, email address, billing address, and payment card
        details. I never see or store your card number.</li>
        <li><strong>Shipping</strong> — To fulfill your order, your shipping name and address are
        passed to Shippo, my shipping provider, to generate a shipping label.</li>
        <li><strong>Contact form</strong> — If you send me a message, I collect your name, email
        address, and the content of your message.</li>
      </ul>
      <p className="privacy-body">
        I do not use tracking pixels, advertising cookies, or analytics services. Your browser's
        local storage is used to remember your shopping cart and display preferences (such as
        whether you've turned off the sticker animation). This data stays on your device and is
        never sent to me.
      </p>

      <h2 className="privacy-section-heading">How I Use Your Information</h2>
      <ul className="privacy-list">
        <li>To process and fulfill your order</li>
        <li>To create and send a shipping label for your purchase</li>
        <li>To respond to messages sent through the contact form</li>
        <li>To send order confirmation emails (handled by Stripe)</li>
      </ul>
      <p className="privacy-body">
        I do not sell, rent, or share your personal information with any third party for marketing
        purposes.
      </p>

      <h2 className="privacy-section-heading">Third-Party Services</h2>
      <p className="privacy-body">
        I rely on the following services to operate the shop. Each has its own privacy policy
        governing how they handle your data:
      </p>
      <ul className="privacy-list">
        <li>
          <strong>Stripe</strong> — payment processing.{' '}
          <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="privacy-link">
            stripe.com/privacy
          </a>
        </li>
        <li>
          <strong>Shippo</strong> — shipping label generation.{' '}
          <a href="https://goshippo.com/privacy" target="_blank" rel="noopener noreferrer" className="privacy-link">
            goshippo.com/privacy
          </a>
        </li>
      </ul>

      <h2 className="privacy-section-heading">Data Retention</h2>
      <p className="privacy-body">
        I do not operate my own database of customer records. Your order and payment data is
        retained by Stripe according to their policies. Shipping records are retained by Shippo
        according to their policies. Contact form messages are delivered to my email inbox and
        kept only as long as needed to respond.
      </p>

      <h2 className="privacy-section-heading">Your Rights</h2>
      <p className="privacy-body">
        I do not store your personal information in any database. Your order and payment data lives
        with Stripe, and your shipping address lives with Shippo — to request access, correction,
        or deletion of that data, you will need to contact those services directly using the links
        in the Third-Party Services section above. If you have a question about a specific order or
        contact message, feel free to reach out through the{' '}
        <a href="/contact" className="privacy-link">Contact</a> page and I'll do my best to help.
      </p>

      <h2 className="privacy-section-heading">Children's Privacy</h2>
      <p className="privacy-body">
        This site is not directed at children under the age of 13. I do not knowingly collect
        personal information from children. If you believe a child has provided personal
        information through this site, please contact me so I can delete it.
      </p>

      <h2 className="privacy-section-heading">Changes to This Policy</h2>
      <p className="privacy-body">
        I may update this Privacy Policy from time to time. Any changes will be posted on this
        page with an updated date at the top. Continued use of the site after changes are posted
        constitutes acceptance of the updated policy.
      </p>

      <h2 className="privacy-section-heading">Contact</h2>
      <p className="privacy-body">
        For any privacy-related questions or requests, please reach out through the{' '}
        <a href="/contact" className="privacy-link">Contact</a> page.
      </p>
    </Container>
  );
}

export default Privacy;
