const Landing = () => {
  return (
    <>
      <section style={{ background: "yellow" }}>
        <h1>RIGHT CAR. RIGHT PRICE</h1>
        <h4>Your car. Right here.</h4>
        <div
          className="landing-search"
          style={{ background: "white", width: "80%" }}
        >
          <input
            type="text"
            placeholder="Search Make, Model, or Keyword"
            style={{ width: "400px" }}
          />
          <button>GO</button>
        </div>
      </section>
    </>
  );
};

export default Landing;
