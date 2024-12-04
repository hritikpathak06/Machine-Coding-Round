import { useEffect, useRef, useState } from "react";

const InfiniteScroll = () => {
  const [photos, setPhotos] = useState<any[]>([]);
  const [page, setPage] = useState(1);

  const loaderRef = useRef<HTMLDivElement | null>(null);

  const fetchImages = async () => {
    try {
      const url = `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=10`;
      const result = await fetch(url);
      const data = await result.json();

      setPhotos((prevPhotos) => [...prevPhotos, ...data]);
    } catch (error) {
      console.error("Error fetching the data:", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, []);

  return (
    <div className="app">
      <h1>Infinite Scroll</h1>
      {photos.map((image, idx) => (
        <h2 key={image.id}>{image.title}</h2>
      ))}
      <div ref={loaderRef} style={{ height: "20px", background: "lightgray" }}></div>
    </div>
  );
};

export default InfiniteScroll;
