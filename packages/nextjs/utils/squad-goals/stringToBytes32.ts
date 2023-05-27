import { ethers } from "ethers";

function stringToBytes32(value: string) {
  // Ensure the value is not longer than 32 bytes
  const truncatedValue = value.substring(0, 32);

  // Convert the truncated value to bytes32
  const bytes32Value = ethers.utils.formatBytes32String(truncatedValue);

  // Convert bytes32 to BigNumber
  const bigNumberValue = ethers.BigNumber.from(bytes32Value);

  return bigNumberValue;
}

function bytes32ToString(bytes32Value: any) {
  // Remove the leading "0x" from the bytes32 string
  const strippedString = bytes32Value.slice(2);

  // Convert the stripped string to ASCII representation
  const asciiString = ethers.utils.parseBytes32String("0x" + strippedString);

  return asciiString;
}

export { stringToBytes32, bytes32ToString };
