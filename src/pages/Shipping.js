import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { SHIPPING_BLURB } from '../data/shippingBlurb';
import '../styles/pages.css';

const LAST_UPDATED = 'July 18, 2026';

function Shipping() {
  return (
    <Container className="privacy-page py-5">
      <h1 className="privacy-heading">Shipping Policy</h1>
      <p className="privacy-meta">Last updated: {LAST_UPDATED}</p>

      <p className="privacy-body">
        Please read the following information carefully before placing your order.
      </p>

      <p className="privacy-body">
        Unfortunately, we can only ship within the United States at the moment. However, this is
        not a permanent long-term decision as we hope to provide shipping options to other
        international destinations in the future!
      </p>

      <h2 className="privacy-section-heading">Mail Carriers</h2>
      <p className="privacy-body">
        All orders are handled by USPS (United States Postal Service).
      </p>

      <h2 className="privacy-section-heading">Shipping Costs/Types</h2>
      <p className="privacy-body">
        As we are a fairly new business, we are unable to offer shipping options other than
        standard shipping at the moment, so please keep this in mind at checkout. As we continue
        to grow, we hope to provide you with more shipping options with your order in the near
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
        Holiday seasons and other events may increase processing and shipping times so please
        keep this in mind when placing your order.
      </p>

      <h2 className="privacy-section-heading">Can I get a refund if my order is delayed or lost in transit?</h2>
      <p className="privacy-body">
        We do not offer refunds on lost or delayed orders. Once your order is shipped from its
        origin, it is in the hands of the postal service, and you will need to contact your local
        postal office for further assistance. For questions regarding our refund policy,{' '}
        <Link to="/returns" className="privacy-link">see our Return/Refund Policy</Link>.
      </p>

      <h2 className="privacy-section-heading">Do all orders get a tracking number?</h2>
      <p className="privacy-body">
        Orders that include anything beyond stickers (pins, prints, or sticker sheets) ship in a
        padded envelope or box with a printed shipping label, which includes a tracking number,
        we'll pass that along to you once the label has been created. Orders of stickers only
        ship in a standard stamped envelope; USPS doesn't provide tracking for First-Class Mail
        letters, so those orders won't have a tracking number.
      </p>

      <h2 className="privacy-section-heading">Changes to Shipping Policy</h2>
      <p className="privacy-body">
        We reserve the right to modify our shipping policy at any time without prior notice, so
        please review this frequently. Changes and clarifications will take effect immediately
        upon their posting on the website. If an order was placed before changes were made to the
        shipping policy, we will honor the policy version your order was placed under at the time.
        Your continued use of our website and services following the posting of any changes
        constitutes your acceptance of the revised policy.
      </p>
    </Container>
  );
}

export default Shipping;
