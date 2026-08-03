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
    id: 'binary-search',
    title: 'Binary Search',
    category: 'Arrays',
    difficulty: 'Easy',
    description: 'Efficient search algorithm on sorted arrays by halving search space.',
    complexity: {
      time: 'O(log N)',
      space: 'O(1)'
    },
    code: `int binarySearch(int arr[], int l, int r, int x) {
    while (l <= r) {
        int m = l + (r - l) / 2;
        if (arr[m] == x)
            return m;
        if (arr[m] < x)
            l = m + 1;
        else
            r = m - 1;
    }
    return -1;
}`
  },
  {
    id: 'reverse-list',
    title: 'Reverse Linked List',
    category: 'Linked Lists',
    difficulty: 'Easy',
    description: 'Reverses pointer directions of nodes in-place in a singly linked list.',
    complexity: {
      time: 'O(N)',
      space: 'O(1)'
    },
    code: `Node* reverseList(Node* head) {
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
    id: 'stack-operations',
    title: 'Stack STL Operations',
    category: 'Stacks',
    difficulty: 'Easy',
    description: 'LIFO (Last In First Out) structure demonstration with push, pop, and top.',
    complexity: {
      time: 'O(1)',
      space: 'O(N)'
    },
    code: `void processStack() {
    std::stack<int> s;
    s.push(10);
    s.push(20);
    s.push(30);
    while (!s.empty()) {
        int topElement = s.top();
        s.pop();
        std::cout << topElement << " ";
    }
}`
  },
  {
    id: 'queue-operations',
    title: 'Queue STL Operations',
    category: 'Queues',
    difficulty: 'Easy',
    description: 'FIFO (First In First Out) structure demonstration with push, pop, and front.',
    complexity: {
      time: 'O(1)',
      space: 'O(N)'
    },
    code: `void processQueue() {
    std::queue<string> q;
    q.push("first");
    q.push("second");
    q.push("third");
    while (!q.empty()) {
        string frontElement = q.front();
        q.pop();
        std::cout << frontElement << "\\n";
    }
}`
  },
  {
    id: 'dfs-graph',
    title: 'Depth First Search (DFS)',
    category: 'Graphs',
    difficulty: 'Medium',
    description: 'Traverses tree/graph structures along each branch before backtracking.',
    complexity: {
      time: 'O(V + E)',
      space: 'O(V)'
    },
    code: `void DFS(int v, vector<bool>& visited, vector<vector<int>>& adj) {
    visited[v] = true;
    for (int u : adj[v]) {
        if (!visited[u]) {
            DFS(u, visited, adj);
        }
    }
}`
  },
  {
    id: 'bfs-graph',
    title: 'Breadth First Search (BFS)',
    category: 'Graphs',
    difficulty: 'Medium',
    description: 'Traverses tree/graph structures level by level using a queue queue.',
    complexity: {
      time: 'O(V + E)',
      space: 'O(V)'
    },
    code: `void BFS(int start, vector<vector<int>>& adj, int V) {
    vector<bool> visited(V, false);
    queue<int> q;
    visited[start] = true;
    q.push(start);
    while (!q.empty()) {
        int curr = q.front();
        q.pop();
        for (int neighbor : adj[curr]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                q.push(neighbor);
            }
        }
    }
}`
  },
  {
    id: 'inorder-traversal',
    title: 'Binary Tree Inorder',
    category: 'Trees',
    difficulty: 'Easy',
    description: 'Left-Root-Right recursive traversal of binary tree nodes.',
    complexity: {
      time: 'O(N)',
      space: 'O(H) recursion'
    },
    code: `void inorder(TreeNode* root) {
    if (root == nullptr)
        return;
    inorder(root->left);
    std::cout << root->val << " ";
    inorder(root->right);
}`
  },
  {
    id: 'lomuto-partition',
    title: 'Lomuto Partition',
    category: 'Sorting',
    difficulty: 'Medium',
    description: 'Pivots elements around standard array boundaries for Quicksort.',
    complexity: {
      time: 'O(N)',
      space: 'O(1)'
    },
    code: `int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = (low - 1);
    for (int j = low; j <= high - 1; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return (i + 1);
}`
  },
  {
    id: 'recursive-fibonacci',
    title: 'Recursive Fibonacci',
    category: 'Recursion',
    difficulty: 'Easy',
    description: 'Calculates the Nth Fibonacci number recursively.',
    complexity: {
      time: 'O(2^N)',
      space: 'O(N) stack'
    },
    code: `int fibonacci(int n) {
    if (n <= 1)
        return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}`
  },
  {
    id: 'knapsack-dp',
    title: '0/1 Knapsack (DP Tabulation)',
    category: 'Dynamic Programming',
    difficulty: 'Hard',
    description: 'Solves the classic knapsack weight capacity problem using tabulation.',
    complexity: {
      time: 'O(N * W)',
      space: 'O(N * W)'
    },
    code: `int knapsack(int W, int wt[], int val[], int n) {
    vector<vector<int>> dp(n + 1, vector<int>(W + 1, 0));
    for (int i = 1; i <= n; i++) {
        for (int w = 1; w <= W; w++) {
            if (wt[i - 1] <= w) {
                dp[i][w] = max(val[i - 1] + dp[i - 1][w - wt[i - 1]], dp[i - 1][w]);
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }
    return dp[n][W];
}`
  }
];
