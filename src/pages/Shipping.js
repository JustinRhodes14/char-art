import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
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
        between 1-4 business days. Once shipped, delivery typically takes 1-3 business days for
        orders sent via Priority Mail, or 3-5 business days for lightweight orders sent via
        First-Class Mail.
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
        Except orders weighing under 3.5 ounces (packaging included), all orders are given a
        shipping label with a unique tracking number. The customer will receive a tracking number
        when the shipping label is created. For orders under 3.5 ounces, they are treated as
        Standard First-Class Mail letter envelopes (USPS) and will not receive a tracking number;
        however, you will be notified when your order has been dropped off at the postal office
        via the email you provide at checkout.
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
