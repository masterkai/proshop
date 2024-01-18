import Row from "react-bootstrap/Row";
import products from "../products";
import Col from "react-bootstrap/Col";
import Product from "../components/Product";

export const HomeScreen = () => {
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product {...product} />
          </Col>
        ))}
      </Row>
    </>
  );
};
