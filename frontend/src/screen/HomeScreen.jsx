import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Product from "../components/Product";
import { useKeyGen } from "../utils";
import useProducts from "../hooks/useProducts";

export const HomeScreen = () => {
  const keygen = useKeyGen();
  const { data: products, status } = useProducts();
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {status === "success"
          ? products.map((product) => (
              <Col key={keygen.getKey(product)} sm={12} md={6} lg={4} xl={3}>
                <Product {...product} />
              </Col>
            ))
          : null}
      </Row>
    </>
  );
};
