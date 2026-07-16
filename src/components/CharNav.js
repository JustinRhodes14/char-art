import { useState, useContext } from 'react';
import { Navbar, Container, Nav, Offcanvas, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CartContext } from '../features/cart/cartContext';
import { BasketIcon } from "@phosphor-icons/react/ssr";

function CharNav() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { cart } = useContext(CartContext);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Navbar expand="lg" className="navbar-cafe">
      {/* Desktop: logo sits outside Container on the canopy */}
      <Link to="/" className="navbar-canopy-logo d-none d-lg-flex">
        <img src={`${process.env.PUBLIC_URL}/park_logo.PNG`} alt="Park LoFi Studio logo" />
      </Link>
      <Container>
        {/* Mobile: logo inline with brand text */}
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2">
          <img
            src={`${process.env.PUBLIC_URL}/park_logo.PNG`}
            alt=""
            className="d-lg-none navbar-brand-logo-mobile"
          />
          Park LoFi Studio
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvasNavbar" onClick={handleShow} />

        <Navbar.Offcanvas
          show={show}
          onHide={handleClose}
          placement="end"
          className="cafe-offcanvas"
          style={{ backgroundColor: 'var(--lofi-crema)', backgroundImage: 'var(--paper-texture)' }}
        >
          <Offcanvas.Header closeButton closeVariant="white">
            <Offcanvas.Title>Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="ms-auto align-items-center gap-3">
              <Nav.Link as={Link} to="/" onClick={handleClose}>Home</Nav.Link>
              <Nav.Link as={Link} to="/shop" onClick={handleClose}>Shop</Nav.Link>
              <Nav.Link as={Link} to="/about" onClick={handleClose}>About</Nav.Link>
              <Nav.Link as={Link} to="/contact" onClick={handleClose}>Contact</Nav.Link>
              <Nav.Link as={Link} to="/cart" className="ms-3 position-relative" onClick={handleClose}>
                <BasketIcon weight="duotone" size={32} color="#4A3018" />
                {cartCount > 0 && (
                  <Badge className="badge-strawberry position-absolute translate-middle">
                    {cartCount}
                  </Badge>
                )}
              </Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default CharNav;
