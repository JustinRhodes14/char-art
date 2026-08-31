import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { SHIPPING_BLURB } from '../data/shippingBlurb';
import '../styles/pages.css';

const LAST_UPDATED = 'August 30, 2026';

function Shipping() {
  return (
    <Container className="privacy-page py-5">
      <h1 className="privacy-heading">Shipping Policy</h1>
      <p className="privacy-meta">Last updated: {LAST_UPDATED}</p>

      <p className="privacy-body">
        Please read the following information carefully before placing your order.
      </p>

      <p className="privacy-body">
        Unfortunately, because we are a small business, we can only ship within the United States
        at the moment. However, this is not a permanent decision, as we hope to provide shipping
        options to other international destinations in the future!
      </p>

      <h2 className="privacy-section-heading">Mail Carriers</h2>
      <p className="privacy-body">
        All orders are handled by USPS (United States Postal Service).
      </p>

      <h2 className="privacy-section-heading">Shipping Costs/Types</h2>
      <p className="privacy-body">
        We offer Free Shipping for orders over $40.00 USD. Otherwise, you pay the shipping rate
        that is calculated at checkout. Sticker-only orders ship via standard USPS First-Class
        Mail. Orders containing pins, prints, or sticker sheets ship via USPS Ground Advantage by
        default, with a faster Priority Mail option available for an extra fee at checkout. As we
        continue to grow, we hope to provide you with even more shipping options in the near
        future!
      </p>

      <h2 className="privacy-section-heading">Processing &amp; Shipping Time</h2>
      <p className="privacy-body">
        Once the order is received, processing, packaging, and labeling your order will require
        between 1-4 business days. {SHIPPING_BLURB}
      </p>
      <p className="privacy-body">
        Once the tracking number is activated, you can track your order status through USPS.
      </p>
      <p className="privacy-body">
        Holiday seasons and other events may increase processing and shipping times, so please
        keep this in mind when placing your order.
      </p>

      <h2 className="privacy-section-heading">Can I get a refund if my order is delayed or lost in transit?</h2>
      <p className="privacy-body">
        We do not offer refunds on lost or delayed orders. Once your order is shipped from its
        place of origin, it is in the hands of the postal service, and you will need to contact
        your local post office for further assistance. We can only issue full refunds with no
        shipping fees if you request an order cancellation within the order's processing time.
        For more information, please refer to our{' '}
        <Link to="/returns" className="privacy-link">Return/Refund Policy</Link>.
      </p>

      <h2 className="privacy-section-heading">Do all orders get a tracking number?</h2>
      <p className="privacy-body">
        Orders that include anything beyond stickers (pins, prints, sticker sheets, etc.) are
        shipped in a padded envelope or box with a printed shipping label, which includes a
        tracking number. Once the label has been created, you will be notified when the tracking
        number is activated. Orders of stickers only ship in a standard stamped envelope; USPS
        does not provide a tracking number for First-Class Mail letters; however, we will notify
        you once your order has been delivered to the post office.
      </p>

      <h2 className="privacy-section-heading">Changes to Our Shipping Policy</h2>
      <p className="privacy-body">
        We reserve the right to modify our shipping policy at any time without prior notice, so
        please review this frequently. Changes and clarifications will take effect immediately
        upon their posting on the website. If an order was placed before changes were made to the
        shipping policy, we will honor the version of the policy in effect at the time your order
        was placed. Your continued use of our website and services following the posting of any
        changes constitutes your acceptance and understanding of the revised policy.
      </p>
    </Container>
  );
}

export default Shipping;
