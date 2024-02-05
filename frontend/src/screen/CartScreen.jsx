import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Message from "../components/Message";
import { Button, Form, Image, ListGroup } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../slices/cartSlice";

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const addToCartHandler = async (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };
  const removeFromCartHandler = async (id) => {
    dispatch(removeFromCart(id));
  };
  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };
  const subtotal = cartItems.reduce((acc, item) => acc + Number(item.qty), 0);
  console.log({ subtotal });
  return (
    <Row>
      <Col md={8}>
        <h1 style={{ marginBottom: "20px" }}>CartScreen</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your Cart is empty <Link to={"/"}>Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item._id}>
                <Row>
                  <Col md={2}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fluid
                      rounded
                      style={{ width: "100px" }}
                    />
                  </Col>
                  <Col md={3}>
                    <Link to={`/products/${item._id}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        addToCartHandler(item, Number(e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option value={x + 1} key={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      onClick={() => removeFromCartHandler(item._id)}
                      type={"button"}
                      variant={"light"}
                    >
                      <FaTrash />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <ListGroup variant={"flush"}>
          <ListGroup.Item>
            <h2>Subtotal ({subtotal}) items</h2>$
            {cartItems
              .reduce((acc, item) => acc + item.qty * item.price, 0)
              .toFixed(2)}
          </ListGroup.Item>
          <ListGroup.Item>
            <Button
              type={"button"}
              className={"btn-block"}
              disabled={cartItems.length === 0}
              onClick={checkoutHandler}
            >
              Proceed To Checkout
            </Button>
          </ListGroup.Item>
        </ListGroup>
      </Col>
    </Row>
  );
};

export default CartScreen;
