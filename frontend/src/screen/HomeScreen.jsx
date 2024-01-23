import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Product from "../components/Product";
import { useKeyGen } from "../utils";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";

export const HomeScreen = () => {
  const keygen = useKeyGen();
  const { data: products, isLoading, isError, error } = useGetProductsQuery();
  const ProductList = (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products?.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product {...product} />
          </Col>
        ))}
      </Row>
    </>
  );
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant={"danger"}>
          {error.data.message || error.error}
        </Message>
      ) : (
        ProductList
      )}
    </>
  );
};
