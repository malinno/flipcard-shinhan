import { VoucherType } from './typing';

export const USER_TOKEN_KEY = '@userToken';
export const USER_TOKEN_HEADER = 'authorization';

export const CAMPAIGN_START_DATE = '19/06/2023';
export const CAMPAIGN_END_DATE = '16/07/2023';

export const UI_RATIO = 0.56;
export const CANVAS_RATIO = 414 / 621;

export const EMITTER_EVENTS = {
  GAME_INITED: 'app::gameInited',
  SHOW_NOTICE: 'app::showNotice',
  START_SPIN: 'app::startSpin',
  SPIN_RESULT: 'app:spinResult',
  SPIN_ERROR: 'app:spinError',
  SHOW_REWARD: 'app::showReward',
  SHOW_BASKET: 'app:showBasket',
  SHOW_OUT_OF_TICKET: 'app:showOutOfTicket',
  VIEW_DETAIL_MISSION: 'app::viewDetailMission',
  UPDATE_NUMBER_OF_TICKETS: 'app:updateNumberOfTickets',
  SPIN_TOUCH_START: 'app:spinTouchStart',
  SPIN_TOUCH_OUTSIDE: 'app:spinTouchOutside',
  UPDATE_SPIN_STATE: 'app:updateSpinState',
  UPDATE_SPIN_BUTTON_ACTIVE_STATE: 'app:updateSpinButtonActiveState',
};

export const VoucherTypeMap: { [key: string]: VoucherType } = {
  LUCKY_WISH: VoucherType.VOUCHER_0K,
  EV_10K: VoucherType.VOUCHER_10K,
  EV_20K: VoucherType.VOUCHER_20K,
  EV_50K: VoucherType.VOUCHER_50K,
  EV_100K: VoucherType.VOUCHER_100K,
  EV_200K: VoucherType.VOUCHER_200K,
  EV_500K: VoucherType.VOUCHER_500K,
  EV_1M: VoucherType.VOUCHER_1000K,
};

export const VOUCHER_VALUES = {
  [VoucherType.VOUCHER_0K]: '',
  [VoucherType.VOUCHER_10K]: '10.000 VNĐ',
  [VoucherType.VOUCHER_20K]: '20.000 VNĐ',
  [VoucherType.VOUCHER_50K]: '50.000 VNĐ',
  [VoucherType.VOUCHER_100K]: '100.000 VNĐ',
  [VoucherType.VOUCHER_200K]: '200.000 VNĐ',
  [VoucherType.VOUCHER_500K]: '500.000 VNĐ',
  [VoucherType.VOUCHER_1000K]: '1.000.000 VNĐ',
};
