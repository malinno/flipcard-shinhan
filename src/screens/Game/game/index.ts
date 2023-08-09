import {
  Align,
  AssetManager,
  InputEvent,
  PolygonBatch,
  ViewportInputHandler,
  createGameLoop,
  createStage,
  createViewport,
} from "gdxts";

const WORLD_WIDTH = 640;
const WORLD_HEIGHT = 1385;

const FLIP_UP_DURATION = 0.2;
const FLIP_DOWN_DURATION = 0.2;
const FADE_DURATION = 0.2;
const FADE_DELAY = 0.2;

const SHOW_ALL_DURATION = 4;

interface Transition {
  type: "flip-up" | "flip-down" | "fade";
  elapse: number;
  duration: number;
}
export const init = async () => {
  const stage = createStage();
  const canvas = stage.getCanvas();
  const viewport = createViewport(canvas, WORLD_WIDTH, WORLD_HEIGHT);
  const gl = viewport.getContext();

  const assetManager = new AssetManager(gl);
  assetManager.loadTexture("./assets/bg.png", "bg");
  assetManager.loadAtlas("./assets/atlas/flipcard.atlas", "flipcard");
  assetManager.loadFont("./assets/font/inter.fnt", "inter", true);

  const camera = viewport.getCamera();
  camera.setYDown(true);

  await assetManager.finishLoading();

  const batch = new PolygonBatch(gl);
  batch.setYDown(true);

  const bg = assetManager.getTexture("bg")!;
  const altas = assetManager.getAtlas("flipcard")!;
  const backRegion = altas.findRegion("back", -1)!;
  // const shadowRegion = altas.findRegion("shadow", -1)!;
  const cardRegions = altas.findRegions("card");
  const belowRegion = altas.findRegions("below")[0]!;
  let initialized = false;

  const cells: {
    type: number;
    flipped: boolean;
    hidden: boolean;
    transition?: Transition;
  }[] = [];

  let showAllCountdown = 0;

  const reset = () => {
    initialized = false;
    cells.length = 0;
    for (let i = 0; i < 12; i++) {
      cells.push({
        type: i % 6,
        flipped: true,
        hidden: false,
      });
    }
    cells.sort(() => Math.random() - 0.5);

    showAllCountdown = SHOW_ALL_DURATION;

    setTimeout(() => {
      initialized = true;
      for (let cell of cells) {
        cell.flipped = false;
        cell.transition = {
          type: "flip-down",
          duration: FLIP_DOWN_DURATION,
          elapse: 0,
        };
      }
    }, SHOW_ALL_DURATION * 1000);
  };

  reset();

  const COLS = 3;
  const ROWS = 4;
  const START_X = 95.5;
  const START_Y = 600;
  const GAP = WORLD_WIDTH / 64;
  const CELL_WIDTH = (WORLD_WIDTH - 2 * START_X - GAP * (COLS + 1)) / COLS;
  const CELL_HEIGHT = (CELL_WIDTH / 329) * 343;
  // const SHADOW_OFFSET = CELL_WIDTH * 0.05;

  const inputHandler = new ViewportInputHandler(viewport);
  let flipped = 0;

  inputHandler.addEventListener(InputEvent.TouchStart, () => {
    if (!initialized) {
      return;
    }
    if (flipped >= 2) {
      return;
    }
    const { x, y } = inputHandler.getTouchedWorldCoord();
    const cellX = Math.floor((x - START_X) / (CELL_WIDTH + GAP));
    const cellY = Math.floor((y - START_Y) / (CELL_HEIGHT + GAP));
    const cellPos = cellY * COLS + cellX;
    if (cellX < 0 || cellX >= COLS || cellY < 0 || cellY >= ROWS) {
      return;
    }
    const cell = cells[cellPos];
    if (cell.flipped || cell.hidden) {
      return;
    }
    const otherFlipped = cells.find((c) => c.flipped && !c.hidden);
    cell.flipped = true;
    cell.transition = {
      type: "flip-up",
      duration: FLIP_UP_DURATION,
      elapse: 0,
    };
    flipped++;
    if (otherFlipped) {
      if (otherFlipped.type === cells[cellPos].type) {
        setTimeout(() => {
          cell.transition = {
            type: "fade",
            duration: FADE_DURATION,
            elapse: 0,
          };
          otherFlipped.transition = {
            type: "fade",
            duration: FADE_DURATION,
            elapse: 0,
          };
        }, (FLIP_UP_DURATION + FADE_DELAY) * 1000);
        setTimeout(() => {
          otherFlipped.hidden = true;
          cell.hidden = true;
          flipped = 0;

          if (cells.findIndex((c) => !c.hidden) === -1) {
            setTimeout(() => {
              alert("You win!");
              reset();
            }, 500);
          }
        }, (FLIP_UP_DURATION + FADE_DURATION + FADE_DELAY - 0.05) * 1000);
      } else {
        setTimeout(() => {
          otherFlipped.flipped = false;
          cell.flipped = false;
          flipped = 0;
          cell.transition = {
            type: "flip-down",
            duration: FLIP_DOWN_DURATION,
            elapse: 0,
          };
          otherFlipped.transition = {
            type: "flip-down",
            duration: FLIP_DOWN_DURATION,
            elapse: 0,
          };
        }, 500);
      }
    }
  });

  const font = assetManager.getFont("inter")!;

  gl.clearColor(0, 0, 0, 0);
  const loop = createGameLoop((delta: number) => {
    for (let cell of cells) {
      if (!cell.transition) {
        continue;
      }
      cell.transition.elapse += delta;
      if (cell.transition.elapse >= cell.transition.duration) {
        cell.transition = undefined;
      }
    }

    gl.clear(gl.COLOR_BUFFER_BIT);
    batch.setProjection(camera.combined);
    batch.begin();
    batch.draw(bg, 0, 0, WORLD_WIDTH, WORLD_HEIGHT);
    for (let i = 0; i < cells.length; i++) {
      const x = i % COLS;
      const y = Math.floor(i / COLS);

      const cell = cells[i];

      if (cell.hidden) {
        continue;
      }

      let region = cell.flipped ? cardRegions[cell.type] : backRegion;
      let scaleX = 1;
      let scaleY = 1;

      const transition = cell.transition;

      if (transition && transition.type === "flip-up") {
        if (transition.elapse < transition.duration / 2) {
          region = backRegion;
          scaleX = 1 - transition.elapse / (transition.duration / 2);
        } else {
          region = cardRegions[cell.type];
          scaleX =
            (transition.elapse - transition.duration / 2) /
            (transition.duration / 2);
        }
      }

      if (transition && transition.type === "flip-down") {
        if (transition.elapse < transition.duration / 2) {
          region = cardRegions[cell.type];
          scaleX = 1 - transition.elapse / (transition.duration / 2);
        } else {
          region = backRegion;
          scaleX =
            (transition.elapse - transition.duration / 2) /
            (transition.duration / 2);
        }
      }

      if (transition && transition.type === "fade") {
        scaleX = 1 - transition.elapse / transition.duration;
        scaleY = scaleX;
      }
      belowRegion.draw(
        batch,
        WORLD_WIDTH / 2 - 182,
        WORLD_HEIGHT * 0.9,
        362,
        (310 * 64) / 256
      );

      font.data.setXYScale(0.6);
      font.draw(
        batch,
        "Điểm",
        WORLD_WIDTH / 2 - 170,
        WORLD_HEIGHT * 0.9,
        WORLD_WIDTH / 10,
        Align.center,
        true
      );
      font.draw(
        batch,
        "level",
        WORLD_WIDTH / 2 - 182,
        WORLD_HEIGHT * 0.9,
        WORLD_WIDTH / 10,
        Align.center,
        true
      );
      font.data.setXYScale(1);

      // shadowRegion.draw(
      //   batch,
      //   START_X + x * (CELL_WIDTH + GAP),
      //   START_Y + y * (CELL_HEIGHT + GAP) + SHADOW_OFFSET,
      //   CELL_WIDTH,
      //   CELL_HEIGHT,
      //   CELL_WIDTH / 2,
      //   CELL_HEIGHT / 2,
      //   0,
      //   scaleX,
      //   scaleY
      // );
      region.draw(
        batch,
        START_X + x * (CELL_WIDTH + GAP),
        START_Y + y * (CELL_HEIGHT + GAP),
        CELL_WIDTH,
        CELL_HEIGHT,
        CELL_WIDTH / 2,
        CELL_HEIGHT / 2,
        0,
        scaleX,
        scaleY
      );
    }

    showAllCountdown -= delta;
    if (showAllCountdown > 0) {
      if (showAllCountdown <= 1) {
        font.data.setXYScale(0.6);
      }
      font.draw(
        batch,
        showAllCountdown > 1 ? Math.floor(showAllCountdown).toString() : "GO!",
        0,
        520,
        WORLD_WIDTH,
        Align.center,
        true
      );
      font.data.setXYScale(1);
    }

    batch.end();
  });

  return {
    dispose() {
      loop.stop();
      stage.cleanup();
      inputHandler.cleanup();
      batch.dispose();
      assetManager.disposeAll();
    },
  };
};
