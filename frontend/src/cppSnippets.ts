import { arrayQuestions } from './arrayQuestions';

export interface CppSnippet {
  id: string;
  title: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  complexity: {
    time: string;
    space: string;
  };
  code: string;
}

const baseSnippets: CppSnippet[] = [
  {
    id: 'arrays',
    title: 'Arrays',
    category: 'Arrays',
    difficulty: 'Easy',
    description: '10 essential Array interview questions with explanations and full runnable code.',
    complexity: {
      time: 'O(N)',
      space: 'O(1)'
    },
    code: `#include <iostream>
using namespace std;

int main() {
    int arr[] = {1, 2, 3, 4, 5};
    int n = 5;

    int start = 0;
    int end = n - 1;

    while (start < end) {
        swap(arr[start], arr[end]);
        start++;
        end--;
    }

    cout << "Reversed Array: ";
    for (int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }

    return 0;
}`
  },
  {
    id: 'strings',
    title: 'Strings',
    category: 'Strings',
    difficulty: 'Easy',
    description: 'Reverses a std::string in-place using character swapping.',
    complexity: {
      time: 'O(N)',
      space: 'O(1)'
    },
    code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string str = "hello";
    int n = str.length();

    for (int i = 0; i < n / 2; i++) {
        swap(str[i], str[n - i - 1]);
    }

    cout << "Reversed String: " << str << endl;
    return 0;
}`
  },
  {
    id: 'recursion',
    title: 'Recursion',
    category: 'Recursion',
    difficulty: 'Easy',
    description: 'Calculates the factorial of a number using a recursive base condition.',
    complexity: {
      time: 'O(N)',
      space: 'O(N)'
    },
    code: `#include <iostream>
using namespace std;

int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

int main() {
    int num = 5;
    cout << "Factorial of " << num << " is: " << factorial(num) << endl;
    return 0;
}`
  },
  {
    id: 'sorting',
    title: 'Sorting',
    category: 'Sorting',
    difficulty: 'Easy',
    description: 'Sorts an array of integers using the Bubble Sort algorithm.',
    complexity: {
      time: 'O(N^2)',
      space: 'O(1)'
    },
    code: `#include <iostream>
using namespace std;

int main() {
    int arr[] = {64, 34, 25, 12, 22};
    int n = 5;

    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
            }
        }
    }

    cout << "Sorted Array: ";
    for (int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    return 0;
}`
  },
  {
    id: 'searching',
    title: 'Searching (Linear & Binary Search)',
    category: 'Searching',
    difficulty: 'Easy',
    description: 'Performs binary search on a sorted integer array.',
    complexity: {
      time: 'O(log N)',
      space: 'O(1)'
    },
    code: `#include <iostream>
using namespace std;

int main() {
    int arr[] = {10, 20, 30, 40, 50};
    int n = 5, target = 30;

    int low = 0, high = n - 1, found = -1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) {
            found = mid;
            break;
        }
        if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }

    cout << "Target found at index: " << found << endl;
    return 0;
}`
  },
  {
    id: 'linked-list',
    title: 'Linked List',
    category: 'Linked List',
    difficulty: 'Easy',
    description: 'Creates a singly linked list and reverses its pointer direction.',
    complexity: {
      time: 'O(N)',
      space: 'O(1)'
    },
    code: `#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
    Node(int val) : data(val), next(nullptr) {}
};

int main() {
    Node* head = new Node(1);
    head->next = new Node(2);
    head->next->next = new Node(3);

    Node* prev = nullptr;
    Node* curr = head;
    while (curr != nullptr) {
        Node* nextNode = curr->next;
        curr->next = prev;
        prev = curr;
        curr = nextNode;
    }

    cout << "Reversed List: ";
    for (Node* temp = prev; temp != nullptr; temp = temp->next) {
        cout << temp->data << " ";
    }
    return 0;
}`
  },
  {
    id: 'stack',
    title: 'Stack',
    category: 'Stack',
    difficulty: 'Easy',
    description: 'Demonstrates push, top, and pop operations with std::stack.',
    complexity: {
      time: 'O(1)',
      space: 'O(N)'
    },
    code: `#include <iostream>
#include <stack>
using namespace std;

int main() {
    stack<int> st;
    st.push(10);
    st.push(20);
    st.push(30);

    cout << "Stack elements: ";
    while (!st.empty()) {
        cout << st.top() << " ";
        st.pop();
    }
    return 0;
}`
  },
  {
    id: 'queue',
    title: 'Queue',
    category: 'Queue',
    difficulty: 'Easy',
    description: 'Demonstrates push, front, and pop FIFO operations with std::queue.',
    complexity: {
      time: 'O(1)',
      space: 'O(N)'
    },
    code: `#include <iostream>
#include <queue>
using namespace std;

int main() {
    queue<int> q;
    q.push(100);
    q.push(200);
    q.push(300);

    cout << "Queue elements: ";
    while (!q.empty()) {
        cout << q.front() << " ";
        q.pop();
    }
    return 0;
}`
  },
  {
    id: 'deque',
    title: 'Deque',
    category: 'Deque',
    difficulty: 'Easy',
    description: 'Demonstrates double-ended queue insertion and iteration with std::deque.',
    complexity: {
      time: 'O(1)',
      space: 'O(N)'
    },
    code: `#include <iostream>
#include <deque>
using namespace std;

int main() {
    deque<int> dq;
    dq.push_back(10);
    dq.push_front(5);
    dq.push_back(15);

    cout << "Deque elements: ";
    for (int x : dq) {
        cout << x << " ";
    }
    return 0;
}`
  },
  {
    id: 'hashing',
    title: 'Hashing',
    category: 'Hashing',
    difficulty: 'Easy',
    description: 'Uses std::unordered_map for key-value pair insertions and lookups.',
    complexity: {
      time: 'O(1) avg',
      space: 'O(N)'
    },
    code: `#include <iostream>
#include <unordered_map>
using namespace std;

int main() {
    unordered_map<string, int> freq;
    freq["apple"] = 3;
    freq["banana"] = 5;

    cout << "Apple count: " << freq["apple"] << endl;
    return 0;
}`
  },
  {
    id: 'two-pointers',
    title: 'Two Pointers',
    category: 'Two Pointers',
    difficulty: 'Easy',
    description: 'Finds a target sum pair in a sorted array using left and right pointers.',
    complexity: {
      time: 'O(N)',
      space: 'O(1)'
    },
    code: `#include <iostream>
using namespace std;

int main() {
    int arr[] = {1, 2, 3, 4, 6};
    int n = 5, target = 6;

    int left = 0, right = n - 1;
    while (left < right) {
        int sum = arr[left] + arr[right];
        if (sum == target) {
            cout << "Pair found: " << arr[left] << " + " << arr[right] << endl;
            break;
        }
        if (sum < target) left++;
        else right--;
    }
    return 0;
}`
  },
  {
    id: 'sliding-window',
    title: 'Sliding Window',
    category: 'Sliding Window',
    difficulty: 'Medium',
    description: 'Calculates the maximum sum subarray of fixed window size K.',
    complexity: {
      time: 'O(N)',
      space: 'O(1)'
    },
    code: `#include <iostream>
using namespace std;

int main() {
    int arr[] = {2, 1, 5, 1, 3, 2};
    int n = 6, k = 3;

    int windowSum = 0;
    for (int i = 0; i < k; i++) windowSum += arr[i];

    int maxSum = windowSum;
    for (int i = k; i < n; i++) {
        windowSum += arr[i] - arr[i - k];
        maxSum = max(maxSum, windowSum);
    }

    cout << "Max sum of subarray size " << k << ": " << maxSum << endl;
    return 0;
}`
  },
  {
    id: 'prefix-sum',
    title: 'Prefix Sum',
    category: 'Prefix Sum',
    difficulty: 'Easy',
    description: 'Computes cumulative sum array for O(1) range queries.',
    complexity: {
      time: 'O(N)',
      space: 'O(N)'
    },
    code: `#include <iostream>
using namespace std;

int main() {
    int arr[] = {10, 20, 30, 40, 50};
    int n = 5;

    int prefix[5];
    prefix[0] = arr[0];
    for (int i = 1; i < n; i++) {
        prefix[i] = prefix[i - 1] + arr[i];
    }

    cout << "Prefix Sum Array: ";
    for (int i = 0; i < n; i++) {
        cout << prefix[i] << " ";
    }
    return 0;
}`
  },
  {
    id: 'bit-manipulation',
    title: 'Bit Manipulation',
    category: 'Bit Manipulation',
    difficulty: 'Easy',
    description: 'Finds the single non-repeating element using bitwise XOR.',
    complexity: {
      time: 'O(N)',
      space: 'O(1)'
    },
    code: `#include <iostream>
using namespace std;

int main() {
    int nums[] = {4, 1, 2, 1, 2};
    int n = 5;

    int uniqueVal = 0;
    for (int i = 0; i < n; i++) {
        uniqueVal ^= nums[i];
    }

    cout << "Single Unique Number: " << uniqueVal << endl;
    return 0;
}`
  },
  {
    id: 'binary-tree',
    title: 'Binary Tree',
    category: 'Binary Tree',
    difficulty: 'Easy',
    description: 'Constructs a simple binary tree and performs Inorder Traversal.',
    complexity: {
      time: 'O(N)',
      space: 'O(H)'
    },
    code: `#include <iostream>
using namespace std;

struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

void inorder(TreeNode* root) {
    if (root == nullptr) return;
    inorder(root->left);
    cout << root->val << " ";
    inorder(root->right);
}

int main() {
    TreeNode* root = new TreeNode(1);
    root->left = new TreeNode(2);
    root->right = new TreeNode(3);

    cout << "Inorder Traversal: ";
    inorder(root);
    return 0;
}`
  },
  {
    id: 'bst',
    title: 'Binary Search Tree (BST)',
    category: 'Binary Search Tree (BST)',
    difficulty: 'Medium',
    description: 'Inserts nodes into a Binary Search Tree maintaining ordering invariant.',
    complexity: {
      time: 'O(log N)',
      space: 'O(H)'
    },
    code: `#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* left;
    Node* right;
    Node(int val) : data(val), left(nullptr), right(nullptr) {}
};

Node* insertBST(Node* root, int val) {
    if (root == nullptr) return new Node(val);
    if (val < root->data) root->left = insertBST(root->left, val);
    else root->right = insertBST(root->right, val);
    return root;
}

int main() {
    Node* root = nullptr;
    root = insertBST(root, 50);
    insertBST(root, 30);
    insertBST(root, 70);

    cout << "Root of BST: " << root->data << endl;
    return 0;
}`
  },
  {
    id: 'heap',
    title: 'Heap (Priority Queue)',
    category: 'Heap (Priority Queue)',
    difficulty: 'Easy',
    description: 'Demonstrates max-heap priority queue operations in C++ STL.',
    complexity: {
      time: 'O(log N)',
      space: 'O(N)'
    },
    code: `#include <iostream>
#include <queue>
using namespace std;

int main() {
    priority_queue<int> maxHeap;
    maxHeap.push(10);
    maxHeap.push(30);
    maxHeap.push(20);

    cout << "Top element of Heap: " << maxHeap.top() << endl;
    return 0;
}`
  },
  {
    id: 'trie',
    title: 'Trie',
    category: 'Trie',
    difficulty: 'Medium',
    description: 'Constructs a Trie node structure and inserts a word string.',
    complexity: {
      time: 'O(L)',
      space: 'O(N * L)'
    },
    code: `#include <iostream>
#include <unordered_map>
using namespace std;

struct TrieNode {
    unordered_map<char, TrieNode*> children;
    bool isEnd = false;
};

int main() {
    TrieNode* root = new TrieNode();
    string word = "cat";

    TrieNode* curr = root;
    for (char c : word) {
        if (!curr->children.count(c)) curr->children[c] = new TrieNode();
        curr = curr->children[c];
    }
    curr->isEnd = true;

    cout << "Inserted word: " << word << endl;
    return 0;
}`
  },
  {
    id: 'graphs',
    title: 'Graphs',
    category: 'Graphs',
    difficulty: 'Medium',
    description: 'Builds a basic adjacency list representation of a directed graph.',
    complexity: {
      time: 'O(V + E)',
      space: 'O(V + E)'
    },
    code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int V = 3;
    vector<int> adj[3];

    adj[0].push_back(1);
    adj[1].push_back(2);

    cout << "Graph Adjacency List: Node 0 connected to " << adj[0][0] << endl;
    return 0;
}`
  },
  {
    id: 'greedy',
    title: 'Greedy Algorithms',
    category: 'Greedy Algorithms',
    difficulty: 'Easy',
    description: 'Solves coin change problem greedily using sorted coin denominations.',
    complexity: {
      time: 'O(N)',
      space: 'O(1)'
    },
    code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> coins = {1, 2, 5, 10, 20, 50};
    int amount = 43;

    int count = 0;
    for (int i = coins.size() - 1; i >= 0; i--) {
        while (amount >= coins[i]) {
            amount -= coins[i];
            count++;
        }
    }

    cout << "Min coins needed: " << count << endl;
    return 0;
}`
  },
  {
    id: 'backtracking',
    title: 'Backtracking',
    category: 'Backtracking',
    difficulty: 'Medium',
    description: 'Generates all binary strings of length N using recursive backtracking.',
    complexity: {
      time: 'O(2^N)',
      space: 'O(N)'
    },
    code: `#include <iostream>
#include <string>
using namespace std;

void generate(int n, string curr) {
    if (curr.length() == n) {
        cout << curr << " ";
        return;
    }
    generate(n, curr + "0");
    generate(n, curr + "1");
}

int main() {
    cout << "Binary Strings of length 2: ";
    generate(2, "");
    return 0;
}`
  },
  {
    id: 'dynamic-programming',
    title: 'Dynamic Programming (DP)',
    category: 'Dynamic Programming (DP)',
    difficulty: 'Easy',
    description: 'Calculates the Nth Fibonacci number using a bottom-up DP table.',
    complexity: {
      time: 'O(N)',
      space: 'O(N)'
    },
    code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n = 6;
    vector<int> dp(n + 1, 0);
    dp[0] = 0;
    dp[1] = 1;

    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }

    cout << "6th Fibonacci Number: " << dp[n] << endl;
    return 0;
}`
  },
  {
    id: 'segment-tree',
    title: 'Segment Tree',
    category: 'Segment Tree',
    difficulty: 'Hard',
    description: 'Builds a Segment Tree for fast range sum queries.',
    complexity: {
      time: 'O(N)',
      space: 'O(4N)'
    },
    code: `#include <iostream>
using namespace std;

void build(int arr[], int tree[], int node, int start, int end) {
    if (start == end) { tree[node] = arr[start]; return; }
    int mid = (start + end) / 2;
    build(arr, tree, 2 * node, start, mid);
    build(arr, tree, 2 * node + 1, mid + 1, end);
    tree[node] = tree[2 * node] + tree[2 * node + 1];
}

int main() {
    int arr[] = {1, 2, 3, 4};
    int tree[16] = {0};
    build(arr, tree, 1, 0, 3);

    cout << "Segment Tree Root Sum: " << tree[1] << endl;
    return 0;
}`
  },
  {
    id: 'fenwick-tree',
    title: 'Fenwick Tree (Binary Indexed Tree)',
    category: 'Fenwick Tree (Binary Indexed Tree)',
    difficulty: 'Hard',
    description: 'Updates a Binary Indexed Tree (BIT) using LSB index shifts.',
    complexity: {
      time: 'O(log N)',
      space: 'O(N)'
    },
    code: `#include <iostream>
using namespace std;

void update(int bit[], int n, int idx, int val) {
    for (; idx <= n; idx += idx & -idx) {
        bit[idx] += val;
    }
}

int main() {
    int n = 5;
    int bit[6] = {0};
    update(bit, n, 1, 10);
    update(bit, n, 2, 20);

    cout << "BIT updated successfully!" << endl;
    return 0;
}`
  },
  {
    id: 'dsu',
    title: 'Disjoint Set Union (DSU)',
    category: 'Disjoint Set Union (DSU)',
    difficulty: 'Medium',
    description: 'Implements Disjoint Set Union with findParent path compression.',
    complexity: {
      time: 'O(α(N))',
      space: 'O(N)'
    },
    code: `#include <iostream>
using namespace std;

int findParent(int i, int parent[]) {
    if (parent[i] == i) return i;
    return parent[i] = findParent(parent[i], parent);
}

int main() {
    int parent[5];
    for (int i = 0; i < 5; i++) parent[i] = i;

    parent[1] = 0;
    cout << "Parent of node 1 is: " << findParent(1, parent) << endl;
    return 0;
}`
  }
];

// Convert arrayQuestions to CppSnippet format so TypingSimulator can load them seamlessly
const questionSnippets: CppSnippet[] = arrayQuestions.map((q) => ({
  id: q.id,
  title: q.title,
  category: 'Arrays',
  difficulty: q.difficulty,
  description: q.problemStatement,
  complexity: {
    time: q.timeComplexity,
    space: q.spaceComplexity
  },
  code: q.code
}));

export const cppSnippets: CppSnippet[] = [...baseSnippets, ...questionSnippets];
