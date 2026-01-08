# Performance Optimization Guide

This guide identifies common slow or inefficient code patterns and provides optimized alternatives.

## Table of Contents

1. [Algorithm Complexity Issues](#algorithm-complexity-issues)
2. [Memory Management](#memory-management)
3. [Database Query Optimization](#database-query-optimization)
4. [Network and I/O Operations](#network-and-io-operations)
5. [Data Structure Selection](#data-structure-selection)
6. [Caching Strategies](#caching-strategies)
7. [Concurrency and Parallelism](#concurrency-and-parallelism)
8. [String Operations](#string-operations)

---

## Algorithm Complexity Issues

### ❌ Inefficient: Nested Loops (O(n²))

```javascript
// Slow: O(n²) complexity
function findCommonElements(arr1, arr2) {
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
```

### ✅ Optimized: Using Set (O(n))

```javascript
// Fast: O(n) complexity using Set
function findCommonElements(arr1, arr2) {
  const set2 = new Set(arr2);
  return arr1.filter(item => set2.has(item));
}
```

**Performance Gain**: ~100x faster for arrays with 1000+ elements

---

## Memory Management

### ❌ Inefficient: Creating Unnecessary Objects

```python
# Slow: Creates new list every iteration
def process_data(items):
    result = []
    for item in items:
        result = result + [item * 2]  # Creates new list each time
    return result
```

### ✅ Optimized: In-place Operations

```python
# Fast: Modifies list in-place
def process_data(items):
    result = []
    for item in items:
        result.append(item * 2)  # Amortized O(1)
    return result

# Even better: List comprehension
def process_data(items):
    return [item * 2 for item in items]
```

**Performance Gain**: ~10x faster for 10,000+ items

---

## Database Query Optimization

### ❌ Inefficient: N+1 Query Problem

```javascript
// Slow: Executes N+1 queries
async function getUsersWithPosts() {
  const users = await db.query('SELECT * FROM users');
  for (let user of users) {
    user.posts = await db.query('SELECT * FROM posts WHERE user_id = ?', [user.id]);
  }
  return users;
}
```

### ✅ Optimized: Using JOIN or Batch Loading

```javascript
// Fast: Single query with JOIN
async function getUsersWithPosts() {
  return await db.query(`
    SELECT u.*, p.id as post_id, p.title, p.content
    FROM users u
    LEFT JOIN posts p ON u.id = p.user_id
  `);
}

// Or use DataLoader for GraphQL applications
const userLoader = new DataLoader(async (userIds) => {
  const posts = await db.query(
    'SELECT * FROM posts WHERE user_id IN (?)',
    [userIds]
  );
  return userIds.map(id => posts.filter(p => p.user_id === id));
});
```

**Performance Gain**: ~100x faster with 100+ users

---

## Network and I/O Operations

### ❌ Inefficient: Sequential API Calls

```javascript
// Slow: Sequential execution
async function fetchUserData(userIds) {
  const users = [];
  for (let id of userIds) {
    const user = await fetch(`/api/users/${id}`);
    users.push(await user.json());
  }
  return users;
}
```

### ✅ Optimized: Parallel Requests

```javascript
// Fast: Parallel execution
async function fetchUserData(userIds) {
  const promises = userIds.map(id => 
    fetch(`/api/users/${id}`).then(r => r.json())
  );
  return await Promise.all(promises);
}

// Even better: Batch endpoint
async function fetchUserData(userIds) {
  const response = await fetch('/api/users/batch', {
    method: 'POST',
    body: JSON.stringify({ ids: userIds })
  });
  return await response.json();
}
```

**Performance Gain**: ~10x faster for 10 parallel requests

---

## Data Structure Selection

### ❌ Inefficient: Array for Lookups

```python
# Slow: O(n) lookup time
def has_permission(user_id, allowed_users):
    return user_id in allowed_users  # Linear search in list
```

### ✅ Optimized: Set or Dictionary

```python
# Fast: O(1) lookup time
def has_permission(user_id, allowed_users_set):
    return user_id in allowed_users_set  # Hash lookup in set

# Initialize as set
allowed_users = set([1, 2, 3, 4, 5])
```

**Performance Gain**: ~1000x faster for 10,000+ items

---

## Caching Strategies

### ❌ Inefficient: Recomputing Values

```javascript
// Slow: Recalculates on every call
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
```

### ✅ Optimized: Memoization

```javascript
// Fast: Caches computed values
const fibonacci = (() => {
  const cache = new Map();
  return function fib(n) {
    if (n <= 1) return n;
    if (cache.has(n)) return cache.get(n);
    const result = fib(n - 1) + fib(n - 2);
    cache.set(n, result);
    return result;
  };
})();

// Or use dynamic programming
function fibonacci(n) {
  const dp = [0, 1];
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}
```

**Performance Gain**: Exponential to linear time complexity

---

## Concurrency and Parallelism

### ❌ Inefficient: Single-threaded Processing

```python
# Slow: Processes items sequentially
def process_images(image_paths):
    results = []
    for path in image_paths:
        result = expensive_image_processing(path)
        results.append(result)
    return results
```

### ✅ Optimized: Parallel Processing

```python
# Fast: Uses multiprocessing
from multiprocessing import Pool

def process_images(image_paths):
    with Pool() as pool:
        results = pool.map(expensive_image_processing, image_paths)
    return results

# Or use asyncio for I/O-bound tasks
import asyncio

async def process_images(image_paths):
    tasks = [process_image_async(path) for path in image_paths]
    return await asyncio.gather(*tasks)
```

**Performance Gain**: ~4-8x faster on multi-core systems

---

## String Operations

### ❌ Inefficient: String Concatenation in Loops

```java
// Slow: Creates new string object each iteration
public String buildMessage(List<String> parts) {
    String result = "";
    for (String part : parts) {
        result += part + " ";  // Creates new String object
    }
    return result;
}
```

### ✅ Optimized: StringBuilder

```java
// Fast: Modifies buffer in-place
public String buildMessage(List<String> parts) {
    StringBuilder sb = new StringBuilder();
    for (String part : parts) {
        sb.append(part).append(" ");
    }
    return sb.toString();
}

// Even better: Use String.join()
public String buildMessage(List<String> parts) {
    return String.join(" ", parts);
}
```

**Performance Gain**: ~100x faster for 1000+ concatenations

---

## General Best Practices

### 1. **Measure Before Optimizing**
- Use profiling tools to identify actual bottlenecks
- Don't optimize prematurely
- Focus on the 20% of code that takes 80% of the time

### 2. **Choose the Right Algorithm**
- Understand time and space complexity (Big O notation)
- Consider the size of your data
- Trade-offs between time and space

### 3. **Minimize I/O Operations**
- Batch database queries
- Use connection pooling
- Implement caching layers

### 4. **Leverage Built-in Functions**
- Native implementations are usually faster
- Use language-specific optimizations
- Avoid reinventing the wheel

### 5. **Use Appropriate Data Structures**
- Arrays: Fast access by index
- Sets: Fast membership testing
- Maps/Dictionaries: Fast key-value lookup
- Linked Lists: Fast insertion/deletion

### 6. **Consider Memory Usage**
- Large allocations can cause garbage collection
- Reuse objects when possible
- Stream large datasets instead of loading into memory

### 7. **Profile and Benchmark**
```javascript
// Example: Simple benchmarking
console.time('operation');
// ... your code ...
console.timeEnd('operation');

// More precise: performance.now()
const start = performance.now();
// ... your code ...
const end = performance.now();
console.log(`Execution time: ${end - start}ms`);
```

---

## Benchmarking Tools

- **JavaScript**: `console.time()`, `performance.now()`, Benchmark.js
- **Python**: `timeit`, `cProfile`, `line_profiler`
- **Java**: JMH (Java Microbenchmark Harness)
- **Go**: `testing` package with `-bench` flag
- **General**: Apache Bench, wrk, autocannon

---

## Resources

- [Big-O Cheat Sheet](https://www.bigocheatsheet.com/)
- [Database Indexing Best Practices](https://use-the-index-luke.com/)
- [Web Performance Best Practices](https://web.dev/fast/)
- [Memory Management in JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management)

---

## Contributing

Found more performance patterns? Open an issue or pull request!
