"""
Performance Optimization Examples - Python

This file demonstrates common performance issues and their optimized solutions.
"""

import time
from functools import lru_cache
from typing import List, Set

# ============================================================================
# Example 1: List Operations - Nested Loops vs Set Lookup
# ============================================================================

print('=== Example 1: List Operations ===\n')

# Inefficient: O(n²) complexity
def find_common_elements_slow(list1: List[int], list2: List[int]) -> List[int]:
    common = []
    for item1 in list1:
        for item2 in list2:
            if item1 == item2:
                common.append(item1)
                break
    return common

# Optimized: O(n) complexity using set
def find_common_elements_fast(list1: List[int], list2: List[int]) -> List[int]:
    set2 = set(list2)
    return [item for item in list1 if item in set2]

# Benchmark
test_list1 = list(range(1000))
test_list2 = list(range(0, 2000, 2))

start = time.perf_counter()
result1 = find_common_elements_slow(test_list1, test_list2)
print(f'Slow (nested loops): {(time.perf_counter() - start) * 1000:.2f}ms')

start = time.perf_counter()
result2 = find_common_elements_fast(test_list1, test_list2)
print(f'Fast (set lookup): {(time.perf_counter() - start) * 1000:.2f}ms\n')

# ============================================================================
# Example 2: String Concatenation
# ============================================================================

print('=== Example 2: String Concatenation ===\n')

# Inefficient: Creates new string each iteration
def build_string_slow(parts: List[str]) -> str:
    result = ''
    for part in parts:
        result += part + ' '
    return result

# Optimized: Uses join
def build_string_fast(parts: List[str]) -> str:
    return ' '.join(parts)

test_parts = [f'word{i}' for i in range(1000)]

start = time.perf_counter()
result1 = build_string_slow(test_parts)
print(f'Slow (concatenation): {(time.perf_counter() - start) * 1000:.2f}ms')

start = time.perf_counter()
result2 = build_string_fast(test_parts)
print(f'Fast (join): {(time.perf_counter() - start) * 1000:.2f}ms\n')

# ============================================================================
# Example 3: List Comprehension vs Loop
# ============================================================================

print('=== Example 3: List Comprehension ===\n')

# Inefficient: Using append in loop
def square_numbers_slow(numbers: List[int]) -> List[int]:
    result = []
    for num in numbers:
        result.append(num ** 2)
    return result

# Optimized: List comprehension
def square_numbers_fast(numbers: List[int]) -> List[int]:
    return [num ** 2 for num in numbers]

test_numbers = list(range(10000))

start = time.perf_counter()
result1 = square_numbers_slow(test_numbers)
print(f'Slow (loop with append): {(time.perf_counter() - start) * 1000:.2f}ms')

start = time.perf_counter()
result2 = square_numbers_fast(test_numbers)
print(f'Fast (list comprehension): {(time.perf_counter() - start) * 1000:.2f}ms\n')

# ============================================================================
# Example 4: Memoization with lru_cache
# ============================================================================

print('=== Example 4: Memoization ===\n')

# Inefficient: Recalculates values
def fibonacci_slow(n: int) -> int:
    if n <= 1:
        return n
    return fibonacci_slow(n - 1) + fibonacci_slow(n - 2)

# Optimized: Using lru_cache decorator
@lru_cache(maxsize=None)
def fibonacci_fast(n: int) -> int:
    if n <= 1:
        return n
    return fibonacci_fast(n - 1) + fibonacci_fast(n - 2)

start = time.perf_counter()
result1 = fibonacci_slow(30)
print(f'Slow (no memoization) - fib(30): {(time.perf_counter() - start) * 1000:.2f}ms')

start = time.perf_counter()
result2 = fibonacci_fast(30)
print(f'Fast (memoized) - fib(30): {(time.perf_counter() - start) * 1000:.2f}ms\n')

# ============================================================================
# Example 5: Generator vs List
# ============================================================================

print('=== Example 5: Generator vs List ===\n')

# Inefficient: Loads all data into memory
def process_large_dataset_slow(n: int) -> int:
    data = [i ** 2 for i in range(n)]
    return sum(data)

# Optimized: Uses generator
def process_large_dataset_fast(n: int) -> int:
    return sum(i ** 2 for i in range(n))

n = 1000000

start = time.perf_counter()
result1 = process_large_dataset_slow(n)
print(f'Slow (list): {(time.perf_counter() - start) * 1000:.2f}ms')

start = time.perf_counter()
result2 = process_large_dataset_fast(n)
print(f'Fast (generator): {(time.perf_counter() - start) * 1000:.2f}ms\n')

# ============================================================================
# Example 6: Dictionary Lookup vs List Search
# ============================================================================

print('=== Example 6: Dictionary Lookup ===\n')

# Inefficient: Linear search in list
def has_permission_slow(user_id: int, allowed_users: List[int]) -> bool:
    return user_id in allowed_users

# Optimized: Hash lookup in set
def has_permission_fast(user_id: int, allowed_users: Set[int]) -> bool:
    return user_id in allowed_users

test_list = list(range(10000))
test_set = set(range(10000))
search_id = 9999

start = time.perf_counter()
for _ in range(1000):
    has_permission_slow(search_id, test_list)
print(f'Slow (list search): {(time.perf_counter() - start) * 1000:.2f}ms')

start = time.perf_counter()
for _ in range(1000):
    has_permission_fast(search_id, test_set)
print(f'Fast (set lookup): {(time.perf_counter() - start) * 1000:.2f}ms\n')

# ============================================================================
# Example 7: Using any() and all() for Short-Circuit Evaluation
# ============================================================================

print('=== Example 7: Short-Circuit Evaluation ===\n')

# Inefficient: Checks all elements
def has_negative_slow(numbers: List[int]) -> bool:
    result = False
    for num in numbers:
        if num < 0:
            result = True
    return result

# Optimized: Uses any() with generator
def has_negative_fast(numbers: List[int]) -> bool:
    return any(num < 0 for num in numbers)

test_numbers = list(range(10000)) + [-1]

start = time.perf_counter()
result1 = has_negative_slow(test_numbers)
print(f'Slow (no short-circuit): {(time.perf_counter() - start) * 1000:.2f}ms')

start = time.perf_counter()
result2 = has_negative_fast(test_numbers)
print(f'Fast (any with short-circuit): {(time.perf_counter() - start) * 1000:.2f}ms\n')

# ============================================================================
# Example 8: Avoid Global Variable Lookups
# ============================================================================

print('=== Example 8: Local vs Global Variables ===\n')

MULTIPLIER = 2

# Inefficient: Global variable lookup in tight loop
def compute_slow(numbers: List[int]) -> List[int]:
    return [num * MULTIPLIER for num in numbers]

# Optimized: Cache global as local
def compute_fast(numbers: List[int]) -> List[int]:
    multiplier = MULTIPLIER  # Local variable
    return [num * multiplier for num in numbers]

test_numbers = list(range(100000))

start = time.perf_counter()
result1 = compute_slow(test_numbers)
print(f'Slow (global lookup): {(time.perf_counter() - start) * 1000:.2f}ms')

start = time.perf_counter()
result2 = compute_fast(test_numbers)
print(f'Fast (local variable): {(time.perf_counter() - start) * 1000:.2f}ms\n')

# ============================================================================
# Performance Tips Summary
# ============================================================================

print('=== Performance Tips Summary ===\n')
print('1. Use set/dict for membership testing instead of list')
print('2. Use join() for string concatenation, not +=')
print('3. Prefer list comprehensions over loops with append')
print('4. Use @lru_cache for expensive recursive functions')
print('5. Use generators for large datasets to save memory')
print('6. Use any()/all() for short-circuit evaluation')
print('7. Cache global variables as local in tight loops')
print('8. Always profile with timeit or cProfile before optimizing')
