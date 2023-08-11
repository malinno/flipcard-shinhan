export default function intron() {
  const handleButtonClick = () => {
    window.location.href = "/flipcard";
  };
  return (
    <div
      style={{
        backgroundImage: "url('../src/assets/play.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        width: "100vw",
        height: "100vh",
        position: "relative",
      }}
      className="flex flex-col items-center justify-center"
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          zIndex: 1,
        }}
      ></div>
      <img
        src="../src/assets/backgroupin.png"
        style={{
          width: "18rem",
          position: "absolute",
          bottom: "94px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />
      <h1
        className="ml-[10px]  z-10 absolute top-[308px] ml-[119px]"
        style={{ color: "#fff" }}
      >
        Tổng số bước: 30
      </h1>
      <img
        src="../src/assets/oclockgame.png"
        className="w-[250px] z-10 absolute top-[315px]"
      />
      <h1
        className="z-10 absolute top-[370px] text-center"
        style={{ color: "#fff" }}
      >
        Nhận số điểm cao nhất khi sử dụng ít <br /> bước lật và thời gian nhất.
      </h1>
      <img
        src="../src/assets/backgroupintron.png"
        className="z-10 w-[183px] absolute top-[472px] mr-[101px]"
      />
      <h1
        className="z-10 absolute top-[660px] text-center"
        style={{ color: "#fff" }}
      >
        Ghép các thẻ giống nhau để nhận <br />
        điểm thưởng nhé!
      </h1>
      <img
        src="../src/assets/buttonunderstood.png"
        className=" w-[10em] z-10 absolute top-[712px] "
        onClick={handleButtonClick}
      />
    </div>
  );
}
