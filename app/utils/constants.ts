export const assets = [
  { symbol: 'ETHx' },
  { symbol: 'stETH' },
  { symbol: 'sfrxETH' }
] as const

// Ensure there is a contract address for each asset above
export const contracts = {
  ETHx: '0xa35b1b31ce002fbf2058d22f30f95d405200a15b',
  stETH: '0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84',
  sfrxETH: '0xac3E018457B222d93114458476f3E3416Abbe38F',

  rsETH: '0xA1290d69c65A6Fe4DF752f95823fae25cB99e5A7',
  lrtOracle: '0x349A73444b1a310BAe67ef67973022020d70020d',
  lrtDepositPool: '0x036676389e48133B63a802f8635AD39E752D375D',
  lrtConfig: '0x947Cb49334e6571ccBFEF1f1f1178d8469D65ec7'
} as const
