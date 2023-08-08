export default function PlayGame() {
  const containerStyle = {
    backgroundImage: "url('../src/assets/play.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100vw",
    height: "100vh",
  };
  const handleButtonClick = () => {
    window.location.href = "/intron";
  };
  const handleGift = () => {
    alert("giỏ quà");
  };
  const handleRating = () => {
    alert("bảng xếp hạng ");
  };
  const handleInstruct = () => {
    alert("hướng dẫn");
  };
  return (
    <div
      style={containerStyle}
      className="flex flex-col items-center justify-center"
    >
      <h1 className="mt-[20vw]" style={{ color: "#FFF" }}>
        LƯỢT CHƠI CÒN LẠI : 03
      </h1>
      <img
        src="../src/assets/button.png"
        alt="button"
        className="text-center mt-5 w-[18em]"
        onClick={handleButtonClick}
      />
      <div className="w-screen mt-[30px]">
        <div
          style={{
            position: "absolute",
            marginTop: "58px",
            marginLeft: "50px",
            marginRight: "50px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div className="basis-1/4 flex flex-col items-center">
            <img
              src="../src/assets/giftbaskets.png"
              alt="logobackgroup"
              className="text-center w-[18em]"
              onClick={handleGift}
            />
            <p className="text-center text-sm" style={{ color: "#fff" }}>
              Giỏ quà
            </p>
          </div>
          <div className="basis-1/4 flex flex-col items-center">
            <img
              src="../src/assets/ratings.png"
              alt="logobackgroup"
              className="text-center w-[18em]"
              onClick={handleRating}
            />
            <p className="text-center text-sm" style={{ color: "#fff" }}>
              Bảng xếp hạng
            </p>
          </div>
          <div className="basis-1/4 flex flex-col items-center">
            <img
              src="../src/assets/instruct.png"
              alt="logobackgroup"
              className="text-center w-[18em]"
              onClick={handleInstruct}
            />
            <p className="text-center text-sm" style={{ color: "#fff" }}>
              Hướng dẫn
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
