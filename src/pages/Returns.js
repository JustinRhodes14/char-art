import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/pages.css';

const LAST_UPDATED = 'July 18, 2026';

function Returns() {
  return (
    <Container className="privacy-page py-5">
      <h1 className="privacy-heading">Return/Refund Policy</h1>
      <p className="privacy-meta">Last updated: {LAST_UPDATED}</p>

      <p className="privacy-body">
        Please read the following information carefully before placing your order.
      </p>

      <p className="privacy-body">
        At Park LoFi Studio, we strive to provide you the best service as we possibly can. Missing
        items in your order? Making a return? Requesting an item replacement? We will do our best
        to work with you!
      </p>

      <h2 className="privacy-section-heading">General Policy Information</h2>
      <p className="privacy-body">
        We allow refunds and item replacements up to 30 days after the order has been delivered to
        its destination. It is advised that you inspect your order's condition upon receiving it.
        If there are issues found with your order, you, the consumer, are responsible for reaching
        out to us within our 30-day policy. We will not be issuing you a refund or item replacement
        if you contact us regarding an issue with your order after 30 days.
      </p>
      <p className="privacy-body">
        [+] We issue full refunds/item replacements under the following circumstances (if within 30 days):
      </p>
      <ul className="privacy-list">
        <li>Damaged, defective, or missing items from the order</li>
        <li>Change of mind while the order is being processed</li>
      </ul>

      <h2 className="privacy-section-heading">Damaged/Defective/Missing Items in Your Order</h2>
      <p className="privacy-body">
        If item(s) are found to be damaged, defective, or missing in your order, we will work with
        you to resolve the issue as quickly as possible. In addition to the name the order was
        placed under, we may also request the following information:
      </p>
      <ul className="privacy-list">
        <li>Order number</li>
        <li>Address of order destination</li>
        <li>Identification of missing item(s) in your order</li>
        <li>Screenshots of your order receipt</li>
        <li>Photos of damaged or defective item(s) in your order, at the highest resolution possible</li>
      </ul>
      <p className="privacy-body">
        To report an issue with your order, please reach out through the{' '}
        <Link to="/contact" className="privacy-link">Contact</Link> page.
      </p>
      <p className="privacy-body">
        <strong>Important</strong>: in the case of damaged, defective, or missing items, we will
        ship item replacements to you free of charge, including the cost of shipping. It is not
        required for you to ship back the defective items, and it is up to your discretion.
      </p>

      <h2 className="privacy-section-heading">Change of Mind (only within the processing time)</h2>
      <p className="privacy-body">
        No problem! If you contact us within the timeframe stated in our{' '}
        <Link to="/shipping" className="privacy-link">Shipping Policy</Link>, we will fully refund
        your order. If there is a change of address or name to the order, let us know, and we will
        correct the changes. Be sure to check the order's shipping information and destination are
        correct before purchasing your order.
      </p>

      <h2 className="privacy-section-heading">Change of Mind After the Order Is Shipped</h2>
      <p className="privacy-body">
        Please read this carefully. If after the order has already been shipped and/or delivered
        and you change your mind (separate from damaged or defective item(s)), it is your
        responsibility to cover all return shipping fees for your order; the shipping costs are not
        included in the order refund as they are considered to be at your expense. To receive a
        full refund, you must send the full order back to its origin, meaning you are responsible
        for ensuring all items in that order are sent back together. Once we have received the
        order and all items are accounted for, only then will we issue you a refund. We will issue
        you either a partial or full refund depending on the item(s)' condition.
      </p>

      <p className="privacy-body">
        [x] We do not issue refunds/item replacements under the following circumstances:
      </p>
      <ul className="privacy-list">
        <li>Issues found with the order outside our 30-day policy</li>
        <li>B-grade items</li>
        <li>Final sale items</li>
        <li>Lost or delayed shipping orders</li>
      </ul>

      <h2 className="privacy-section-heading">Refund Request Outside the 30-Day Policy</h2>
      <p className="privacy-body">
        When the order is delivered to its destination, the customer has 30 days to report any
        issues with their order, ask for item replacements, make a return, and/or request a refund.
        After the 30 days, we will not accept returns or refunds, nor are we obligated to do so.
      </p>

      <h2 className="privacy-section-heading">B-Grade Items</h2>
      <p className="privacy-body">
        B-grade items are discounted items because they contain manufacturing defects, cosmetic
        blemishes, packaging issues, or have been "out of box". B-grade items are a budget-friendly
        alternative compared to our normal retail prices and even some of our final sale items, and
        are sold while supplies last. Items that are considered "B-grade" are explicitly labeled as
        such in their descriptions and product images, and sold in a separate category from other
        retail items. Because B-grade items are not considered "brand new" and are already
        discounted, all sales are final. We do not accept refunds, returns, or exchanges for them.
      </p>

      <h2 className="privacy-section-heading">Final Sale Items</h2>
      <p className="privacy-body">
        Unlike B-grade items, final sale items are items from current or previous themed
        collections and are part of a seasonal sale event. These items are explicitly labeled
        Final Sale in their descriptions and product images and sold in a separate category from
        B-grade and other retail items.
      </p>
      <p className="privacy-body">
        Because they are considered final sales, we do not accept returns, exchanges, or refunds.
      </p>

      <h2 className="privacy-section-heading">Lost or Delayed Shipping Orders</h2>
      <p className="privacy-body">
        Please see our <Link to="/shipping" className="privacy-link">Shipping Policy</Link> for
        more details about lost or delayed shipping orders. Once the order has been processed,
        packaged, and shipped, the order is in the hands of the postal service(s). If your order
        has been delayed or lost, you will need to contact your local post office.
      </p>

      <h2 className="privacy-section-heading">Our Discretion</h2>
      <p className="privacy-body">
        We want every request to be handled fairly, and we'll always do our best to work with you.
        That said, we reserve the right to decline a refund or replacement if a request falls
        outside the terms of this policy, or if we have reason to believe it's being made in bad
        faith.
      </p>

      <h2 className="privacy-section-heading">Changes to Our Return/Refund Policy</h2>
      <p className="privacy-body">
        We reserve the right to modify our return/refund policy at any time without prior notice,
        so please review this frequently. Changes and clarifications will take effect immediately
        upon their posting on the website. If an order was placed before the new modifications to
        the return/refund policy were made, we will honor the original terms of the version of the
        return/refund policy the order was made under. Your continued use of our website and
        services following the posting of any changes constitutes your acceptance of the revised
        policy.
      </p>
    </Container>
  );
}

export default Returns;
