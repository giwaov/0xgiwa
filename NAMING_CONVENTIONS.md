# Naming Conventions Guide

A comprehensive guide for writing descriptive and maintainable variable and function names across different programming languages.

## Table of Contents
1. [General Principles](#general-principles)
2. [Variable Naming](#variable-naming)
3. [Function Naming](#function-naming)
4. [Language-Specific Guidelines](#language-specific-guidelines)
5. [Common Anti-Patterns](#common-anti-patterns)
6. [Examples](#examples)

## General Principles

### 1. Be Descriptive and Clear
- Names should clearly communicate intent and purpose
- Avoid abbreviations unless they are widely understood (e.g., `url`, `id`, `html`)
- Use meaningful names that reduce the need for comments

### 2. Use Consistent Naming Conventions
- Follow the established conventions of your programming language
- Be consistent within your codebase
- Use the same terminology throughout the project

### 3. Keep Context in Mind
- Longer names for broader scopes (global, class-level)
- Shorter names acceptable for narrow scopes (loop counters, temporary variables)
- Include context when necessary to avoid ambiguity

### 4. Make Names Pronounceable
- Names should be easy to say and discuss with team members
- Avoid cryptic abbreviations or unnecessary shorthand

## Variable Naming

### Good Variable Names

#### Use Descriptive Nouns
```python
# Bad
d = 86400
x = "John"
arr = [1, 2, 3]

# Good
seconds_per_day = 86400
user_name = "John"
user_ages = [1, 2, 3]
```

#### Include Units When Relevant
```javascript
// Bad
timeout = 5000
distance = 100

// Good
timeoutMilliseconds = 5000
distanceKilometers = 100
maxRetryCount = 3
```

#### Use Boolean Variable Prefixes
```java
// Bad
visible = true;
enabled = false;

// Good
isVisible = true;
hasPermission = false;
canEdit = true;
shouldRetry = false;
```

#### Avoid Single-Letter Variables (except in specific cases)
```python
# Acceptable for loop counters
for i in range(10):
    print(i)

# Acceptable in math-heavy contexts
# Where x, y represent coordinates
point = Point(x=10, y=20)

# Bad for general use
n = getUserName()
s = processString(input)

# Good
count = getUserName()
sanitizedInput = processString(input)
```

### Variable Naming Patterns

#### Collections
```typescript
// Use plural for collections
const user = getUser();
const users = getUsers();
const customerList = getAllCustomers();
const productIds = products.map(p => p.id);
```

#### Constants
```python
# Use UPPER_CASE for constants
MAX_RETRY_ATTEMPTS = 3
DEFAULT_TIMEOUT_SECONDS = 30
API_BASE_URL = "https://api.example.com"
```

## Function Naming

### Good Function Names

#### Use Verb-Noun Pattern
```javascript
// Bad
data()
user()
response()

// Good
fetchData()
createUser()
parseResponse()
validateInput()
```

#### Be Specific About Actions
```python
# Bad
handle()
process()
do_something()

# Good
handleUserLogin()
processPayment()
calculateTotalPrice()
validateEmailAddress()
```

#### Boolean-Returning Functions
```java
// Use is, has, can, should prefixes
public boolean isValid() { }
public boolean hasPermission() { }
public boolean canAccess() { }
public boolean shouldRetry() { }

// Bad
public boolean valid() { }
public boolean permission() { }
```

#### Use Action Words Appropriately
```typescript
// Creation/Initialization
function createUser() { }
function initializeDatabase() { }

// Retrieval
function getUser() { }
function fetchData() { }
function retrieveSettings() { }

// Modification
function updateProfile() { }
function setPassword() { }
function modifyPermissions() { }

// Deletion
function deleteAccount() { }
function removeItem() { }
function clearCache() { }

// Validation/Checking
function validateEmail() { }
function checkPermissions() { }
function verifyToken() { }

// Computation
function calculateTotal() { }
function computeDistance() { }

// Conversion
function convertToJson() { }
function parseXml() { }
function formatDate() { }
```

## Language-Specific Guidelines

### Python
```python
# Variables and functions: snake_case
user_name = "John"
def calculate_total_price(items):
    pass

# Classes: PascalCase
class UserAccount:
    pass

# Constants: UPPER_SNAKE_CASE
MAX_CONNECTIONS = 100

# Private members: leading underscore
def _internal_helper():
    pass
```

### JavaScript/TypeScript
```typescript
// Variables and functions: camelCase
const userName = "John";
function calculateTotalPrice(items: Item[]): number {
    return 0;
}

// Classes and interfaces: PascalCase
class UserAccount { }
interface UserProfile { }

// Constants: UPPER_SNAKE_CASE or camelCase
const MAX_CONNECTIONS = 100;
const defaultTimeout = 30;

// Private members (TypeScript): # prefix or private keyword
class MyClass {
    #privateField;
    private privateMethod() { }
}
```

### Java
```java
// Variables and methods: camelCase
String userName = "John";
public double calculateTotalPrice(List<Item> items) {
    return 0.0;
}

// Classes and interfaces: PascalCase
public class UserAccount { }
public interface UserRepository { }

// Constants: UPPER_SNAKE_CASE
public static final int MAX_CONNECTIONS = 100;

// Package names: lowercase
package com.example.project;
```

### C#
```csharp
// Local variables and parameters: camelCase
string userName = "John";
public double CalculateTotalPrice(List<Item> items)
{
    return 0.0;
}

// Methods, Properties, Classes: PascalCase
public class UserAccount
{
    public string FirstName { get; set; }
    public void ProcessPayment() { }
}

// Constants and readonly fields: PascalCase
public const int MaxConnections = 100;
public readonly string ApiUrl = "https://api.example.com";

// Private fields: _camelCase (common convention)
private string _internalState;
```

### Go
```go
// Variables and functions: camelCase (unexported)
var userName = "John"
func calculateTotalPrice(items []Item) float64 {
    return 0.0
}

// Exported (public) names: PascalCase
type UserAccount struct { }
func GetUser(id string) (*User, error) {
    return nil, nil
}

// Constants: camelCase or PascalCase
const maxConnections = 100
const DefaultTimeout = 30
```

## Common Anti-Patterns

### 1. Hungarian Notation (Outdated)
```javascript
// Bad - Modern IDEs show types
let strUserName = "John";
let intCount = 5;
let arrUsers = [];

// Good - Type is clear from context or IDE
let userName = "John";
let count = 5;
let users = [];
```

### 2. Redundant Context
```typescript
// Bad - Repeating class name
class User {
    userName: string;
    userEmail: string;
    userAge: number;
}

// Good - Context is clear from class
class User {
    name: string;
    email: string;
    age: number;
}
```

### 3. Meaningless Names
```python
# Bad
def foo(x, y):
    temp = x
    x = y
    y = temp
    return x, y

# Good
def swap_values(first_value, second_value):
    temporary_value = first_value
    first_value = second_value
    second_value = temporary_value
    return first_value, second_value
```

### 4. Abbreviations and Acronyms
```java
// Bad - Not obvious
String usrNm = "John";
int cnt = 0;
List<String> msg = new ArrayList<>();

// Good - Clear and readable
String userName = "John";
int messageCount = 0;
List<String> messages = new ArrayList<>();

// Acceptable - Well-known acronyms
String htmlContent = "<div>Hello</div>";
URL apiUrl = new URL("https://api.example.com");
String jsonResponse = "{\"status\": \"ok\"}";
```

### 5. Magic Numbers Without Names
```python
# Bad
if age > 18:
    allow_access()

if len(password) < 8:
    show_error()

# Good
LEGAL_AGE = 18
MINIMUM_PASSWORD_LENGTH = 8

if age > LEGAL_AGE:
    allow_access()

if len(password) < MINIMUM_PASSWORD_LENGTH:
    show_error()
```

## Examples

### Example 1: User Authentication

#### Poor Naming
```python
def auth(u, p):
    if len(u) < 3 or len(p) < 6:
        return False
    r = db.get(u)
    if r and r['pw'] == hash(p):
        return True
    return False
```

#### Good Naming
```python
def authenticate_user(username, password):
    MINIMUM_USERNAME_LENGTH = 3
    MINIMUM_PASSWORD_LENGTH = 6
    
    if len(username) < MINIMUM_USERNAME_LENGTH or len(password) < MINIMUM_PASSWORD_LENGTH:
        return False
    
    user_record = database.get_user_by_username(username)
    hashed_password = hash_password(password)
    
    if user_record and user_record['password_hash'] == hashed_password:
        return True
    
    return False
```

### Example 2: E-commerce Cart

#### Poor Naming
```javascript
class C {
    constructor() {
        this.i = [];
        this.t = 0;
    }
    
    a(item) {
        this.i.push(item);
        this.calc();
    }
    
    calc() {
        this.t = this.i.reduce((s, i) => s + i.p, 0);
    }
}
```

#### Good Naming
```javascript
class ShoppingCart {
    constructor() {
        this.items = [];
        this.totalPrice = 0;
    }
    
    addItem(item) {
        this.items.push(item);
        this.calculateTotal();
    }
    
    calculateTotal() {
        this.totalPrice = this.items.reduce(
            (sum, item) => sum + item.price, 
            0
        );
    }
    
    getTotalPrice() {
        return this.totalPrice;
    }
    
    getItemCount() {
        return this.items.length;
    }
}
```

### Example 3: API Request Handler

#### Poor Naming
```typescript
async function f(x: string) {
    const r = await fetch(x);
    const d = await r.json();
    if (d.s === 200) {
        return d.d;
    }
    throw new Error(d.m);
}
```

#### Good Naming
```typescript
async function fetchUserData(apiEndpoint: string): Promise<UserData> {
    const response = await fetch(apiEndpoint);
    const responseData = await response.json();
    
    const HTTP_OK = 200;
    
    if (responseData.statusCode === HTTP_OK) {
        return responseData.userData;
    }
    
    throw new Error(responseData.errorMessage);
}
```

### Example 4: Data Processing

#### Poor Naming
```python
def p(l):
    r = []
    for x in l:
        if x > 0:
            r.append(x * 2)
    return r
```

#### Good Naming
```python
def double_positive_numbers(number_list):
    doubled_numbers = []
    
    for number in number_list:
        if number > 0:
            doubled_number = number * 2
            doubled_numbers.append(doubled_number)
    
    return doubled_numbers

# Or even better with list comprehension
def double_positive_numbers(number_list):
    return [number * 2 for number in number_list if number > 0]
```

## Best Practices Summary

1. **Clarity over brevity** - Prioritize readability over shorter names
2. **Consistency** - Follow language conventions and project standards
3. **Context awareness** - Consider scope and domain when naming
4. **Avoid noise words** - Words like `data`, `info`, `manager` often add no value
5. **Use domain language** - Use terminology familiar to the problem domain
6. **Refactor names** - Don't be afraid to rename as understanding improves
7. **Searchability** - Use unique, searchable names for important concepts
8. **No encoding** - Modern IDEs eliminate the need for type prefixes
9. **Pronounceable** - Names should be easy to say in conversation
10. **One concept per name** - Don't use the same name for different purposes

## Conclusion

Good naming is one of the most important aspects of writing maintainable code. Descriptive variable and function names serve as inline documentation, making code self-explanatory and reducing the cognitive load on developers. While it takes practice to consistently choose good names, following these guidelines will significantly improve code quality and team productivity.

Remember: **Code is read far more often than it is written.** Invest time in choosing clear, descriptive names that will help future developers (including your future self) understand the code quickly and correctly.
