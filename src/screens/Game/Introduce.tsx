export default function intron() {
  const containerStyle = {
    backgroundImage: "url('../src/assets/intron.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    width: "100vw",
    height: "100vh",
  };
  const handleButtonClick = () => {
    window.location.href = "/game";
  };
  return (
    <div
      style={containerStyle}
      className="flex flex-col items-center justify-center"
    >
      <div style={{ position: "fixed", top: "287px" }}>
        <div>
          <h1
            style={{
              color: "#FFF",
              position: "fixed",
              top: "307px",
              marginLeft: "9px",
              fontSize: "14px",
            }}
          >
            Tổng số bước: 30
          </h1>

          <img
            src="../src/assets/oclok.png"
            alt="oclok"
            className="w-[15em]"
            style={{ position: "fixed", top: "312px", marginLeft: "-117px" }}
          />
        </div>
      </div>
      <h1
        style={{
          color: "#fff",
          fontSize: "15px",
          textAlign: "center",
          position: "fixed",
          top: "360px",
        }}
      >
        Nhận số điểm cao nhất khi sử dụng ít <br /> bước lật và thời gian nhất.
      </h1>
      <img
        src="../src/assets/backgroupintron.png"
        alt="backgroupintron"
        className="w-[15em]"
        style={{
          position: "fixed",
          top: "453px",
          width: "47%",
          marginLeft: "-98px",
        }}
      />
      <h1
        style={{
          color: "#fff",
          fontSize: "15px",
          textAlign: "center",
          position: "fixed",
          top: "644px",
        }}
      >
        Ghép các thẻ giống nhau để nhận <br /> điểm thưởng nhé!
      </h1>
      <img
        src="../src/assets/buttonunderstood.png"
        alt="buttonunderstood"
        className=" w-[10em]"
        style={{ position: "fixed", top: "715px" }}
        onClick={handleButtonClick}
      />
    </div>
  );
}
