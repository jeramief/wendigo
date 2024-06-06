import "./Landing.css";

const Landing = () => {
  return (
    <section className="landing-page-container">
      <h1 className="landing-page-container-h1">RIGHT CAR. RIGHT PRICE</h1>
      <h4 className="landing-page-container-h4">Your car. Right here.</h4>
      <div className="landing-page-search-container">
        <input
          className="landing-page-search"
          type="text"
          placeholder="Search Make, Model, or Keyword"
          style={{ width: "400px" }}
        />
        <button className="landing-page-go-button">GO</button>
      </div>
    </section>
  );
};

export default Landing;
