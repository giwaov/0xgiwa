/**
 * Performance Optimization Examples - JavaScript
 * 
 * This file demonstrates common performance issues and their optimized solutions.
 */

// ============================================================================
// Example 1: Array Operations - Nested Loops vs Set Lookup
// ============================================================================

console.log('=== Example 1: Array Operations ===\n');

// Inefficient: O(n²) complexity
function findCommonElementsSlow(arr1, arr2) {
  const common = [];
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      if (arr1[i] === arr2[j]) {
        common.push(arr1[i]);
        break;
      }
    }
  }
  return common;
}

// Optimized: O(n) complexity
function findCommonElementsFast(arr1, arr2) {
  const set2 = new Set(arr2);
  return arr1.filter(item => set2.has(item));
}

// Benchmark
const testArr1 = Array.from({ length: 1000 }, (_, i) => i);
const testArr2 = Array.from({ length: 1000 }, (_, i) => i * 2);

console.time('Slow (nested loops)');
findCommonElementsSlow(testArr1, testArr2);
console.timeEnd('Slow (nested loops)');

console.time('Fast (Set lookup)');
findCommonElementsFast(testArr1, testArr2);
console.timeEnd('Fast (Set lookup)');

console.log('\n');

// ============================================================================
// Example 2: String Concatenation
// ============================================================================

console.log('=== Example 2: String Concatenation ===\n');

// Inefficient: Creates new string each iteration
function buildStringSlow(parts) {
  let result = '';
  for (let part of parts) {
    result += part + ' ';
  }
  return result;
}

// Optimized: Uses array join
function buildStringFast(parts) {
  return parts.join(' ');
}

const testParts = Array.from({ length: 1000 }, (_, i) => `word${i}`);

console.time('Slow (concatenation)');
buildStringSlow(testParts);
console.timeEnd('Slow (concatenation)');

console.time('Fast (array join)');
buildStringFast(testParts);
console.timeEnd('Fast (array join)');

console.log('\n');

// ============================================================================
// Example 3: Object Property Access
// ============================================================================

console.log('=== Example 3: Object Property Access ===\n');

// Inefficient: Repeated property access
function processDataSlow(data) {
  let sum = 0;
  for (let i = 0; i < data.items.length; i++) {
    sum += data.items[i].value * data.multiplier;
  }
  return sum;
}

// Optimized: Cache frequently accessed properties
function processDataFast(data) {
  const items = data.items;
  const multiplier = data.multiplier;
  const length = items.length;
  let sum = 0;
  
  for (let i = 0; i < length; i++) {
    sum += items[i].value * multiplier;
  }
  return sum;
}

const testData = {
  items: Array.from({ length: 10000 }, (_, i) => ({ value: i })),
  multiplier: 2
};

console.time('Slow (repeated access)');
processDataSlow(testData);
console.timeEnd('Slow (repeated access)');

console.time('Fast (cached properties)');
processDataFast(testData);
console.timeEnd('Fast (cached properties)');

console.log('\n');

// ============================================================================
// Example 4: Memoization
// ============================================================================

console.log('=== Example 4: Memoization ===\n');

// Inefficient: Recalculates values
function fibonacciSlow(n) {
  if (n <= 1) return n;
  return fibonacciSlow(n - 1) + fibonacciSlow(n - 2);
}

// Optimized: Memoized version
const fibonacciFast = (() => {
  const cache = new Map();
  return function fib(n) {
    if (n <= 1) return n;
    if (cache.has(n)) return cache.get(n);
    const result = fib(n - 1) + fib(n - 2);
    cache.set(n, result);
    return result;
  };
})();

console.time('Slow (no memoization) - fib(35)');
fibonacciSlow(35);
console.timeEnd('Slow (no memoization) - fib(35)');

console.time('Fast (memoized) - fib(35)');
fibonacciFast(35);
console.timeEnd('Fast (memoized) - fib(35)');

console.log('\n');

// ============================================================================
// Example 5: Array Methods
// ============================================================================

console.log('=== Example 5: Array Methods ===\n');

// Inefficient: Multiple array iterations
function processArraySlow(arr) {
  const filtered = arr.filter(x => x > 10);
  const doubled = filtered.map(x => x * 2);
  const sum = doubled.reduce((acc, x) => acc + x, 0);
  return sum;
}

// Optimized: Single iteration
function processArrayFast(arr) {
  return arr.reduce((acc, x) => {
    if (x > 10) {
      return acc + (x * 2);
    }
    return acc;
  }, 0);
}

const testArray = Array.from({ length: 100000 }, (_, i) => i);

console.time('Slow (multiple iterations)');
processArraySlow(testArray);
console.timeEnd('Slow (multiple iterations)');

console.time('Fast (single iteration)');
processArrayFast(testArray);
console.timeEnd('Fast (single iteration)');

console.log('\n');

// ============================================================================
// Example 6: Debouncing for Event Handlers
// ============================================================================

console.log('=== Example 6: Debouncing ===\n');

// Inefficient: Executes on every event
function onInputSlow(event) {
  console.log('Processing:', event.target.value);
  // Expensive operation here
}

// Optimized: Debounced version
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

const onInputFast = debounce((event) => {
  console.log('Processing:', event.target.value);
  // Expensive operation here
}, 300);

console.log('Debouncing prevents excessive function calls during rapid events');
console.log('Example: Input events, scroll events, resize events\n');

// ============================================================================
// Example 7: Early Return / Short Circuit
// ============================================================================

console.log('=== Example 7: Early Return ===\n');

// Inefficient: Checks all conditions
function validateUserSlow(user) {
  let valid = true;
  
  if (!user) valid = false;
  if (user && !user.name) valid = false;
  if (user && !user.email) valid = false;
  if (user && user.email && !user.email.includes('@')) valid = false;
  
  return valid;
}

// Optimized: Early return
function validateUserFast(user) {
  if (!user) return false;
  if (!user.name) return false;
  if (!user.email) return false;
  if (!user.email.includes('@')) return false;
  
  return true;
}

console.log('Early return pattern avoids unnecessary checks');
console.log('Especially important when checks are expensive\n');

// ============================================================================
// Performance Tips Summary
// ============================================================================

console.log('=== Performance Tips Summary ===\n');
console.log('1. Use appropriate data structures (Set, Map) for lookups');
console.log('2. Avoid string concatenation in loops - use array join');
console.log('3. Cache frequently accessed properties');
console.log('4. Implement memoization for expensive recursive functions');
console.log('5. Minimize array iterations - combine operations when possible');
console.log('6. Debounce expensive event handlers');
console.log('7. Use early returns to avoid unnecessary checks');
console.log('8. Always benchmark to validate optimizations');
