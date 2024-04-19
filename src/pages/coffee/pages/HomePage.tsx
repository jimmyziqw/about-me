
export default function HomePage({setIsCoffeeVisible}:any) {
  //conveyer
  const handleCoffeeClick = () => setIsCoffeeVisible(true);
  return (
     <div className="home-page">
      <section className="hero-section">
        <h1>Welcome to jimmy Horton</h1>
        <p> Your favorite spot on Internet.</p>
        <h2> same second delivery </h2>
        <button className="hero-section-btn" onClick={handleCoffeeClick}> Try Now </button>
      </section>

      <section className ="feature-section-one">
        <h1>Placeholder</h1>
        <h2>Placerholder2</h2>
      </section>

    
    </div>

  );
};

