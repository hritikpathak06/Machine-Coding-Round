import { useEffect, useRef } from 'react';

const LandingPage = () => {
  const containerRef = useRef<any>(null);

  useEffect(() => {
    const container = containerRef.current;

    let isScrolling = false;

    const handleScroll = (e:any) => {
      e.preventDefault(); // Prevent default scroll behavior
      if (!isScrolling) {
        isScrolling = true;

        const sectionWidth = window.innerWidth;
        const scrollLeft = container.scrollLeft;

        // Determine next or previous section based on scroll direction
        if (e.deltaY > 0) {
          // Scroll right
          container.scrollTo({
            left: scrollLeft + sectionWidth,
            behavior: 'smooth',
          });
        } else {
          // Scroll left
          container.scrollTo({
            left: scrollLeft - sectionWidth,
            behavior: 'smooth',
          });
        }

        // Wait until scrolling is finished
        setTimeout(() => {
          isScrolling = false;
        }, 500); // Adjust timeout to match smooth scrolling duration
      }
    };

    container.addEventListener('wheel', handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      container.removeEventListener('wheel', handleScroll);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-screen h-screen flex overflow-x-hidden snap-x snap-mandatory"
    >
      {/* Section 1: Hero */}
      <section className="w-screen h-full flex-shrink-0 snap-center bg-blue-900 text-white flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-4xl font-bold">Welcome to XYZ Construction</h1>
          <p className="mt-4 text-lg">Building your dreams with quality and precision.</p>
        </div>
      </section>

      {/* Section 2: Services */}
      <section className="w-screen h-full flex-shrink-0 snap-center bg-gray-100 text-gray-800 flex items-center justify-center">
        <div className="text-center p-8">
          <h2 className="text-3xl font-bold">Our Services</h2>
          <p className="mt-4 text-lg">Residential, Commercial, Renovations, and more.</p>
        </div>
      </section>

      {/* Section 3: About Us */}
      <section className="w-screen h-full flex-shrink-0 snap-center bg-yellow-500 text-white flex items-center justify-center">
        <div className="text-center p-8">
          <h2 className="text-3xl font-bold">About Us</h2>
          <p className="mt-4 text-lg">Years of experience in delivering excellence.</p>
        </div>
      </section>

      {/* Section 4: Portfolio */}
      <section className="w-screen h-full flex-shrink-0 snap-center bg-green-700 text-white flex items-center justify-center">
        <div className="text-center p-8">
          <h2 className="text-3xl font-bold">Our Portfolio</h2>
          <p className="mt-4 text-lg">Take a look at our past projects.</p>
        </div>
      </section>

      {/* Section 5: Contact */}
      <section className="w-screen h-full flex-shrink-0 snap-center bg-gray-800 text-white flex items-center justify-center">
        <div className="text-center p-8">
          <h2 className="text-3xl font-bold">Get in Touch</h2>
          <p className="mt-4 text-lg">Contact us for more information and estimates.</p>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
