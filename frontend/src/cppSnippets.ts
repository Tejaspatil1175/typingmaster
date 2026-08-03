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
    category: 'Algorithms',
    difficulty: 'Easy',
    description: 'Finds the position of a target value within a sorted array by repeatedly dividing the search interval in half.',
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
    category: 'Data Structures',
    difficulty: 'Easy',
    description: 'Reverses a singly-linked list in-place by altering node pointer directions.',
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
    id: 'dfs-graph',
    title: 'Depth First Search (DFS)',
    category: 'Graphs',
    difficulty: 'Medium',
    description: 'Traverses or searches graph data structures along each branch before backtracking.',
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
    id: 'quick-sort-partition',
    title: 'Lomuto Partition (QuickSort)',
    category: 'Sorting',
    difficulty: 'Medium',
    description: 'Pivots elements around a selected element such that all smaller elements go left and larger go right.',
    complexity: {
      time: 'O(N)',
      space: 'O(1) auxiliary'
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
  }
];
