const fibonacci = (n) => {
  if (!Number.isInteger(n) || n < 1 || n > 1000) {
    throw new Error('Fibonacci input must be an integer between 1 and 1000');
  }
  
  const result = [];
  let a = 0, b = 1;
  
  for (let i = 0; i < n; i++) {
    result.push(a);
    [a, b] = [b, a + b];
  }
  
  return result;
};

const isPrime = (num) => {
  if (!Number.isInteger(num) || num < 2) return false;
  if (num === 2) return true;
  if (num % 2 === 0) return false;
  
  for (let i = 3; i * i <= num; i += 2) {
    if (num % i === 0) return false;
  }
  
  return true;
};

const filterPrimes = (arr) => {
  if (!Array.isArray(arr) || arr.length === 0) {
    throw new Error('Prime input must be a non-empty array');
  }
  
  return arr.filter(num => isPrime(num));
};

const gcd = (a, b) => {
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return Math.abs(a);
};

const hcf = (arr) => {
  if (!Array.isArray(arr) || arr.length === 0) {
    throw new Error('HCF input must be a non-empty array');
  }
  
  return arr.reduce((acc, num) => {
    if (!Number.isInteger(num)) {
      throw new Error('All HCF inputs must be integers');
    }
    return gcd(acc, num);
  });
};

const lcm = (a, b) => {
  return Math.abs(a * b) / gcd(a, b);
};

const calculateLCM = (arr) => {
  if (!Array.isArray(arr) || arr.length === 0) {
    throw new Error('LCM input must be a non-empty array');
  }
  
  return arr.reduce((acc, num) => {
    if (!Number.isInteger(num) || num === 0) {
      throw new Error('All LCM inputs must be non-zero integers');
    }
    return lcm(acc, num);
  });
};

module.exports = {
  fibonacci,
  filterPrimes,
  calculateLCM,
  hcf
};
