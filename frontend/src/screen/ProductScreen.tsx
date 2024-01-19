import { Link, useParams } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Button, Card, Image, ListGroup } from "react-bootstrap";
import Rating from "../components/Rating";
import { useImmer } from "use-immer";
import { useEffect } from "react";
import axios from "axios";

export const ProductScreen = () => {
  const [product, setProduct] = useImmer({
    image: "",
    name: "",
    rating: undefined,
    numReviews: undefined,
    price: undefined,
    description: "",
    countInStock: undefined,
  });
  const { id: productID } = useParams();
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${productID}`);
      return data;
    };
    fetchProduct().then((data) => setProduct(data));
  }, []);
  console.log(product);
  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      <Row>
        <Col md={5}>
          <Image src={product?.image} alt={product?.name} fluid />
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product?.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product?.rating}
                text={`${product?.numReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>Price: ${product?.price}</ListGroup.Item>
            <ListGroup.Item>Description: {product?.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product?.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    <strong>
                      {product?.countInStock && product?.countInStock > 0
                        ? "In Stock"
                        : "Out of Stock"}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <div className="d-grid">
                  <Button
                    type="button"
                    className="btn-block"
                    disabled={product?.countInStock === 0}
                  >
                    Add to Cart
                  </Button>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};
