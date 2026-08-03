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

export const cppSnippets: CppSnippet[] = [
  {
    id: 'arrays',
    title: 'Arrays',
    category: 'Arrays',
    difficulty: 'Medium',
    description: 'Finds the contiguous subarray with the largest sum in an array of integers using Kadane\'s Algorithm.',
    complexity: {
      time: 'O(N)',
      space: 'O(1)'
    },
    code: `#include <vector>
#include <algorithm>

int maxSubArray(std::vector<int>& nums) {
    int maxSoFar = nums[0];
    int currMax = nums[0];
    for (size_t i = 1; i < nums.size(); i++) {
        currMax = std::max(nums[i], currMax + nums[i]);
        maxSoFar = std::max(maxSoFar, currMax);
    }
    return maxSoFar;
}`
  },
  {
    id: 'strings',
    title: 'Strings',
    category: 'Strings',
    difficulty: 'Easy',
    description: 'Checks if a string is a palindrome after processing alphanumeric characters.',
    complexity: {
      time: 'O(N)',
      space: 'O(1)'
    },
    code: `#include <string>
#include <cctype>

bool isPalindrome(std::string s) {
    int left = 0, right = s.length() - 1;
    while (left < right) {
        while (left < right && !isalnum(s[left])) left++;
        while (left < right && !isalnum(s[right])) right--;
        if (tolower(s[left]) != tolower(s[right]))
            return false;
        left++;
        right--;
    }
    return true;
}`
  },
  {
    id: 'recursion',
    title: 'Recursion',
    category: 'Recursion',
    difficulty: 'Medium',
    description: 'Classic recursive solution to move N disks between source and target pegs (Tower of Hanoi).',
    complexity: {
      time: 'O(2^N)',
      space: 'O(N)'
    },
    code: `#include <iostream>

void towerOfHanoi(int n, char fromPeg, char toPeg, char auxPeg) {
    if (n == 0) return;
    towerOfHanoi(n - 1, fromPeg, auxPeg, toPeg);
    std::cout << "Move disk " << n << " from " << fromPeg << " to " << toPeg << "\\n";
    towerOfHanoi(n - 1, auxPeg, toPeg, fromPeg);
}`
  },
  {
    id: 'sorting',
    title: 'Sorting',
    category: 'Sorting',
    difficulty: 'Medium',
    description: 'In-place divide-and-conquer QuickSort algorithm using Lomuto partition.',
    complexity: {
      time: 'O(N log N)',
      space: 'O(log N)'
    },
    code: `#include <vector>
#include <algorithm>

int partition(std::vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = (low - 1);
    for (int j = low; j <= high - 1; j++) {
        if (arr[j] < pivot) {
            i++;
            std::swap(arr[i], arr[j]);
        }
    }
    std::swap(arr[i + 1], arr[high]);
    return (i + 1);
}

void quickSort(std::vector<int>& arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`
  },
  {
    id: 'searching',
    title: 'Searching (Linear & Binary Search)',
    category: 'Searching',
    difficulty: 'Easy',
    description: 'Efficient search algorithm on sorted arrays by halving search space.',
    complexity: {
      time: 'O(log N)',
      space: 'O(1)'
    },
    code: `#include <vector>

int binarySearch(const std::vector<int>& arr, int target) {
    int l = 0, r = arr.size() - 1;
    while (l <= r) {
        int m = l + (r - l) / 2;
        if (arr[m] == target) return m;
        if (arr[m] < target) l = m + 1;
        else r = m - 1;
    }
    return -1;
}`
  },
  {
    id: 'linked-list',
    title: 'Linked List',
    category: 'Linked List',
    difficulty: 'Easy',
    description: 'Reverses pointer directions of nodes in-place in a singly linked list.',
    complexity: {
      time: 'O(N)',
      space: 'O(1)'
    },
    code: `struct Node {
    int val;
    Node* next;
};

Node* reverseList(Node* head) {
    Node* prev = nullptr;
    Node* curr = head;
    while (curr != nullptr) {
        Node* nextTemp = curr->next;
        curr->next = prev;
        prev = curr;
        curr = nextTemp;
    }
    return prev;
}`
  },
  {
    id: 'stack',
    title: 'Stack',
    category: 'Stack',
    difficulty: 'Easy',
    description: 'Validates matching bracket sequences using std::stack LIFO structure.',
    complexity: {
      time: 'O(N)',
      space: 'O(N)'
    },
    code: `#include <stack>
#include <string>

bool isValidParentheses(std::string s) {
    std::stack<char> st;
    for (char c : s) {
        if (c == '(' || c == '{' || c == '[') st.push(c);
        else {
            if (st.empty()) return false;
            char top = st.top();
            st.pop();
            if ((c == ')' && top != '(') || (c == '}' && top != '{') || (c == ']' && top != '['))
                return false;
        }
    }
    return st.empty();
}`
  },
  {
    id: 'queue',
    title: 'Queue',
    category: 'Queue',
    difficulty: 'Medium',
    description: 'Processes elements level-by-level using std::queue FIFO semantics.',
    complexity: {
      time: 'O(N)',
      space: 'O(W)'
    },
    code: `#include <queue>
#include <iostream>

void levelOrder(Node* root) {
    if (root == nullptr) return;
    std::queue<Node*> q;
    q.push(root);
    while (!q.empty()) {
        Node* curr = q.front();
        q.pop();
        std::cout << curr->val << " ";
        if (curr->left) q.push(curr->left);
        if (curr->right) q.push(curr->right);
    }
}`
  },
  {
    id: 'deque',
    title: 'Deque',
    category: 'Deque',
    difficulty: 'Hard',
    description: 'Monotonic double-ended queue tracking maximums in sub-array windows.',
    complexity: {
      time: 'O(N)',
      space: 'O(K)'
    },
    code: `#include <vector>
#include <deque>

std::vector<int> maxSlidingWindow(std::vector<int>& nums, int k) {
    std::deque<int> dq;
    std::vector<int> result;
    for (size_t i = 0; i < nums.size(); i++) {
        if (!dq.empty() && dq.front() == (int)i - k) dq.pop_front();
        while (!dq.empty() && nums[dq.back()] <= nums[i]) dq.pop_back();
        dq.push_back(i);
        if ((int)i >= k - 1) result.push_back(nums[dq.front()]);
    }
    return result;
}`
  },
  {
    id: 'hashing',
    title: 'Hashing',
    category: 'Hashing',
    difficulty: 'Easy',
    description: 'Uses std::unordered_map for O(1) hash lookups to locate target sum pair indices.',
    complexity: {
      time: 'O(N)',
      space: 'O(N)'
    },
    code: `#include <vector>
#include <unordered_map>

std::vector<int> twoSum(std::vector<int>& nums, int target) {
    std::unordered_map<int, int> mp;
    for (int i = 0; i < (int)nums.size(); i++) {
        int comp = target - nums[i];
        if (mp.count(comp)) {
            return {mp[comp], i};
        }
        mp[nums[i]] = i;
    }
    return {};
}`
  },
  {
    id: 'two-pointers',
    title: 'Two Pointers',
    category: 'Two Pointers',
    difficulty: 'Medium',
    description: 'Shrinks left and right boundary pointers based on height constraints.',
    complexity: {
      time: 'O(N)',
      space: 'O(1)'
    },
    code: `#include <vector>
#include <algorithm>

int maxArea(std::vector<int>& height) {
    int maxWater = 0;
    int left = 0, right = height.size() - 1;
    while (left < right) {
        int w = right - left;
        int h = std::min(height[left], height[right]);
        maxWater = std::max(maxWater, w * h);
        if (height[left] < height[right]) left++;
        else right--;
    }
    return maxWater;
}`
  },
  {
    id: 'sliding-window',
    title: 'Sliding Window',
    category: 'Sliding Window',
    difficulty: 'Easy',
    description: 'Maintains a running sum across sliding window boundaries of fixed size K.',
    complexity: {
      time: 'O(N)',
      space: 'O(1)'
    },
    code: `#include <vector>
#include <algorithm>

int maxSubarraySumK(std::vector<int>& arr, int k) {
    int windowSum = 0;
    for (int i = 0; i < k; i++) windowSum += arr[i];
    int maxSum = windowSum;
    for (size_t i = k; i < arr.size(); i++) {
        windowSum += arr[i] - arr[i - k];
        maxSum = std::max(maxSum, windowSum);
    }
    return maxSum;
}`
  },
  {
    id: 'prefix-sum',
    title: 'Prefix Sum',
    category: 'Prefix Sum',
    difficulty: 'Easy',
    description: 'Precomputes cumulative sum arrays for instant O(1) range query evaluations.',
    complexity: {
      time: 'O(1) query',
      space: 'O(N)'
    },
    code: `#include <vector>

class NumArray {
    std::vector<int> prefix;
public:
    NumArray(std::vector<int>& nums) {
        prefix.resize(nums.size() + 1, 0);
        for (size_t i = 0; i < nums.size(); i++) {
            prefix[i + 1] = prefix[i] + nums[i];
        }
    }
    int sumRange(int left, int right) {
        return prefix[right + 1] - prefix[left];
    }
};`
  },
  {
    id: 'bit-manipulation',
    title: 'Bit Manipulation',
    category: 'Bit Manipulation',
    difficulty: 'Easy',
    description: 'Uses XOR property (x ^ x = 0) and bitwise operations to detect unique numbers.',
    complexity: {
      time: 'O(N)',
      space: 'O(1)'
    },
    code: `#include <vector>

int singleNumber(std::vector<int>& nums) {
    int uniqueVal = 0;
    for (int num : nums) {
        uniqueVal ^= num;
    }
    return uniqueVal;
}

int countSetBits(int n) {
    int count = 0;
    while (n > 0) {
        n &= (n - 1);
        count++;
    }
    return count;
}`
  },
  {
    id: 'binary-tree',
    title: 'Binary Tree',
    category: 'Binary Tree',
    difficulty: 'Easy',
    description: 'Recursive Left-Root-Right traversal implementation for Binary Trees.',
    complexity: {
      time: 'O(N)',
      space: 'O(H)'
    },
    code: `#include <iostream>

void inorder(TreeNode* root) {
    if (root == nullptr)
        return;
    inorder(root->left);
    std::cout << root->val << " ";
    inorder(root->right);
}`
  },
  {
    id: 'bst',
    title: 'Binary Search Tree (BST)',
    category: 'Binary Search Tree (BST)',
    difficulty: 'Medium',
    description: 'Maintains ordered node invariant where left < root < right.',
    complexity: {
      time: 'O(log N)',
      space: 'O(H)'
    },
    code: `TreeNode* insertBST(TreeNode* root, int val) {
    if (!root) return new TreeNode(val);
    if (val < root->val) root->left = insertBST(root->left, val);
    else if (val > root->val) root->right = insertBST(root->right, val);
    return root;
}

TreeNode* searchBST(TreeNode* root, int val) {
    if (!root || root->val == val) return root;
    if (val < root->val) return searchBST(root->left, val);
    return searchBST(root->right, val);
}`
  },
  {
    id: 'heap',
    title: 'Heap (Priority Queue)',
    category: 'Heap (Priority Queue)',
    difficulty: 'Medium',
    description: 'Employs std::priority_queue min-heap for instant top K element tracking.',
    complexity: {
      time: 'O(N log K)',
      space: 'O(K)'
    },
    code: `#include <vector>
#include <queue>

int findKthLargest(std::vector<int>& nums, int k) {
    std::priority_queue<int, std::vector<int>, std::greater<int>> minHeap;
    for (int num : nums) {
        minHeap.push(num);
        if ((int)minHeap.size() > k) {
            minHeap.pop();
        }
    }
    return minHeap.top();
}`
  },
  {
    id: 'trie',
    title: 'Trie',
    category: 'Trie',
    difficulty: 'Medium',
    description: 'Tree structure optimized for string insertion, search, and prefix matching.',
    complexity: {
      time: 'O(L)',
      space: 'O(N * L)'
    },
    code: `#include <string>
#include <unordered_map>

class Trie {
    struct TrieNode {
        std::unordered_map<char, TrieNode*> children;
        bool isEndOfWord = false;
    };
    TrieNode* root;
public:
    Trie() { root = new TrieNode(); }
    void insert(std::string word) {
        TrieNode* curr = root;
        for (char ch : word) {
            if (!curr->children.count(ch)) curr->children[ch] = new TrieNode();
            curr = curr->children[ch];
        }
        curr->isEndOfWord = true;
    }
    bool search(std::string word) {
        TrieNode* curr = root;
        for (char ch : word) {
            if (!curr->children.count(ch)) return false;
            curr = curr->children[ch];
        }
        return curr->isEndOfWord;
    }
};`
  },
  {
    id: 'graphs',
    title: 'Graphs',
    category: 'Graphs',
    difficulty: 'Hard',
    description: 'Calculates shortest distance from source on non-negative weighted graphs.',
    complexity: {
      time: 'O((V + E) log V)',
      space: 'O(V + E)'
    },
    code: `#include <vector>
#include <queue>
#include <climits>

std::vector<int> dijkstra(int V, std::vector<std::vector<std::pair<int, int>>>& adj, int src) {
    std::vector<int> dist(V, INT_MAX);
    std::priority_queue<std::pair<int, int>, std::vector<std::pair<int, int>>, std::greater<std::pair<int, int>>> pq;
    dist[src] = 0;
    pq.push({0, src});
    while (!pq.empty()) {
        auto [d, u] = pq.top();
        pq.pop();
        if (d > dist[u]) continue;
        for (auto& edge : adj[u]) {
            int v = edge.first, weight = edge.second;
            if (dist[u] + weight < dist[v]) {
                dist[v] = dist[u] + weight;
                pq.push({dist[v], v});
            }
        }
    }
    return dist;
}`
  },
  {
    id: 'greedy',
    title: 'Greedy Algorithms',
    category: 'Greedy Algorithms',
    difficulty: 'Medium',
    description: 'Selects max non-overlapping activities by greedy finish time sorting.',
    complexity: {
      time: 'O(N log N)',
      space: 'O(1)'
    },
    code: `#include <vector>
#include <algorithm>

struct Activity { int start, finish; };

int maxActivities(std::vector<Activity>& activities) {
    std::sort(activities.begin(), activities.end(), [](const Activity& a, const Activity& b) {
        return a.finish < b.finish;
    });
    int count = 0, lastFinish = -1;
    for (const auto& act : activities) {
        if (act.start >= lastFinish) {
            count++;
            lastFinish = act.finish;
        }
    }
    return count;
}`
  },
  {
    id: 'backtracking',
    title: 'Backtracking',
    category: 'Backtracking',
    difficulty: 'Medium',
    description: 'Explores decisions by systematically building and undoing solution state vectors.',
    complexity: {
      time: 'O(2^N)',
      space: 'O(N)'
    },
    code: `#include <vector>

void backtrack(int start, std::vector<int>& nums, std::vector<int>& curr, std::vector<std::vector<int>>& result) {
    result.push_back(curr);
    for (size_t i = start; i < nums.size(); i++) {
        curr.push_back(nums[i]);
        backtrack(i + 1, nums, curr, result);
        curr.pop_back();
    }
}

std::vector<std::vector<int>> subsets(std::vector<int>& nums) {
    std::vector<std::vector<int>> result;
    std::vector<int> curr;
    backtrack(0, nums, curr, result);
    return result;
}`
  },
  {
    id: 'dynamic-programming',
    title: 'Dynamic Programming (DP)',
    category: 'Dynamic Programming (DP)',
    difficulty: 'Hard',
    description: 'Solves the classic knapsack capacity problem using bottom-up DP matrix.',
    complexity: {
      time: 'O(N * W)',
      space: 'O(N * W)'
    },
    code: `#include <vector>
#include <algorithm>

int knapsack(int W, int wt[], int val[], int n) {
    std::vector<std::vector<int>> dp(n + 1, std::vector<int>(W + 1, 0));
    for (int i = 1; i <= n; i++) {
        for (int w = 1; w <= W; w++) {
            if (wt[i - 1] <= w) {
                dp[i][w] = std::max(val[i - 1] + dp[i - 1][w - wt[i - 1]], dp[i - 1][w]);
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }
    return dp[n][W];
}`
  },
  {
    id: 'segment-tree',
    title: 'Segment Tree',
    category: 'Segment Tree',
    difficulty: 'Hard',
    description: 'Tree structure supporting logarithmic point updates and range aggregation queries.',
    complexity: {
      time: 'O(log N)',
      space: 'O(4N)'
    },
    code: `#include <vector>

class SegmentTree {
    std::vector<int> tree;
    int n;
    void build(std::vector<int>& arr, int node, int start, int end) {
        if (start == end) { tree[node] = arr[start]; return; }
        int mid = (start + end) / 2;
        build(arr, 2 * node, start, mid);
        build(arr, 2 * node + 1, mid + 1, end);
        tree[node] = tree[2 * node] + tree[2 * node + 1];
    }
public:
    SegmentTree(std::vector<int>& arr) {
        n = arr.size();
        tree.resize(4 * n, 0);
        if (n > 0) build(arr, 1, 0, n - 1);
    }
    int query(int node, int start, int end, int l, int r) {
        if (r < start || end < l) return 0;
        if (l <= start && end <= r) return tree[node];
        int mid = (start + end) / 2;
        return query(2 * node, start, mid, l, r) + query(2 * node + 1, mid + 1, end, l, r);
    }
};`
  },
  {
    id: 'fenwick-tree',
    title: 'Fenwick Tree (Binary Indexed Tree)',
    category: 'Fenwick Tree (Binary Indexed Tree)',
    difficulty: 'Hard',
    description: 'Bitwise LSB indexed array structure for efficient prefix sum calculations.',
    complexity: {
      time: 'O(log N)',
      space: 'O(N)'
    },
    code: `#include <vector>

class FenwickTree {
    std::vector<int> bit;
    int n;
public:
    FenwickTree(int n) : n(n), bit(n + 1, 0) {}
    void add(int idx, int val) {
        for (; idx <= n; idx += idx & -idx) {
            bit[idx] += val;
        }
    }
    int query(int idx) {
        int sum = 0;
        for (; idx > 0; idx -= idx & -idx) {
            sum += bit[idx];
        }
        return sum;
    }
};`
  },
  {
    id: 'dsu',
    title: 'Disjoint Set Union (DSU)',
    category: 'Disjoint Set Union (DSU)',
    difficulty: 'Medium',
    description: 'Manages dynamic set partitioning with near O(1) amortized inverse Ackermann time.',
    complexity: {
      time: 'O(α(N))',
      space: 'O(N)'
    },
    code: `#include <vector>

class DSU {
    std::vector<int> parent, rank;
public:
    DSU(int n) : parent(n), rank(n, 0) {
        for (int i = 0; i < n; i++) parent[i] = i;
    }
    int find(int i) {
        if (parent[i] == i) return i;
        return parent[i] = find(parent[i]);
    }
    bool unite(int i, int j) {
        int rootI = find(i), rootJ = find(j);
        if (rootI != rootJ) {
            if (rank[rootI] < rank[rootJ]) std::swap(rootI, rootJ);
            parent[rootJ] = rootI;
            if (rank[rootI] == rank[rootJ]) rank[rootI]++;
            return true;
        }
        return false;
    }
};`
  }
];
