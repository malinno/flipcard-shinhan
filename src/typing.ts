export enum VoucherType {
  VOUCHER_0K = 'VOUCHER_0K',
  VOUCHER_10K = 'VOUCHER_10K',
  VOUCHER_20K = 'VOUCHER_20K',
  VOUCHER_50K = 'VOUCHER_50K',
  VOUCHER_100K = 'VOUCHER_100K',
  VOUCHER_200K = 'VOUCHER_200K',
  VOUCHER_500K = 'VOUCHER_500K',
  VOUCHER_1000K = 'VOUCHER_1000K',
}

export type VoucherItem = {
  _id: string;
  itemId: string;
  type: VoucherType;
  createdAt: string;
  expiredAt: string;
};
