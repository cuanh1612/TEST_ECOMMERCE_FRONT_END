import { Box } from "@chakra-ui/react";
import { useProducts } from "../api/product.api";
import ProductCard from "../components/ProductCard";

function Products() {
  const { data } = useProducts();

  return (
    <Box
      columnCount={{ md: 2 }}
      columnGap="16px"
      breakInside={"avoid"}
      rowGap={2}
      spaceY={4}
    >
      {data && data.map((item, i) => <ProductCard key={i} {...item} />)}
    </Box>
  );
}

export default Products;
