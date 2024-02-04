import ethxSrc from '~/assets/ethx.svg'
import sfrxSrc from '~/assets/sfrx.svg'
import stEthSrc from '~/assets/stETH.svg'
import mEthSrc from '~/assets/mETH.svg'
import oethSrc from '~/assets/oeth.svg'

export const assets = [
  { symbol: 'OETH', src: oethSrc, name: 'Origin Ether' },
  { symbol: 'stETH', src: stEthSrc, name: 'Lido Staked ETH' },
  { symbol: 'mETH', src: mEthSrc, name: 'Mantle Staked Ether' },
  { symbol: 'ETHx', src: ethxSrc, name: 'Stader ETHx' },
  { symbol: 'sfrxETH', src: sfrxSrc, name: 'Staked Frax Ether' },
  { symbol: 'swETH', src: sfrxSrc, name: 'Swell ETH' },
  { symbol: 'rETH', src: sfrxSrc, name: 'Rocket Pool ETH' },
] as const

// Ensure there is a contract address for each asset above
export const contracts = {
  ETHx: '0xa35b1b31ce002fbf2058d22f30f95d405200a15b',
  stETH: '0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84',
  sfrxETH: '0xac3E018457B222d93114458476f3E3416Abbe38F',
  OETH: '0x856c4Efb76C1D1AE02e20CEB03A2A6a08b0b8dC3',
  mETH: '0xd5f7838f5c461feff7fe49ea5ebaf7728bb0adfa',
  rETH: '0xae78736cd615f374d3085123a210448e74fc6393',
  swETH: '0xf951e335afb289353dc249e82926178eac7ded78',

  primeETH: '0x6ef3D766Dfe02Dc4bF04aAe9122EB9A0Ded25615',
  lrtOracle: '0xA755c18CD2376ee238daA5Ce88AcF17Ea74C1c32',
  lrtDepositPool: '0xA479582c8b64533102F6F528774C536e354B8d32',
  lrtConfig: '0xF879c7859b6DE6FAdaFB74224Ff05b16871646bF',
} as const

export const lrtOraclePriceMethod = 'primeETHPrice'
