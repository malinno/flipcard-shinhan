import { Howl } from "howler";
import { getMusicSetting, getSoundFXSetting } from "./storage";

export enum SoundFxId {
  BUTTON = "button",
  REWARD = "reward",
  LUCKY_WISH = "lucky-wish",
  ROLL = "roll",
}

export enum MusicId {
  THEME = "theme",
  SPIN_THEME = "spin",
}

export enum AudioType {
  MUSIC,
  SOUND_FX,
}

class SoundUtils {
  playingBgMusics: Array<string> = [];
  loadedSounds: { [key: string]: Howl } = {};
  soundMuteState: { [key: string]: boolean } = {};

  isMusicEnable = false;
  isSoundFxEnable = false;
  isFocus = false;

  constructor() {
    Object.values(MusicId).forEach((item) => {
      this.soundMuteState[`${item}_${AudioType.MUSIC}`] = true;
    });
    Object.values(SoundFxId).forEach((item) => {
      this.soundMuteState[`${item}_${AudioType.SOUND_FX}`] = true;
    });
  }

  private handleVisibilityChange = () => {
    if (document.visibilityState === "visible") {
      soundUtils.setIsFocus(true);
      soundUtils.muteAll(false);
    } else {
      soundUtils.setIsFocus(false);
      soundUtils.muteAll(true);
    }
  };

  setup() {
    const isEnableMusic = getMusicSetting();
    soundUtils.setMusicEnable(isEnableMusic);
    soundUtils.mute(AudioType.MUSIC, !isEnableMusic);
    const isEnableSoundFx = getSoundFXSetting();
    soundUtils.mute(AudioType.SOUND_FX, !isEnableSoundFx);
    document.addEventListener("visibilitychange", this.handleVisibilityChange);
  }

  dispose() {
    for (const sound of Object.values(this.loadedSounds)) {
      sound.unload();
    }
    document.removeEventListener(
      "visibilitychange",
      this.handleVisibilityChange
    );
  }

  loadSound = (
    assetPath: string,
    soundName: string,
    isloop = false,
    volume = 1
  ) =>
    new Promise<void>((resolve) => {
      if (this.loadedSounds[soundName]) resolve();
      const sound = new Howl({
        src: [`${assetPath}${soundName}.mp3`],
        volume,
        loop: isloop,
        // html5: true,
        onloaderror: (soundId: number, error: unknown) => {
          //
        },
        onplayerror: (soundId: number, error: unknown) => {
          //
        },
      });

      sound.once("load", () => {
        this.loadedSounds[soundName] = sound;
        const audioType = this.isSoundFx(soundName)
          ? AudioType.SOUND_FX
          : AudioType.MUSIC;

        const muted = Object.keys(this.soundMuteState).find(
          (item) => item === `${soundName}_${audioType}`
        );
        if (muted !== undefined && muted !== null) {
          try {
            this.loadedSounds[soundName].mute(this.soundMuteState[muted]);
          } catch (error) {
            console.error(error);
          }
        }

        resolve();
      });
    });

  isSoundFx = (soundName: string) => {
    return !!Object.values(SoundFxId).find(
      (item) => (item as string) === soundName
    );
  };

  setIsFocus = (isFocus: boolean) => {
    this.isFocus = isFocus;
  };

  setMusicEnable = (isEnable: boolean) => {
    this.isMusicEnable = isEnable;
  };

  setSoundFxEnable = (isEnable: boolean) => {
    this.isSoundFxEnable = isEnable;
  };

  mute = (type: AudioType, isMuted: boolean): boolean => {
    if (type === AudioType.SOUND_FX) {
      Object.values(SoundFxId).forEach((sound) => {
        this.soundMuteState[`${sound}_${AudioType.SOUND_FX}`] = isMuted;
      });
    }

    if (type === AudioType.MUSIC) {
      Object.values(MusicId).forEach((sound) => {
        this.soundMuteState[`${sound}_${AudioType.MUSIC}`] = isMuted;
      });
    }

    let success = true;

    Object.keys(this.loadedSounds).forEach((key) => {
      if (
        (this.isSoundFx(key) && type === AudioType.SOUND_FX) ||
        (!this.isSoundFx(key) && type === AudioType.MUSIC)
      ) {
        try {
          this.loadedSounds[key]?.mute(isMuted);
        } catch (error) {
          console.error(error);
          success = false;
        }
      }
    });

    return success;
  };

  muteAll = (isMuted: boolean) => {
    if (this.isMusicEnable) {
      this.mute(AudioType.MUSIC, isMuted);
    }
    if (this.isSoundFxEnable) {
      this.mute(AudioType.SOUND_FX, isMuted);
    }
  };

  initSounds = async (assetPath: string) => {
    await Promise.all([
      this.loadSound(assetPath, MusicId.THEME, true, 0.4).then(() => {
        setTimeout(() => {
          soundUtils.play(MusicId.THEME);
        }, 100);
      }),
      this.loadSound(assetPath, MusicId.SPIN_THEME, true, 0.4),
      this.loadSound(assetPath, SoundFxId.BUTTON),
      this.loadSound(assetPath, SoundFxId.LUCKY_WISH),
      this.loadSound(assetPath, SoundFxId.REWARD),
      this.loadSound(assetPath, SoundFxId.ROLL),
    ]);
  };

  play = (soundName: string) => {
    const isBgMusic =
      soundName === MusicId.THEME || soundName === MusicId.SPIN_THEME;

    if (isBgMusic) {
      if (this.playingBgMusics.includes(soundName)) return;
      this.playingBgMusics.push(soundName);
    }

    const sound = this.loadedSounds[soundName];
    if ((isBgMusic && sound && !sound?.playing()) || sound) {
      try {
        sound.play();
      } catch (error) {
        console.error(error);
      }
    }
  };

  stop = (soundName: string) => {
    if (soundName === MusicId.THEME || soundName === MusicId.SPIN_THEME) {
      const soundIndex = this.playingBgMusics.findIndex(
        (item) => item === soundName
      );
      if (soundIndex > -1) {
        this.playingBgMusics.splice(soundIndex, 1);
      }
    }

    try {
      this.loadedSounds[soundName]?.stop();
    } catch (error) {
      console.error(error);
    }
  };
}

export const soundUtils = new SoundUtils();
