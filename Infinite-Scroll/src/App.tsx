
import Calculator from './components/Calculator'
import InfiniteScroll from './components/InfiniteScroll'
import OTP from './components/OTP'

const App = () => {
  return (
    <div>
      {/* <InfiniteScroll/> */}
      {/* <OTP/> */}
      <Calculator/>
    </div>
  )
}

export default App



// import { useEffect, useState } from "react";

// const App = () => {
//   const [items, setItems] = useState<string[] | any>([]); // Store items to be displayed
//   const [loading, setLoading] = useState<boolean>(false); // For showing loading indicator
//   const [page, setPage] = useState<number>(1); // Track current page

//   // Function to fetch items (simulating API call)
//   const fetchItems = async (page: number) => {
//     setLoading(true);
//     const response = await fetch(
//       `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=10`
//     );
//     const data = await response.json();
//     setLoading(false);
//     return data;
//   };

//   // Load items based on the current page
//   const loadMoreItems = async () => {
//     const newItems = await fetchItems(page);
//     setItems((prevItems: any) => [...prevItems, ...newItems]);
//   };

//   // Handle scroll event
//   const handleScroll = () => {
//     const bottom =
//       window.innerHeight + document.documentElement.scrollTop ===
//       document.documentElement.offsetHeight;
//     if (bottom && !loading) {
//       setPage((prevPage) => prevPage + 1); // Go to the next page when bottom is reached
//     }
//   };

//   // Fetch initial items and set up scroll listener
//   useEffect(() => {
//     loadMoreItems(); // Load items on initial render
//   }, []);

//   // Watch for page change and load more items
//   useEffect(() => {
//     if (page > 1) {
//       loadMoreItems(); // Load more items whenever page changes
//     }
//   }, [page]);

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll); // Add scroll event listener

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   console.log("Inner width", window.innerWidth);
//   console.log("Outer top:::", document.documentElement.scrollTop);

//   return (
//     <div>
//       <div className="items-container">
//         {items.map((item: any, index: number) => (
//           <div key={index} className="item">
//             <img src={item.thumbnailUrl} alt={item.title} width="200" />
//             <p>{item.title}</p>
//           </div>
//         ))}
//       </div>
//       {loading && <div className="loading">Loading...</div>}
//     </div>
//   );
// };

// export default App;
