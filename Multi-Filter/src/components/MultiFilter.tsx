import React, { useState } from "react";

const product_data = [
  {
    name: "T-Shirt",
    price: 500,
    category: "Clothes",
  },
  {
    name: "Jeans",
    price: 1200,
    category: "Clothes",
  },
  {
    name: "Jacket",
    price: 2500,
    category: "Clothes",
  },
  {
    name: "Sneakers",
    price: 3000,
    category: "Clothes",
  },
  {
    name: "Cap",
    price: 300,
    category: "Clothes",
  },
  {
    name: "Smartphone",
    price: 15000,
    category: "Electronics",
  },
  {
    name: "Laptop",
    price: 50000,
    category: "Electronics",
  },
  {
    name: "Headphones",
    price: 2000,
    category: "Electronics",
  },
  {
    name: "Smart Watch",
    price: 4000,
    category: "Electronics",
  },
  {
    name: "Tablet",
    price: 25000,
    category: "Electronics",
  },
  {
    name: "Dining Table",
    price: 8000,
    category: "Furniture",
  },
  {
    name: "Sofa",
    price: 15000,
    category: "Furniture",
  },
  {
    name: "Chair",
    price: 2000,
    category: "Furniture",
  },
  {
    name: "Bed",
    price: 20000,
    category: "Furniture",
  },
  {
    name: "Bookshelf",
    price: 5000,
    category: "Furniture",
  },
  {
    name: "Football",
    price: 800,
    category: "Sports",
  },
  {
    name: "Cricket Bat",
    price: 1200,
    category: "Sports",
  },
  {
    name: "Tennis Racket",
    price: 2500,
    category: "Sports",
  },
  {
    name: "Basketball",
    price: 1000,
    category: "Sports",
  },
  {
    name: "Badminton Shuttlecock",
    price: 500,
    category: "Sports",
  },
];


const MultiFilter = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [products, setProducts] = useState<any[]>(product_data);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [priceRange, setPriceRange] = useState<Set<string>>(new Set());

  const handleSearch = (e: any) => {
    const query = e.target.value;
    setSearchQuery(query);
    filterProducts(query, selectedCategory, priceRange);
  };

  const handleCategoryChange = (e: any) => {
    const currentCategory = e.target.value;
    setSelectedCategory(currentCategory);
    filterProducts(searchQuery, currentCategory, priceRange);
  };

  const handlePriceChange = (e: any) => {
    const range = e.target.value;
    const updatedPriceRange = new Set(priceRange);

    if (updatedPriceRange.has(range)) {
      updatedPriceRange.delete(range);
    } else {
      updatedPriceRange.add(range);
    }

    setPriceRange(updatedPriceRange);
    filterProducts(searchQuery, selectedCategory, updatedPriceRange);
  };

  const filterProducts = (
    query: string,
    category: string,
    prices: Set<string>
  ) => {
    let filtered = product_data;

    if (query.trim() !== "") {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (category.trim() !== "") {
      filtered = filtered.filter((product) => product.category === category);
    }

    if (prices.size > 0) {
      filtered = filtered.filter((product) => {
        for (let price of prices) {
          const [min, max] = price.split("-").map(Number);
          if (product.price >= min && (max ? product.price <= max : true)) {
            return true;
          }
        }
        return false;
      });
    }

    setProducts(filtered);
  };

  return (
    <>
      <div className="container">
        <div className="left_container">
          {/* Filters */}
          <h1>All Filters</h1>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search for products..."
          />

          <select
            name=""
            id=""
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="">Select the category</option>
            <option value="Sports">Sports</option>
            <option value="Clothes">Clothes</option>
            <option value="Electronics">Electronics</option>
            <option value="Furniture">Furniture</option>
          </select>

          <h3>Price Range</h3>
          <div>
            <label>
              <input
                type="checkbox"
                value="0-1000"
                onChange={handlePriceChange}
              />
              Under ₹1000
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                value="1001-5000"
                onChange={handlePriceChange}
              />
              ₹1001 - ₹5000
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                value="5001-20000"
                onChange={handlePriceChange}
              />
              ₹5001 - ₹20000
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                value="20001-"
                onChange={handlePriceChange}
              />
              Above ₹20000
            </label>
          </div>
        </div>

        <div className="right_container">
          {/* Products */}
          {products.length > 0 ? (
            products.map((product, idx) => (
              <div className="boxes" key={idx}>
                <h1>{product.name}</h1>
                <h3>₹{product.price}</h3>
                <h3>{product.category}</h3>
              </div>
            ))
          ) : (
            <p>No products found!</p>
          )}
        </div>
      </div>
    </>
  );
};

export default MultiFilter;

