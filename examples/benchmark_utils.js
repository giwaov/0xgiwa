/**
 * Benchmarking Utilities
 * 
 * Helper functions for measuring and comparing code performance
 */

/**
 * Simple benchmarking function
 * @param {Function} fn - Function to benchmark
 * @param {string} label - Label for the benchmark
 * @param {number} iterations - Number of times to run (default: 1)
 * @returns {number} Average execution time in milliseconds
 */
function benchmark(fn, label = 'Operation', iterations = 1) {
  const start = performance.now();
  
  for (let i = 0; i < iterations; i++) {
    fn();
  }
  
  const end = performance.now();
  const total = end - start;
  const average = total / iterations;
  
  console.log(`${label}: ${total.toFixed(3)}ms total (${average.toFixed(3)}ms avg over ${iterations} iterations)`);
  
  return average;
}

/**
 * Compare performance of multiple functions
 * @param {Array} functions - Array of {fn, label} objects
 * @param {number} iterations - Number of iterations per function
 */
function compare(functions, iterations = 100) {
  console.log(`\nComparing ${functions.length} implementations (${iterations} iterations each):\n`);
  
  const results = functions.map(({ fn, label }) => {
    const avgTime = benchmark(fn, label, iterations);
    return { label, avgTime };
  });
  
  // Sort by performance
  results.sort((a, b) => a.avgTime - b.avgTime);
  
  console.log('\nRanking (fastest to slowest):');
  results.forEach((result, index) => {
    const speedup = index === 0 ? 1 : result.avgTime / results[0].avgTime;
    console.log(`${index + 1}. ${result.label}: ${speedup.toFixed(2)}x ${index === 0 ? '(baseline)' : 'slower'}`);
  });
}

/**
 * Memory usage snapshot
 * Note: Only works in Node.js environment
 */
function memorySnapshot(label = '') {
  if (typeof process !== 'undefined' && process.memoryUsage) {
    const used = process.memoryUsage();
    console.log(`Memory ${label}:`);
    for (let key in used) {
      console.log(`  ${key}: ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`);
    }
  }
}

/**
 * Profile a function with memory and time metrics
 * @param {Function} fn - Function to profile
 * @param {string} label - Label for the profile
 */
function profile(fn, label = 'Operation') {
  console.log(`\n=== Profiling: ${label} ===`);
  
  memorySnapshot('before');
  
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  
  memorySnapshot('after');
  
  console.log(`Execution time: ${(end - start).toFixed(3)}ms`);
  
  return result;
}

// Example usage
if (typeof require !== 'undefined' && require.main === module) {
  console.log('=== Benchmarking Utilities Examples ===\n');
  
  // Example 1: Simple benchmark
  console.log('Example 1: Simple Benchmark\n');
  
  benchmark(() => {
    let sum = 0;
    for (let i = 0; i < 1000; i++) {
      sum += i;
    }
  }, 'Sum 1-1000', 1000);
  
  // Example 2: Comparing implementations
  console.log('\n\nExample 2: Comparing Implementations\n');
  
  const testArray = Array.from({ length: 1000 }, (_, i) => i);
  
  compare([
    {
      label: 'for loop',
      fn: () => {
        let sum = 0;
        for (let i = 0; i < testArray.length; i++) {
          sum += testArray[i];
        }
        return sum;
      }
    },
    {
      label: 'forEach',
      fn: () => {
        let sum = 0;
        testArray.forEach(n => sum += n);
        return sum;
      }
    },
    {
      label: 'reduce',
      fn: () => testArray.reduce((acc, n) => acc + n, 0)
    },
    {
      label: 'for...of',
      fn: () => {
        let sum = 0;
        for (const n of testArray) {
          sum += n;
        }
        return sum;
      }
    }
  ], 1000);
  
  // Example 3: Profiling with memory
  console.log('\n\nExample 3: Memory Profiling\n');
  
  profile(() => {
    const largeArray = new Array(1000000).fill(0).map((_, i) => i * 2);
    return largeArray.reduce((acc, n) => acc + n, 0);
  }, 'Large array operation');
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    benchmark,
    compare,
    memorySnapshot,
    profile
  };
}
