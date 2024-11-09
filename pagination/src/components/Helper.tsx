// import { useEffect, useState } from "react";
// import "./App.css";

// function App() {
//   const [products, setProducts] = useState<any>([]);

//   const [page, setPage] = useState<number>(1);

//   const [totalPages, setTotalPages] = useState<any>();

//   // const

//   const fetchProducts = async () => {
//     fetch("https://dummyjson.com/product");

//     // const res = await fetch(
//     //   `https://dummyjson.com/products?limit=10&skip=${page * 6 - 6}`
//     // );

//     const res = await fetch("https://dummyjson.com/product");
//     const data = await res.json();
//     setProducts(data.products);
//     setTotalPages(Math.floor(data.total / 6));

//     console.log(data);
//   };

//   console.log("product length", products.length);
//   console.log("Total", totalPages);
//   console.log(products);

//   useEffect(() => {
//     fetchProducts();
//   }, [page]);

//   const handlePages = (index: any) => {
//     if (index > 0 && index <= products.length / 6 && index != page) {
//       setPage(index);
//     }
//   };

//   return (
//     <>
//       <div className="products">
//         {products
//           .slice(page * 6 - 6, page * 6)
//           .map((item: any, index: number) => {
//             return (
//               <>
//                 <div key={index} className="products__single">
//                   <img src={item.thumbnail} alt="product" />
//                   <h3>{item.title}</h3>
//                 </div>
//               </>
//             );
//           })}
//       </div>
//       {products.length > 0 && (
//         <div className="pagination">
//           <span onClick={() => handlePages(page - 1)}>👈</span>
//           {[...Array(products.length / 6)].map((_, i) => (
//             // {[...Array(totalPages)].map((_, i) => (
//             <span
//               className={page === i + 1 ? "gray" : ""}
//               key={i}
//               onClick={() => handlePages(i + 1)}
//             >
//               {i + 1}
//             </span>
//           ))}
//           {/* <span onClick={() => handlePages(page + 1)}>👉</span> */}
//           <span onClick={() => handlePages(page + 1)}>👉</span>
//         </div>
//       )}
//     </>
//   );
// }

// export default App;
