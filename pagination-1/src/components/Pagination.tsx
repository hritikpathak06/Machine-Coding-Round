import { useEffect, useState } from "react";

const Pagination = () => {
  const [products, setProducts] = useState<any[]>([]);

  const [page, setPage] = useState<number>(1);

  const limit = 6;

  useEffect(() => {
    (async () => {
      const res = await fetch("https://dummyjson.com/products");
      const data = await res.json();
      //   console.log("Data==>> ", data.products);
      setProducts(data.products);
    })();
  }, [page]);

  const handlePageTraversal = (pageNo: number) => {
    setPage(pageNo);
  };

  const totalPage = products.length / limit;

  const startIndex = (page - 1) * limit;
  console.log("Start Index==>> ", startIndex);

  const selectedProducts = products.slice(startIndex, startIndex + limit);

  console.log("Selected Products==>> ", selectedProducts);

  console.log("Total Page==>> ", totalPage);

  return (
    <div className="main_div">
      <div className="sub_div">
        {selectedProducts?.map((product: any, idx: number) => {
          return (
            <div className="card_container">
              <img
                src={product.images[0]}
                alt=""
                style={{ height: "80px", width: "80px", objectFit: "contain" }}
              />
            </div>
          );
        })}
      </div>

      <div className="pagination">
        {Array.from({ length: totalPage }, (_, index) => {
          return (
            <div>
              <button
                className={`${page == index + 1 ? "active" : ""}`}
                onClick={() => handlePageTraversal(index + 1)}
              >
                {index + 1}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Pagination;
