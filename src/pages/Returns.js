import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/pages.css';

const LAST_UPDATED = 'August 30, 2026';

function Returns() {
  return (
    <Container className="privacy-page py-5">
      <h1 className="privacy-heading">Return/Refund Policy</h1>
      <p className="privacy-meta">Last updated: {LAST_UPDATED}</p>

      <p className="privacy-body">
        Please read the following information carefully before placing your order.
      </p>

      <h2 className="privacy-section-heading">General Policy Information</h2>
      <p className="privacy-body">
        It is advised that you inspect your order's condition upon receiving it. If there are
        issues found with your order, you, the consumer, are responsible for reaching out to us
        within our 15-day policy. We are not obligated to give you a refund or item replacement if
        you contact us regarding an issue with your order after 15 days.
      </p>

      <h2 className="privacy-section-heading">Order Cancellation (within the processing time)</h2>
      <p className="privacy-body">
        No problem! If you contact us within the timeframe stated in our{' '}
        <Link to="/shipping" className="privacy-link">Processing and Shipping policy</Link>, we
        will fully refund your order, including the shipping fee! If there is a change of address
        or name to the order, let us know, and we will update the order accordingly. Always be
        sure to check that the order's shipping information and destination are correct before
        finalizing your order.
      </p>

      <h2 className="privacy-section-heading">Order Cancellation After the Order Is Shipped</h2>
      <p className="privacy-body">
        Please read this carefully. If you cancel your order after it has already been shipped
        and/or delivered, it is your responsibility to cover all return shipping fees. Shipping
        costs will not be included in the order refund as they are considered to be at your
        expense. To receive a full refund, you must send the full order back to its origin with
        all original packaging/items included. You are responsible for ensuring that all items in
        that order are sent back together. Once we have received the order and the items are
        accounted for, only then will we issue you a refund, again not including the return
        shipping fees. We will issue you either a partial or full refund depending on the
        item(s)' condition.
      </p>

      <p className="privacy-body">
        We do not accept nor are we obligated to issue refunds/item replacements under the
        following circumstances:
      </p>
      <ul className="privacy-list">
        <li>Issues found with the order outside our 15-day policy</li>
        <li>B-grade items</li>
        <li>Final Sale items</li>
        <li>Lost or delayed shipping orders</li>
      </ul>

      <h2 className="privacy-section-heading">Refund Request Outside the 15-Day Policy</h2>
      <p className="privacy-body">
        When the order is delivered to its destination, the customer has 15 days to report any
        issues with their order. After the 15 days, we are not obligated to issue or accept
        returns or refunds.
      </p>

      <h2 className="privacy-section-heading">B-Grade Items</h2>
      <p className="privacy-body">
        B-grade items are discounted items because they contain minor manufacturing defects,
        cosmetic blemishes, packaging issues, or have been "out of the box". B-grade items are a
        budget-friendly alternative to our normal retail prices, and are sold while supplies last.
        Items that are considered "B-grade" are explicitly labeled as such in their descriptions
        and product images, and sold in a separate category from other retail items. Because
        B-grade items are not considered "brand new" and are already discounted, by purchasing
        them at checkout, you agree that you have been made aware that the B-grade item(s) you
        purchased may be altered or defective, and that all sales are final. We do not accept
        refunds, returns, or exchanges for them.
      </p>

      <h2 className="privacy-section-heading">Final Sale Items</h2>
      <p className="privacy-body">
        Unlike B-grade items, final sale items are items from current or previous themed
        collections and are part of a seasonal sale event. These items are explicitly labeled
        Final Sale in their descriptions and product images and sold in a separate category from
        B-grade and other retail items.
      </p>
      <p className="privacy-body">
        Because they are considered Final Sale, we do not accept returns, exchanges, or refunds.
      </p>

      <h2 className="privacy-section-heading">Missing Items in Your Order</h2>
      <p className="privacy-body">
        If item(s) are found to be missing in your order, please{' '}
        <Link to="/contact" className="privacy-link">contact us</Link> immediately so we can
        resolve the issue as quickly as possible. In addition to the name the order was placed
        under, we may also request the following information:
      </p>
      <ul className="privacy-list">
        <li>Order Number</li>
        <li>Address of Order Destination</li>
        <li>Identification of missing item(s) in your order</li>
        <li>Screenshots of your order receipt</li>
      </ul>
      <p className="privacy-body">
        If a mistake is found on our end, we will replace the missing item(s) and ship them to
        you free of charge, including the cost of shipping.
      </p>

      <h2 className="privacy-section-heading">Lost or Delayed Shipping Orders</h2>
      <p className="privacy-body">
        Please see our <Link to="/shipping" className="privacy-link">Shipping Policy</Link> for
        more details about lost or delayed shipping orders. Once the order has been processed,
        packaged, and shipped, the order is in the hands of the postal service(s). If your order
        has been delayed or lost, you will need to contact your local post office for further
        assistance.
      </p>

      <h2 className="privacy-section-heading">Damaged/Defective Item(s) in Your Order</h2>
      <p className="privacy-body">
        If item(s) appear damaged or defective in your order upon arrival,{' '}
        <Link to="/contact" className="privacy-link">contact us</Link> immediately to resolve the
        issue as soon as possible. Please provide clear photos/videos at the highest resolution
        possible of the damaged items, packaging materials, shipping box, and shipping label so
        that we can properly assess the issue. If item(s) are damaged or defective as a result of
        shipping, here are the options you can choose from to resolve the issue:
      </p>
      <p className="privacy-body">
        <strong>Replacement Items</strong>
        <br />
        We will ship replacement item(s) free of charge, as well as a prepaid return label for the
        damaged order and a complimentary item at our discretion for the inconvenience.
      </p>
      <p className="privacy-body">
        <strong>Partial or Full Refund</strong>
        <br />
        If issues with your order are reported within our 15-day return policy, we will issue you
        a partial or full refund depending on the item(s)' condition. Partial or full refunds do
        not include return shipping fees as this is considered to be at your expense. The refund
        is only issued when we have received the full order and its original packaging; after
        receiving it, your refund can take anywhere between 3-8 business days to appear in your
        account depending on your financial institution.
      </p>

      <h2 className="privacy-section-heading">Changes to Our Return/Refund Policy</h2>
      <p className="privacy-body">
        We reserve the right to modify our return/refund policy at any time without prior notice,
        so please review this frequently. Changes and clarifications will take effect immediately
        upon their posting on the website. If an order was placed before changes were made to the
        return/refund policy, we will honor the version of the policy in effect at the time your
        order was placed. Your continued use of our website and services following the posting of
        any changes constitutes your acceptance and understanding of the revised policy.
      </p>
    </Container>
  );
}

export default Returns;
