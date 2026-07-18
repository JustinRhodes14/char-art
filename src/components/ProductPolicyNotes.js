import React from 'react';
import { Link } from 'react-router-dom';
import { SHIPPING_BLURB } from '../data/shippingBlurb';

function ProductPolicyNotes() {
  return (
    <div className="product-policy-notes">
      <p>Actual colors may differ slightly from the product image.</p>
      <p>
        {SHIPPING_BLURB}{' '}
        <Link to="/shipping" className="privacy-link">See our Shipping Policy</Link>
      </p>
      <p>
        Questions? Feel free to{' '}
        <Link to="/contact" className="privacy-link">reach out</Link>{' '}
        with your concerns and curiosities :) 
      </p>
    </div>
  );
}

export default ProductPolicyNotes;
