export function bigintToFloat(value: string, decimals: number = 18): number {
  const bigintValue = BigInt(value)
  const factor = BigInt(10 ** decimals)
  const integralPart = bigintValue / factor
  const fractionalPart = bigintValue % factor
  const fractionalAsString = fractionalPart.toString().padStart(decimals, '0') // Ensure 18 decimal places

  // Combine integral and fractional parts and convert to a floating-point number
  return parseFloat(integralPart.toString() + '.' + fractionalAsString)
}
