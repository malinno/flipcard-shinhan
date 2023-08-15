import { EMITTER_EVENTS } from "../constants";
import eventEmitter from "./eventEmitter";

type showNoticeOpts = {
  closeable: boolean;
};

const defaultOptions: showNoticeOpts = {
  closeable: true,
};

const showNotice = (notice: string, options = defaultOptions) => {
  eventEmitter.emit(EMITTER_EVENTS.SHOW_NOTICE, {
    visible: true,
    notice,
    ...options,
  });
};

export const closeNotice = () => {
  eventEmitter.emit(EMITTER_EVENTS.SHOW_NOTICE, {
    visible: false,
    closeable: true,
  });
};

export default showNotice;
