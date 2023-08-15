import { USER_TOKEN_KEY } from "../constants";

type InmemStorage = {
  userToken: string | null;
  enableMusic: boolean;
  enableSound: boolean;
  policyApproved?: boolean;
  clientWidth?: number;
  clientHeight?: number;
  paddingTop?: number;
  paddingBottom?: number;
};

const inmemStorage: InmemStorage = {
  userToken: null,
  enableMusic: true,
  enableSound: true,
};

export const getClientResolution = (): {
  width?: number;
  height?: number;
  paddingTop?: number;
  paddingBottom?: number;
} => {
  try {
    const value = localStorage.getItem("screen::resolution");
    if (value) {
      const objectValue = JSON.parse(value);
      return objectValue;
    }
    return {};
  } catch (error) {
    return {
      width: inmemStorage.clientWidth,
      height: inmemStorage.clientHeight,
      paddingTop: inmemStorage.paddingTop,
      paddingBottom: inmemStorage.paddingBottom,
    };
  }
};

export const setClientResolution = (
  width: number,
  height: number,
  padTop?: number,
  padBottom?: number
) => {
  try {
    localStorage.setItem(
      "screen::resolution",
      JSON.stringify({
        width,
        height,
        paddingTop: padTop,
        paddingBottom: padBottom,
      })
    );
  } catch (error) {
    inmemStorage.clientWidth = width;
    inmemStorage.clientHeight = height;
    inmemStorage.paddingTop = padTop;
    inmemStorage.paddingBottom = padBottom;
  }
};

export const getUserToken = (): string | null => {
  try {
    const token = localStorage.getItem(USER_TOKEN_KEY);
    return token;
  } catch (error) {
    return inmemStorage.userToken;
  }
};

export const setUserToken = (token: string) => {
  try {
    localStorage.setItem(USER_TOKEN_KEY, token);
  } catch (error) {
    inmemStorage.userToken = token;
  }
};

export const getMusicSetting = (): boolean => {
  try {
    const enableMusic = localStorage.getItem("setting::enableMusic");

    if (enableMusic) {
      return JSON.parse(enableMusic);
    } else {
      setMusicSetting(true);
      return true;
    }
  } catch (error) {
    return inmemStorage.enableMusic;
  }
};

export const setMusicSetting = (isEnable: boolean) => {
  try {
    localStorage.setItem("setting::enableMusic", isEnable.toString());
  } catch (error) {
    inmemStorage.enableMusic = isEnable;
  }
};

export const setSoundFXSetting = (isEnable: boolean) => {
  try {
    localStorage.setItem("setting::enableSound", isEnable.toString());
  } catch (error) {
    inmemStorage.enableSound = isEnable;
  }
};

export const getSoundFXSetting = (): boolean => {
  try {
    const enableSound = localStorage.getItem("setting::enableSound");

    if (enableSound) {
      return JSON.parse(enableSound);
    } else {
      setSoundFXSetting(true);
      return true;
    }
  } catch (error) {
    return inmemStorage.enableSound;
  }
};

export const setPolicyApproved = (approved: boolean) => {
  try {
    localStorage.setItem("setting::policyApproved", approved.toString());
  } catch (error) {
    inmemStorage.policyApproved = approved;
  }
};

export const getPolicyApproved = (): boolean | undefined => {
  try {
    const enableSound = localStorage.getItem("setting::policyApproved");

    if (enableSound) {
      return JSON.parse(enableSound);
    } else {
      return undefined;
    }
  } catch (error) {
    return inmemStorage.policyApproved;
  }
};
