export interface DSAQuestion {
  id: string;
  lcNumber: number;
  title: string;
  topic: 'arrays' | 'strings' | 'linked-list' | 'stack' | 'queue' | 'binary-tree' | 'bst';
  topicName: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  slug: string;
  timeComplexity: string;
  spaceComplexity: string;
  keyIntuition: string;
  cppTip: string;
  codeSnippet: string;
}

export interface TopicInfo {
  id: 'arrays' | 'strings' | 'linked-list' | 'stack' | 'queue' | 'binary-tree' | 'bst';
  name: string;
  icon: string;
  description: string;
  tips: string[];
}

export const TOPICS: TopicInfo[] = [
  {
    id: 'arrays',
    name: 'Arrays',
    icon: '📊',
    description: 'Fundamental contiguous storage, two pointers, prefix sums, and sliding window.',
    tips: [
      'Use std::vector<int> by default; reserve() if the final size is known to avoid reallocations.',
      'Two pointers (left & right) can eliminate nested loops for sorted arrays from O(N²) to O(N).',
      'Prefix sum arrays allow answering range sum queries in O(1) time.'
    ]
  },
  {
    id: 'strings',
    name: 'Strings',
    icon: '🔤',
    description: 'Character manipulation, palindrome verification, sliding window substrings, and hashing.',
    tips: [
      'Pass std::string by const reference (const string&) in functions to prevent unnecessary copies.',
      'For frequency counts of lowercase English characters, use an int freq[26] = {0} array instead of std::unordered_map for speed and zero memory overhead.',
      'std::string::substr takes O(L) time—prefer passing string_view or index pointers in recursive/helper methods.'
    ]
  },
  {
    id: 'linked-list',
    name: 'Linked List',
    icon: '🔗',
    description: 'Pointer management, cycle detection, reordering, and in-place node manipulation.',
    tips: [
      'Free or avoid leaking nodes. Prefer nullptr checks over sentinel values.',
      'Use a dummy head node (ListNode dummy(0); ListNode* tail = &dummy;) to eliminate edge cases for insertions and deletions at head.',
      'Use fast and slow pointers (Floyd’s Cycle Finding) to locate cycles or find the midpoint in a single pass.'
    ]
  },
  {
    id: 'stack',
    name: 'Stack',
    icon: '🥞',
    description: 'LIFO evaluation, parentheses validation, monotonic stack for next greater elements.',
    tips: [
      'Use std::stack for standard LIFO containers. std::deque is the default underlying container.',
      'Always check !st.empty() before calling st.top() or st.pop() to prevent undefined behavior / segfaults.',
      'Monotonic stacks maintain elements in strictly increasing or decreasing order to solve Next Greater / Previous Smaller in O(N).'
    ]
  },
  {
    id: 'queue',
    name: 'Queue',
    icon: '🚶',
    description: 'FIFO processing, BFS graph/matrix traversals, sliding window maximums, and circular buffers.',
    tips: [
      'Use std::queue and std::deque for containers. Use std::list only when you need O(1) splicing.',
      'BFS shortest path in unweighted graphs or grids is best implemented with std::queue<pair<int, int>>.',
      'Use std::deque for sliding window maximum problems to push and pop from both ends in O(1).'
    ]
  },
  {
    id: 'binary-tree',
    name: 'Binary Tree',
    icon: '🌳',
    description: 'Hierarchical node traversals, depth/height, path sums, LCA, and serialization.',
    tips: [
      'Write the recursive version first, then the iterative one with an explicit stack.',
      'Free or avoid leaking nodes in tree problems. Prefer nullptr checks over sentinel values.',
      'Level-order traversals use std::queue. Track level size with int sz = q.size() at the start of each level loop.'
    ]
  },
  {
    id: 'bst',
    name: 'Binary Search Tree (BST)',
    icon: '🔍',
    description: 'Ordered binary trees, in-order sorted traversal, BST validation, insertion, and deletion.',
    tips: [
      'An in-order traversal of a valid BST always yields strictly increasing elements.',
      'Use the BST invariant (val > left->val && val < right->val) to prune search paths in O(H) time instead of O(N).',
      'When deleting a node with two children, replace it with its in-order successor (minimum in right subtree).'
    ]
  }
];

export const dsaQuestions: DSAQuestion[] = [
  // ==================== 0. ARRAYS ====================
  {
    id: 'lc-1',
    lcNumber: 1,
    title: 'Two Sum',
    topic: 'arrays',
    topicName: 'Arrays',
    difficulty: 'Easy',
    slug: 'two-sum',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    keyIntuition: 'Use a hash map to store seen numbers and their indices. For each number x, check if (target - x) is already present in the map.',
    cppTip: 'Use std::unordered_map<int, int> for average O(1) lookups.',
    codeSnippet: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> seen;
        for (int i = 0; i < nums.size(); ++i) {
            int complement = target - nums[i];
            if (seen.find(complement) != seen.end()) {
                return {seen[complement], i};
            }
            seen[nums[i]] = i;
        }
        return {};
    }
};`
  },
  {
    id: 'lc-26',
    lcNumber: 26,
    title: 'Remove Duplicates from Sorted Array',
    topic: 'arrays',
    topicName: 'Arrays',
    difficulty: 'Easy',
    slug: 'remove-duplicates-from-sorted-array',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    keyIntuition: 'Since the array is sorted, keep a slow pointer writeIndex for unique values. Move fast pointer forward; when nums[fast] != nums[writeIndex-1], write it.',
    cppTip: 'In-place two pointer overwrite avoids extra vector allocations.',
    codeSnippet: `class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        if (nums.empty()) return 0;
        int write = 1;
        for (int i = 1; i < nums.size(); ++i) {
            if (nums[i] != nums[i - 1]) {
                nums[write++] = nums[i];
            }
        }
        return write;
    }
};`
  },
  {
    id: 'lc-27',
    lcNumber: 27,
    title: 'Remove Element',
    topic: 'arrays',
    topicName: 'Arrays',
    difficulty: 'Easy',
    slug: 'remove-element',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    keyIntuition: 'Iterate with a reader pointer. Whenever nums[i] != val, copy it to nums[k] and increment k.',
    cppTip: 'std::remove or a simple manual two-pointer loop handles this cleanly in O(N).',
    codeSnippet: `class Solution {
public:
    int removeElement(vector<int>& nums, int val) {
        int k = 0;
        for (int x : nums) {
            if (x != val) nums[k++] = x;
        }
        return k;
    }
};`
  },
  {
    id: 'lc-35',
    lcNumber: 35,
    title: 'Search Insert Position',
    topic: 'arrays',
    topicName: 'Arrays',
    difficulty: 'Easy',
    slug: 'search-insert-position',
    timeComplexity: 'O(log N)',
    spaceComplexity: 'O(1)',
    keyIntuition: 'Binary search for the target. If not found, the left pointer will end up exactly at the index where target should be inserted.',
    cppTip: 'Compute mid using low + (high - low) / 2 to prevent integer overflow.',
    codeSnippet: `class Solution {
public:
    int searchInsert(vector<int>& nums, int target) {
        int low = 0, high = nums.size() - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] == target) return mid;
            else if (nums[mid] < target) low = mid + 1;
            else high = mid - 1;
        }
        return low;
    }
};`
  },
  {
    id: 'lc-53',
    lcNumber: 53,
    title: 'Maximum Subarray (Kadane’s Algorithm)',
    topic: 'arrays',
    topicName: 'Arrays',
    difficulty: 'Medium',
    slug: 'maximum-subarray',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    keyIntuition: 'Kadane’s algorithm: maintain current running sum. If current sum becomes negative, reset it to 0 or start fresh with nums[i]. Track global max.',
    cppTip: 'Initialize maxSum = nums[0] to correctly handle arrays with all negative numbers.',
    codeSnippet: `class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        int maxSum = nums[0];
        int curr = 0;
        for (int x : nums) {
            curr = max(x, curr + x);
            maxSum = max(maxSum, curr);
        }
        return maxSum;
    }
};`
  },
  {
    id: 'lc-121',
    lcNumber: 121,
    title: 'Best Time to Buy and Sell Stock',
    topic: 'arrays',
    topicName: 'Arrays',
    difficulty: 'Easy',
    slug: 'best-time-to-buy-and-sell-stock',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    keyIntuition: 'Track the minimum price seen so far. At each day, calculate profit if sold today (price - minPrice) and update maxProfit.',
    cppTip: 'Initialize minPrice = INT_MAX and maxProfit = 0.',
    codeSnippet: `class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int minPrice = INT_MAX, maxProfit = 0;
        for (int p : prices) {
            minPrice = min(minPrice, p);
            maxProfit = max(maxProfit, p - minPrice);
        }
        return maxProfit;
    }
};`
  },
  {
    id: 'lc-189',
    lcNumber: 189,
    title: 'Rotate Array',
    topic: 'arrays',
    topicName: 'Arrays',
    difficulty: 'Medium',
    slug: 'rotate-array',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    keyIntuition: 'Normalize k = k % n. Reverse the entire array, reverse the first k elements, then reverse the remaining n - k elements.',
    cppTip: 'std::reverse(nums.begin(), nums.end()) is O(N) and works in-place.',
    codeSnippet: `class Solution {
public:
    void rotate(vector<int>& nums, int k) {
        int n = nums.size();
        k %= n;
        reverse(nums.begin(), nums.end());
        reverse(nums.begin(), nums.begin() + k);
        reverse(nums.begin() + k, nums.end());
    }
};`
  },
  {
    id: 'lc-217',
    lcNumber: 217,
    title: 'Contains Duplicate',
    topic: 'arrays',
    topicName: 'Arrays',
    difficulty: 'Easy',
    slug: 'contains-duplicate',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    keyIntuition: 'Insert elements into an unordered_set. If an element already exists in the set, a duplicate is found.',
    cppTip: 'std::unordered_set.insert(x).second returns false if the element was already present.',
    codeSnippet: `class Solution {
public:
    bool containsDuplicate(vector<int>& nums) {
        unordered_set<int> seen;
        for (int x : nums) {
            if (!seen.insert(x).second) return true;
        }
        return false;
    }
};`
  },
  {
    id: 'lc-283',
    lcNumber: 283,
    title: 'Move Zeroes',
    topic: 'arrays',
    topicName: 'Arrays',
    difficulty: 'Easy',
    slug: 'move-zeroes',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    keyIntuition: 'Keep a pointer lastNonZero. Whenever a non-zero element is found, swap it with nums[lastNonZero] and increment lastNonZero.',
    cppTip: 'std::swap does in-place swapping with zero heap allocation.',
    codeSnippet: `class Solution {
public:
    void moveZeroes(vector<int>& nums) {
        int lastNonZero = 0;
        for (int i = 0; i < nums.size(); ++i) {
            if (nums[i] != 0) {
                swap(nums[lastNonZero++], nums[i]);
            }
        }
    }
};`
  },
  {
    id: 'lc-238',
    lcNumber: 238,
    title: 'Product of Array Except Self',
    topic: 'arrays',
    topicName: 'Arrays',
    difficulty: 'Medium',
    slug: 'product-of-array-except-self',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    keyIntuition: 'Compute prefix products in a left-to-right pass, then multiply suffix products in a right-to-left pass directly inside the output vector.',
    cppTip: 'The output vector does not count as extra space complexity per problem constraints.',
    codeSnippet: `class Solution {
public:
    vector<int> productExceptSelf(vector<int>& nums) {
        int n = nums.size();
        vector<int> res(n, 1);
        for (int i = 1; i < n; ++i) {
            res[i] = res[i - 1] * nums[i - 1];
        }
        int right = 1;
        for (int i = n - 1; i >= 0; --i) {
            res[i] *= right;
            right *= nums[i];
        }
        return res;
    }
};`
  },
  {
    id: 'lc-15',
    lcNumber: 15,
    title: '3Sum',
    topic: 'arrays',
    topicName: 'Arrays',
    difficulty: 'Medium',
    slug: '3sum',
    timeComplexity: 'O(N²)',
    spaceComplexity: 'O(1)',
    keyIntuition: 'Sort array. Fix one element nums[i], then use two pointers (left and right) to find pairs summing to -nums[i]. Skip duplicates.',
    cppTip: 'Always skip identical adjacent elements (nums[i] == nums[i-1]) to avoid duplicate triplets.',
    codeSnippet: `class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        vector<vector<int>> ans;
        int n = nums.size();
        for (int i = 0; i < n - 2; ++i) {
            if (i > 0 && nums[i] == nums[i - 1]) continue;
            int l = i + 1, r = n - 1;
            while (l < r) {
                int sum = nums[i] + nums[l] + nums[r];
                if (sum == 0) {
                    ans.push_back({nums[i], nums[l], nums[r]});
                    while (l < r && nums[l] == nums[l + 1]) l++;
                    while (l < r && nums[r] == nums[r - 1]) r--;
                    l++; r--;
                } else if (sum < 0) l++;
                else r--;
            }
        }
        return ans;
    }
};`
  },
  {
    id: 'lc-11',
    lcNumber: 11,
    title: 'Container With Most Water',
    topic: 'arrays',
    topicName: 'Arrays',
    difficulty: 'Medium',
    slug: 'container-with-most-water',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    keyIntuition: 'Two pointers at both ends. Compute area = (r - l) * min(h[l], h[r]). Move the pointer pointing to the shorter vertical bar inwards.',
    cppTip: 'Moving the taller bar can never increase the area, only moving the shorter bar has potential.',
    codeSnippet: `class Solution {
public:
    int maxArea(vector<int>& height) {
        int l = 0, r = height.size() - 1, maxW = 0;
        while (l < r) {
            maxW = max(maxW, (r - l) * min(height[l], height[r]));
            if (height[l] < height[r]) l++;
            else r--;
        }
        return maxW;
    }
};`
  },
  {
    id: 'lc-56',
    lcNumber: 56,
    title: 'Merge Intervals',
    topic: 'arrays',
    topicName: 'Arrays',
    difficulty: 'Medium',
    slug: 'merge-intervals',
    timeComplexity: 'O(N log N)',
    spaceComplexity: 'O(N)',
    keyIntuition: 'Sort intervals by start time. Iterate through: if current interval overlaps with the last merged interval, extend its end; otherwise add new interval.',
    cppTip: 'Sort using default vector comparator: sorts by intervals[i][0], then intervals[i][1].',
    codeSnippet: `class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        if (intervals.empty()) return {};
        sort(intervals.begin(), intervals.end());
        vector<vector<int>> merged;
        merged.push_back(intervals[0]);
        for (int i = 1; i < intervals.size(); ++i) {
            if (intervals[i][0] <= merged.back()[1]) {
                merged.back()[1] = max(merged.back()[1], intervals[i][1]);
            } else {
                merged.push_back(intervals[i]);
            }
        }
        return merged;
    }
};`
  },
  {
    id: 'lc-42',
    lcNumber: 42,
    title: 'Trapping Rain Water',
    topic: 'arrays',
    topicName: 'Arrays',
    difficulty: 'Hard',
    slug: 'trapping-rain-water',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    keyIntuition: 'Two pointer approach: maintain leftMax and rightMax. Water trapped at position depends on the smaller of the two maximums.',
    cppTip: 'Two pointers reduces space from O(N) prefix/suffix arrays to O(1).',
    codeSnippet: `class Solution {
public:
    int trap(vector<int>& height) {
        int l = 0, r = height.size() - 1;
        int leftMax = 0, rightMax = 0, water = 0;
        while (l < r) {
            if (height[l] < height[r]) {
                if (height[l] >= leftMax) leftMax = height[l];
                else water += leftMax - height[l];
                l++;
            } else {
                if (height[r] >= rightMax) rightMax = height[r];
                else water += rightMax - height[r];
                r--;
            }
        }
        return water;
    }
};`
  },
  {
    id: 'lc-31',
    lcNumber: 31,
    title: 'Next Permutation',
    topic: 'arrays',
    topicName: 'Arrays',
    difficulty: 'Medium',
    slug: 'next-permutation',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    keyIntuition: 'Find the first decreasing element from the right (i). Find the element just larger than nums[i] from right (j), swap them, then reverse suffix after i.',
    cppTip: 'This is the exact algorithm executed by C++ standard library std::next_permutation.',
    codeSnippet: `class Solution {
public:
    void nextPermutation(vector<int>& nums) {
        int n = nums.size(), i = n - 2;
        while (i >= 0 && nums[i] >= nums[i + 1]) i--;
        if (i >= 0) {
            int j = n - 1;
            while (nums[j] <= nums[i]) j--;
            swap(nums[i], nums[j]);
        }
        reverse(nums.begin() + i + 1, nums.end());
    }
};`
  },
  {
    id: 'lc-560',
    lcNumber: 560,
    title: 'Subarray Sum Equals K',
    topic: 'arrays',
    topicName: 'Arrays',
    difficulty: 'Medium',
    slug: 'subarray-sum-equals-k',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    keyIntuition: 'Maintain prefix sum. If (prefixSum - k) occurred previously, those subsegments sum to k. Track prefix frequencies in a hash map.',
    cppTip: 'Initialize map with {0, 1} to handle subarrays starting at index 0.',
    codeSnippet: `class Solution {
public:
    int subarraySum(vector<int>& nums, int k) {
        unordered_map<int, int> prefixCount;
        prefixCount[0] = 1;
        int sum = 0, count = 0;
        for (int x : nums) {
            sum += x;
            if (prefixCount.find(sum - k) != prefixCount.end()) {
                count += prefixCount[sum - k];
            }
            prefixCount[sum]++;
        }
        return count;
    }
};`
  },
  {
    id: 'lc-48',
    lcNumber: 48,
    title: 'Rotate Image',
    topic: 'arrays',
    topicName: 'Arrays',
    difficulty: 'Medium',
    slug: 'rotate-image',
    timeComplexity: 'O(N²)',
    spaceComplexity: 'O(1)',
    keyIntuition: 'Rotate 90 degrees clockwise by transposing the matrix (swap matrix[i][j] with matrix[j][i]), then reversing each row.',
    cppTip: 'In-place transpose only iterates j from i + 1 to n - 1.',
    codeSnippet: `class Solution {
public:
    void rotate(vector<vector<int>>& matrix) {
        int n = matrix.size();
        for (int i = 0; i < n; ++i) {
            for (int j = i + 1; j < n; ++j) {
                swap(matrix[i][j], matrix[j][i]);
            }
            reverse(matrix[i].begin(), matrix[i].end());
        }
    }
};`
  },
  {
    id: 'lc-75',
    lcNumber: 75,
    title: 'Sort Colors (Dutch National Flag)',
    topic: 'arrays',
    topicName: 'Arrays',
    difficulty: 'Medium',
    slug: 'sort-colors',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    keyIntuition: 'Three pointers: low (boundary for 0s), mid (current element), high (boundary for 2s). One pass partition.',
    cppTip: 'When swapping with nums[high], do not increment mid because the swapped element is uninspected.',
    codeSnippet: `class Solution {
public:
    void sortColors(vector<int>& nums) {
        int low = 0, mid = 0, high = nums.size() - 1;
        while (mid <= high) {
            if (nums[mid] == 0) {
                swap(nums[low++], nums[mid++]);
            } else if (nums[mid] == 1) {
                mid++;
            } else {
                swap(nums[mid], nums[high--]);
            }
        }
    }
};`
  },

  // ==================== 1. STRINGS ====================
  {
    id: 'lc-344',
    lcNumber: 344,
    title: 'Reverse String',
    topic: 'strings',
    topicName: 'Strings',
    difficulty: 'Easy',
    slug: 'reverse-string',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    keyIntuition: 'Two pointers at start and end. Swap characters and move inwards until left >= right.',
    cppTip: 'std::swap(s[left], s[right]) avoids temporary buffer overhead.',
    codeSnippet: `class Solution {
public:
    void reverseString(vector<char>& s) {
        int l = 0, r = s.size() - 1;
        while (l < r) {
            swap(s[l++], s[r--]);
        }
    }
};`
  },
  {
    id: 'lc-541',
    lcNumber: 541,
    title: 'Reverse String II',
    topic: 'strings',
    topicName: 'Strings',
    difficulty: 'Easy',
    slug: 'reverse-string-ii',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    keyIntuition: 'Jump index by 2k. At each step, reverse min(k, remaining) characters.',
    cppTip: 'Use std::reverse(s.begin() + i, s.begin() + min(i + k, (int)s.size())).',
    codeSnippet: `class Solution {
public:
    string reverseStr(string s, int k) {
        for (int i = 0; i < s.size(); i += 2 * k) {
            reverse(s.begin() + i, s.begin() + min((int)s.size(), i + k));
        }
        return s;
    }
};`
  },
  {
    id: 'lc-557',
    lcNumber: 557,
    title: 'Reverse Words in a String III',
    topic: 'strings',
    topicName: 'Strings',
    difficulty: 'Easy',
    slug: 'reverse-words-in-a-string-iii',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    keyIntuition: 'Find boundaries of each space-delimited word and reverse that range in-place.',
    cppTip: 'Use two pointers start and end to isolate word spans without stringstream allocations.',
    codeSnippet: `class Solution {
public:
    string reverseWords(string s) {
        int start = 0;
        for (int i = 0; i <= s.size(); ++i) {
            if (i == s.size() || s[i] == ' ') {
                reverse(s.begin() + start, s.begin() + i);
                start = i + 1;
            }
        }
        return s;
    }
};`
  },
  {
    id: 'lc-151',
    lcNumber: 151,
    title: 'Reverse Words in a String',
    topic: 'strings',
    topicName: 'Strings',
    difficulty: 'Medium',
    slug: 'reverse-words-in-a-string',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    keyIntuition: 'Clean multiple spaces in-place, reverse the entire string, then reverse each individual word.',
    cppTip: 'Writing in-place with two pointers yields true O(1) auxiliary space in C++.',
    codeSnippet: `class Solution {
public:
    string reverseWords(string s) {
        // Step 1: remove extra spaces
        int n = s.size(), idx = 0;
        for (int start = 0; start < n; ++start) {
            if (s[start] != ' ') {
                if (idx != 0) s[idx++] = ' ';
                int end = start;
                while (end < n && s[end] != ' ') s[idx++] = s[end++];
                start = end;
            }
        }
        s.erase(s.begin() + idx, s.end());
        // Step 2: reverse whole string
        reverse(s.begin(), s.end());
        // Step 3: reverse individual words
        for (int i = 0, j = 0; j <= s.size(); ++j) {
            if (j == s.size() || s[j] == ' ') {
                reverse(s.begin() + i, s.begin() + j);
                i = j + 1;
            }
        }
        return s;
    }
};`
  },
  {
    id: 'lc-58',
    lcNumber: 58,
    title: 'Length of Last Word',
    topic: 'strings',
    topicName: 'Strings',
    difficulty: 'Easy',
    slug: 'length-of-last-word',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    keyIntuition: 'Start from the end of the string, skip trailing spaces, then count characters until the next space.',
    cppTip: 'Iterate backwards with int i = s.size() - 1 for early exit.',
    codeSnippet: `class Solution {
public:
    int lengthOfLastWord(string s) {
        int i = s.size() - 1, len = 0;
        while (i >= 0 && s[i] == ' ') i--;
        while (i >= 0 && s[i] != ' ') {
            len++;
            i--;
        }
        return len;
    }
};`
  },
  {
    id: 'lc-14',
    lcNumber: 14,
    title: 'Longest Common Prefix',
    topic: 'strings',
    topicName: 'Strings',
    difficulty: 'Easy',
    slug: 'longest-common-prefix',
    timeComplexity: 'O(S)',
    spaceComplexity: 'O(1)',
    keyIntuition: 'Vertical scanning: compare character by character across all strings at index i.',
    cppTip: 'Return strs[0].substr(0, i) the moment any string is too short or character mismatches.',
    codeSnippet: `class Solution {
public:
    string longestCommonPrefix(vector<string>& strs) {
        if (strs.empty()) return "";
        for (int i = 0; i < strs[0].size(); ++i) {
            char c = strs[0][i];
            for (int j = 1; j < strs.size(); ++j) {
                if (i >= strs[j].size() || strs[j][i] != c) {
                    return strs[0].substr(0, i);
                }
            }
        }
        return strs[0];
    }
};`
  },
  {
    id: 'lc-28',
    lcNumber: 28,
    title: 'Find the Index of the First Occurrence in a String',
    topic: 'strings',
    topicName: 'Strings',
    difficulty: 'Easy',
    slug: 'find-the-index-of-the-first-occurrence-in-a-string',
    timeComplexity: 'O(N * M)',
    spaceComplexity: 'O(1)',
    keyIntuition: 'Sliding window matching needle length against haystack, or KMP pattern matching.',
    cppTip: 'In C++, haystack.find(needle) is fast, but manual loop demonstrates string matching.',
    codeSnippet: `class Solution {
public:
    int strStr(string haystack, string needle) {
        int n = haystack.size(), m = needle.size();
        if (m == 0) return 0;
        for (int i = 0; i <= n - m; ++i) {
            int j = 0;
            while (j < m && haystack[i + j] == needle[j]) j++;
            if (j == m) return i;
        }
        return -1;
    }
};`
  },
  {
    id: 'lc-125',
    lcNumber: 125,
    title: 'Valid Palindrome',
    topic: 'strings',
    topicName: 'Strings',
    difficulty: 'Easy',
    slug: 'valid-palindrome',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    keyIntuition: 'Two pointers from start and end. Skip non-alphanumeric characters, compare lowercase versions.',
    cppTip: 'Use std::isalnum and std::tolower from <cctype>.',
    codeSnippet: `class Solution {
public:
    bool isPalindrome(string s) {
        int l = 0, r = s.size() - 1;
        while (l < r) {
            while (l < r && !isalnum(s[l])) l++;
            while (l < r && !isalnum(s[r])) r--;
            if (tolower(s[l]) != tolower(s[r])) return false;
            l++; r--;
        }
        return true;
    }
};`
  },
  {
    id: 'lc-680',
    lcNumber: 680,
    title: 'Valid Palindrome II',
    topic: 'strings',
    topicName: 'Strings',
    difficulty: 'Easy',
    slug: 'valid-palindrome-ii',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    keyIntuition: 'When s[l] != s[r], check if either substring(l+1, r) or substring(l, r-1) is a palindrome.',
    cppTip: 'Helper function checking isPalindromeRange(s, l, r) avoids code duplication.',
    codeSnippet: `class Solution {
public:
    bool check(const string& s, int l, int r) {
        while (l < r) {
            if (s[l++] != s[r--]) return false;
        }
        return true;
    }
    bool validPalindrome(string s) {
        int l = 0, r = s.size() - 1;
        while (l < r) {
            if (s[l] != s[r]) {
                return check(s, l + 1, r) || check(s, l, r - 1);
            }
            l++; r--;
        }
        return true;
    }
};`
  },
  {
    id: 'lc-5',
    lcNumber: 5,
    title: 'Longest Palindromic Substring',
    topic: 'strings',
    topicName: 'Strings',
    difficulty: 'Medium',
    slug: 'longest-palindromic-substring',
    timeComplexity: 'O(N²)',
    spaceComplexity: 'O(1)',
    keyIntuition: 'Expand around center: every character can be the center of an odd palindrome, and every pair (i, i+1) can be an even center.',
    cppTip: 'Pass indices rather than substrings to keep space O(1).',
    codeSnippet: `class Solution {
public:
    string longestPalindrome(string s) {
        int start = 0, maxLen = 0;
        auto expand = [&](int l, int r) {
            while (l >= 0 && r < s.size() && s[l] == s[r]) {
                l--; r++;
            }
            if (r - l - 1 > maxLen) {
                maxLen = r - l - 1;
                start = l + 1;
            }
        };
        for (int i = 0; i < s.size(); ++i) {
            expand(i, i);
            expand(i, i + 1);
        }
        return s.substr(start, maxLen);
    }
};`
  },
  {
    id: 'lc-3',
    lcNumber: 3,
    title: 'Longest Substring Without Repeating Characters',
    topic: 'strings',
    topicName: 'Strings',
    difficulty: 'Medium',
    slug: 'longest-substring-without-repeating-characters',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(min(N, M))',
    keyIntuition: 'Sliding window: store last seen index of each character in an array lastIndex[128]. If seen inside current window, jump left pointer.',
    cppTip: 'A vector<int> last(128, -1) is much faster than std::unordered_map.',
    codeSnippet: `class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        vector<int> last(128, -1);
        int maxLen = 0, left = 0;
        for (int right = 0; right < s.size(); ++right) {
            if (last[s[right]] >= left) {
                left = last[s[right]] + 1;
            }
            last[s[right]] = right;
            maxLen = max(maxLen, right - left + 1);
        }
        return maxLen;
    }
};`
  },
  {
    id: 'lc-242',
    lcNumber: 242,
    title: 'Valid Anagram',
    topic: 'strings',
    topicName: 'Strings',
    difficulty: 'Easy',
    slug: 'valid-anagram',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    keyIntuition: 'Count character frequencies with an int count[26] array. Increment for s, decrement for t. Check if all zeros.',
    cppTip: 'If s.size() != t.size(), return false immediately.',
    codeSnippet: `class Solution {
public:
    bool isAnagram(string s, string t) {
        if (s.size() != t.size()) return false;
        int freq[26] = {0};
        for (char c : s) freq[c - 'a']++;
        for (char c : t) {
            if (--freq[c - 'a'] < 0) return false;
        }
        return true;
    }
};`
  },
  {
    id: 'lc-383',
    lcNumber: 383,
    title: 'Ransom Note',
    topic: 'strings',
    topicName: 'Strings',
    difficulty: 'Easy',
    slug: 'ransom-note',
    timeComplexity: 'O(N + M)',
    spaceComplexity: 'O(1)',
    keyIntuition: 'Count magazine characters in a frequency array of size 26. Decrement for ransomNote; if any count drops below 0, return false.',
    cppTip: 'Stack allocated fixed-size array int counts[26] = {0} is zero-overhead.',
    codeSnippet: `class Solution {
public:
    bool canConstruct(string ransomNote, string magazine) {
        int count[26] = {0};
        for (char c : magazine) count[c - 'a']++;
        for (char c : ransomNote) {
            if (--count[c - 'a'] < 0) return false;
        }
        return true;
    }
};`
  },
  {
    id: 'lc-387',
    lcNumber: 387,
    title: 'First Unique Character in a String',
    topic: 'strings',
    topicName: 'Strings',
    difficulty: 'Easy',
    slug: 'first-unique-character-in-a-string',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    keyIntuition: 'First pass counts character frequencies. Second pass scans s from left to right; return index of first character with frequency 1.',
    cppTip: 'Two linear passes with int freq[26] = {0}.',
    codeSnippet: `class Solution {
public:
    int firstUniqChar(string s) {
        int freq[26] = {0};
        for (char c : s) freq[c - 'a']++;
        for (int i = 0; i < s.size(); ++i) {
            if (freq[s[i] - 'a'] == 1) return i;
        }
        return -1;
    }
};`
  },
  {
    id: 'lc-49',
    lcNumber: 49,
    title: 'Group Anagrams',
    topic: 'strings',
    topicName: 'Strings',
    difficulty: 'Medium',
    slug: 'group-anagrams',
    timeComplexity: 'O(N * K log K)',
    spaceComplexity: 'O(N * K)',
    keyIntuition: 'Sort each string to form a canonical key. Group matching words in an unordered_map<string, vector<string>>.',
    cppTip: 'Reserved vector sizes improve memory layout and speed.',
    codeSnippet: `class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        unordered_map<string, vector<string>> groups;
        for (const string& str : strs) {
            string key = str;
            sort(key.begin(), key.end());
            groups[key].push_back(str);
        }
        vector<vector<string>> ans;
        ans.reserve(groups.size());
        for (auto& pair : groups) {
            ans.push_back(move(pair.second));
        }
        return ans;
    }
};`
  },
  {
    id: 'lc-438',
    lcNumber: 438,
    title: 'Find All Anagrams in a String',
    topic: 'strings',
    topicName: 'Strings',
    difficulty: 'Medium',
    slug: 'find-all-anagrams-in-a-string',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    keyIntuition: 'Sliding window of length p.size(). Maintain freq arrays of size 26 for window and p. Add start index when freq arrays match.',
    cppTip: 'Compare std::vector<int> counts directly with == operator in O(26) = O(1).',
    codeSnippet: `class Solution {
public:
    vector<int> findAnagrams(string s, string p) {
        vector<int> ans;
        if (s.size() < p.size()) return ans;
        vector<int> pFreq(26, 0), winFreq(26, 0);
        for (char c : p) pFreq[c - 'a']++;
        for (int i = 0; i < s.size(); ++i) {
            winFreq[s[i] - 'a']++;
            if (i >= p.size()) winFreq[s[i - p.size()] - 'a']--;
            if (winFreq == pFreq) ans.push_back(i - p.size() + 1);
        }
        return ans;
    }
};`
  },
  {
    id: 'lc-76',
    lcNumber: 76,
    title: 'Minimum Window Substring',
    topic: 'strings',
    topicName: 'Strings',
    difficulty: 'Hard',
    slug: 'minimum-window-substring',
    timeComplexity: 'O(N + M)',
    spaceComplexity: 'O(1)',
    keyIntuition: 'Sliding window with frequency hash map. Expand right pointer until window contains all characters in t, then shrink left pointer to find minimum.',
    cppTip: 'Use a counter requiredMatch to check validity in O(1) without iterating map.',
    codeSnippet: `class Solution {
public:
    string minWindow(string s, string t) {
        vector<int> map(128, 0);
        for (char c : t) map[c]++;
        int count = t.size(), start = 0, minLen = INT_MAX, minStart = 0;
        for (int r = 0, l = 0; r < s.size(); ++r) {
            if (map[s[r]]-- > 0) count--;
            while (count == 0) {
                if (r - l + 1 < minLen) {
                    minLen = r - l + 1;
                    minStart = l;
                }
                if (++map[s[l++]] > 0) count++;
            }
        }
        return minLen == INT_MAX ? "" : s.substr(minStart, minLen);
    }
};`
  },
  {
    id: 'lc-459',
    lcNumber: 459,
    title: 'Repeated Substring Pattern',
    topic: 'strings',
    topicName: 'Strings',
    difficulty: 'Easy',
    slug: 'repeated-substring-pattern',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    keyIntuition: 'A string s is periodic if and only if s is a substring of (s + s) with the first and last characters removed.',
    cppTip: 'doubled.substr(1, 2 * s.size() - 2).find(s) != string::npos is an elegant one-liner.',
    codeSnippet: `class Solution {
public:
    bool repeatedSubstringPattern(string s) {
        string doubled = s + s;
        return doubled.substr(1, doubled.size() - 2).find(s) != string::npos;
    }
};`
  },
  {
    id: 'lc-13',
    lcNumber: 13,
    title: 'Roman to Integer',
    topic: 'strings',
    topicName: 'Strings',
    difficulty: 'Easy',
    slug: 'roman-to-integer',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    keyIntuition: 'Map Roman symbols to values. If current symbol has smaller value than the next symbol, subtract it; otherwise add it.',
    cppTip: 'A switch statement or lambda map gives fast lookup.',
    codeSnippet: `class Solution {
public:
    int romanToInt(string s) {
        auto val = [](char c) {
            switch (c) {
                case 'I': return 1;
                case 'V': return 5;
                case 'X': return 10;
                case 'L': return 50;
                case 'C': return 100;
                case 'D': return 500;
                case 'M': return 1000;
                default: return 0;
            }
        };
        int ans = 0;
        for (int i = 0; i < s.size(); ++i) {
            if (i + 1 < s.size() && val(s[i]) < val(s[i + 1])) {
                ans -= val(s[i]);
            } else {
                ans += val(s[i]);
            }
        }
        return ans;
    }
};`
  },
  {
    id: 'lc-12',
    lcNumber: 12,
    title: 'Integer to Roman',
    topic: 'strings',
    topicName: 'Strings',
    difficulty: 'Medium',
    slug: 'integer-to-roman',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    keyIntuition: 'Greedy approach: list Roman values and symbols in descending order (1000, 900, 500, 400...). Subtract and append symbols.',
    cppTip: 'Pairs of {int, const char*} keep data localized.',
    codeSnippet: `class Solution {
public:
    string intToRoman(int num) {
        const vector<pair<int, string>> table = {
            {1000, "M"}, {900, "CM"}, {500, "D"}, {400, "CD"},
            {100, "C"}, {90, "XC"}, {50, "L"}, {40, "XL"},
            {10, "X"}, {9, "IX"}, {5, "V"}, {4, "IV"}, {1, "I"}
        };
        string res = "";
        for (const auto& [v, sym] : table) {
            while (num >= v) {
                res += sym;
                num -= v;
            }
        }
        return res;
    }
};`
  },
  {
    id: 'lc-6',
    lcNumber: 6,
    title: 'Zigzag Conversion',
    topic: 'strings',
    topicName: 'Strings',
    difficulty: 'Medium',
    slug: 'zigzag-conversion',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    keyIntuition: 'Simulate the bouncing ball motion across numRows strings. Reverse direction whenever row reaches 0 or numRows - 1.',
    cppTip: 'Combine vector<string> rows at the end.',
    codeSnippet: `class Solution {
public:
    string convert(string s, int numRows) {
        if (numRows <= 1 || s.size() <= numRows) return s;
        vector<string> rows(numRows);
        int curRow = 0;
        bool goingDown = false;
        for (char c : s) {
            rows[curRow] += c;
            if (curRow == 0 || curRow == numRows - 1) goingDown = !goingDown;
            curRow += goingDown ? 1 : -1;
        }
        string ans = "";
        for (const string& row : rows) ans += row;
        return ans;
    }
};`
  },
  {
    id: 'lc-8',
    lcNumber: 8,
    title: 'String to Integer (atoi)',
    topic: 'strings',
    topicName: 'Strings',
    difficulty: 'Medium',
    slug: 'string-to-integer-atoi',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    keyIntuition: 'Skip whitespace, parse optional sign, accumulate digits while checking for 32-bit signed integer overflow against INT_MAX/INT_MIN.',
    cppTip: 'Check overflow before multiplying: if res > INT_MAX / 10 clamp to INT_MAX or INT_MIN.',
    codeSnippet: `class Solution {
public:
    int myAtoi(string s) {
        int i = 0, n = s.size(), sign = 1;
        long res = 0;
        while (i < n && s[i] == ' ') i++;
        if (i < n && (s[i] == '+' || s[i] == '-')) {
            sign = (s[i++] == '-') ? -1 : 1;
        }
        while (i < n && isdigit(s[i])) {
            res = res * 10 + (s[i++] - '0');
            if (sign == 1 && res > INT_MAX) return INT_MAX;
            if (sign == -1 && -res < INT_MIN) return INT_MIN;
        }
        return res * sign;
    }
};`
  },
  {
    id: 'lc-67',
    lcNumber: 67,
    title: 'Add Binary',
    topic: 'strings',
    topicName: 'Strings',
    difficulty: 'Easy',
    slug: 'add-binary',
    timeComplexity: 'O(max(N, M))',
    spaceComplexity: 'O(max(N, M))',
    keyIntuition: 'Add bits from right to left with a carry variable. Append sum % 2 to result and update carry = sum / 2.',
    cppTip: 'Reverse result string at the end for O(1) amortized appends.',
    codeSnippet: `class Solution {
public:
    string addBinary(string a, string b) {
        int i = a.size() - 1, j = b.size() - 1, carry = 0;
        string res = "";
        while (i >= 0 || j >= 0 || carry) {
            int sum = carry;
            if (i >= 0) sum += a[i--] - '0';
            if (j >= 0) sum += b[j--] - '0';
            res += to_string(sum % 2);
            carry = sum / 2;
        }
        reverse(res.begin(), res.end());
        return res;
    }
};`
  },
  {
    id: 'lc-415',
    lcNumber: 415,
    title: 'Add Strings',
    topic: 'strings',
    topicName: 'Strings',
    difficulty: 'Easy',
    slug: 'add-strings',
    timeComplexity: 'O(max(N, M))',
    spaceComplexity: 'O(max(N, M))',
    keyIntuition: 'Simulate column-by-column decimal addition from right to left with carry.',
    cppTip: 'Avoid converting directly to int/long to prevent integer overflow for huge strings.',
    codeSnippet: `class Solution {
public:
    string addStrings(string num1, string num2) {
        int i = num1.size() - 1, j = num2.size() - 1, carry = 0;
        string res = "";
        while (i >= 0 || j >= 0 || carry) {
            int sum = carry;
            if (i >= 0) sum += num1[i--] - '0';
            if (j >= 0) sum += num2[j--] - '0';
            res += (char)('0' + sum % 10);
            carry = sum / 10;
        }
        reverse(res.begin(), res.end());
        return res;
    }
};`
  },

  // ==================== 2. LINKED LIST ====================
  {
    id: 'lc-206',
    lcNumber: 206,
    title: 'Reverse Linked List',
    topic: 'linked-list',
    topicName: 'Linked List',
    difficulty: 'Easy',
    slug: 'reverse-linked-list',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    keyIntuition: 'Iterative 3-pointer reversal: prev, curr, next. Point curr->next to prev and step forward.',
    cppTip: 'Free or avoid leaking nodes. Prefer nullptr checks over sentinel values.',
    codeSnippet: `class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        ListNode* prev = nullptr;
        ListNode* curr = head;
        while (curr != nullptr) {
            ListNode* nextTemp = curr->next;
            curr->next = prev;
            prev = curr;
            curr = nextTemp;
        }
        return prev;
    }
};`
  },
  {
    id: 'lc-92',
    lcNumber: 92,
    title: 'Reverse Linked List II',
    topic: 'linked-list',
    topicName: 'Linked List',
    difficulty: 'Medium',
    slug: 'reverse-linked-list-ii',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    keyIntuition: 'Use a dummy node to reach position left - 1. In-place head-insert nodes between left and right.',
    cppTip: 'Dummy node eliminates special handling when left == 1.',
    codeSnippet: `class Solution {
public:
    ListNode* reverseBetween(ListNode* head, int left, int right) {
        ListNode dummy(0);
        dummy.next = head;
        ListNode* prev = &dummy;
        for (int i = 0; i < left - 1; ++i) prev = prev->next;
        ListNode* curr = prev->next;
        for (int i = 0; i < right - left; ++i) {
            ListNode* temp = curr->next;
            curr->next = temp->next;
            temp->next = prev->next;
            prev->next = temp;
        }
        return dummy.next;
    }
};`
  },
  {
    id: 'lc-876',
    lcNumber: 876,
    title: 'Middle of the Linked List',
    topic: 'linked-list',
    topicName: 'Linked List',
    difficulty: 'Easy',
    slug: 'middle-of-the-linked-list',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    keyIntuition: 'Fast and slow pointer: fast moves 2 steps, slow moves 1 step. When fast reaches end, slow is at the middle.',
    cppTip: 'Check fast != nullptr && fast->next != nullptr in while loop.',
    codeSnippet: `class Solution {
public:
    ListNode* middleNode(ListNode* head) {
        ListNode* slow = head;
        ListNode* fast = head;
        while (fast != nullptr && fast->next != nullptr) {
            slow = slow->next;
            fast = fast->next->next;
        }
        return slow;
    }
};`
  },
  {
    id: 'lc-21',
    lcNumber: 21,
    title: 'Merge Two Sorted Lists',
    topic: 'linked-list',
    topicName: 'Linked List',
    difficulty: 'Easy',
    slug: 'merge-two-sorted-lists',
    timeComplexity: 'O(N + M)',
    spaceComplexity: 'O(1)',
    keyIntuition: 'Maintain a dummy node. Compare heads of both lists, attach smaller node to tail, and advance.',
    cppTip: 'Allocate dummy on the stack (ListNode dummy(0)) to avoid dynamic heap allocation.',
    codeSnippet: `class Solution {
public:
    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
        ListNode dummy(0);
        ListNode* tail = &dummy;
        while (list1 != nullptr && list2 != nullptr) {
            if (list1->val < list2->val) {
                tail->next = list1;
                list1 = list1->next;
            } else {
                tail->next = list2;
                list2 = list2->next;
            }
            tail = tail->next;
        }
        tail->next = list1 ? list1 : list2;
        return dummy.next;
    }
};`
  },
  {
    id: 'lc-2',
    lcNumber: 2,
    title: 'Add Two Numbers',
    topic: 'linked-list',
    topicName: 'Linked List',
    difficulty: 'Medium',
    slug: 'add-two-numbers',
    timeComplexity: 'O(max(N, M))',
    spaceComplexity: 'O(max(N, M))',
    keyIntuition: 'Traverse lists simultaneously, adding values and carry. Create new node with sum % 10.',
    cppTip: 'ListNode dummy(0); ListNode* curr = &dummy simplifies node addition.',
    codeSnippet: `class Solution {
public:
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        ListNode dummy(0);
        ListNode* curr = &dummy;
        int carry = 0;
        while (l1 != nullptr || l2 != nullptr || carry) {
            int sum = carry;
            if (l1) { sum += l1->val; l1 = l1->next; }
            if (l2) { sum += l2->val; l2 = l2->next; }
            carry = sum / 10;
            curr->next = new ListNode(sum % 10);
            curr = curr->next;
        }
        return dummy.next;
    }
};`
  },
  {
    id: 'lc-19',
    lcNumber: 19,
    title: 'Remove Nth Node From End of List',
    topic: 'linked-list',
    topicName: 'Linked List',
    difficulty: 'Medium',
    slug: 'remove-nth-node-from-end-of-list',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    keyIntuition: 'Advance fast pointer by n + 1 steps from dummy. Move fast and slow together until fast is null. Slow is now just before the target.',
    cppTip: 'Remember to delete toRemove node in real C++ code to prevent memory leak.',
    codeSnippet: `class Solution {
public:
    ListNode* removeNthFromEnd(ListNode* head, int n) {
        ListNode dummy(0);
        dummy.next = head;
        ListNode* fast = &dummy;
        ListNode* slow = &dummy;
        for (int i = 0; i <= n; ++i) fast = fast->next;
        while (fast != nullptr) {
            fast = fast->next;
            slow = slow->next;
        }
        ListNode* toDelete = slow->next;
        slow->next = slow->next->next;
        delete toDelete;
        return dummy.next;
    }
};`
  },
  {
    id: 'lc-83',
    lcNumber: 83,
    title: 'Remove Duplicates from Sorted List',
    topic: 'linked-list',
    topicName: 'Linked List',
    difficulty: 'Easy',
    slug: 'remove-duplicates-from-sorted-list',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    keyIntuition: 'Traverse list. If curr->val == curr->next->val, skip curr->next and free it.',
    cppTip: 'Always delete the duplicate node in C++ to practice memory safety.',
    codeSnippet: `class Solution {
public:
    ListNode* deleteDuplicates(ListNode* head) {
        ListNode* curr = head;
        while (curr != nullptr && curr->next != nullptr) {
            if (curr->val == curr->next->val) {
                ListNode* dup = curr->next;
                curr->next = curr->next->next;
                delete dup;
            } else {
                curr = curr->next;
            }
        }
        return head;
    }
};`
  },
  {
    id: 'lc-82',
    lcNumber: 82,
    title: 'Remove Duplicates from Sorted List II',
    topic: 'linked-list',
    topicName: 'Linked List',
    difficulty: 'Medium',
    slug: 'remove-duplicates-from-sorted-list-ii',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    keyIntuition: 'Use dummy head. If curr->next and curr->next->next have equal values, loop to skip all identical nodes entirely.',
    cppTip: 'prev pointer only advances when no duplicate sequence was detected.',
    codeSnippet: `class Solution {
public:
    ListNode* deleteDuplicates(ListNode* head) {
        ListNode dummy(0);
        dummy.next = head;
        ListNode* prev = &dummy;
        while (head != nullptr) {
            if (head->next != nullptr && head->val == head->next->val) {
                while (head->next != nullptr && head->val == head->next->val) {
                    head = head->next;
                }
                prev->next = head->next;
            } else {
                prev = prev->next;
            }
            head = head->next;
        }
        return dummy.next;
    }
};`
  },
  {
    id: 'lc-61',
    lcNumber: 61,
    title: 'Rotate List',
    topic: 'linked-list',
    topicName: 'Linked List',
    difficulty: 'Medium',
    slug: 'rotate-list',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    keyIntuition: 'Compute length, connect tail to head into a ring. Move (len - k % len) steps, break ring to form new head.',
    cppTip: 'Corner cases: if head is null or k % len == 0, return head immediately.',
    codeSnippet: `class Solution {
public:
    ListNode* rotateRight(ListNode* head, int k) {
        if (!head || !head->next || k == 0) return head;
        int len = 1;
        ListNode* tail = head;
        while (tail->next) { tail = tail->next; len++; }
        k %= len;
        if (k == 0) return head;
        tail->next = head; // make circular
        for (int i = 0; i < len - k; ++i) tail = tail->next;
        ListNode* newHead = tail->next;
        tail->next = nullptr;
        return newHead;
    }
};`
  },
  {
    id: 'lc-24',
    lcNumber: 24,
    title: 'Swap Nodes in Pairs',
    topic: 'linked-list',
    topicName: 'Linked List',
    difficulty: 'Medium',
    slug: 'swap-nodes-in-pairs',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    keyIntuition: 'Use dummy head. In each pair, adjust three pointers: prev->next, first->next, second->next.',
    cppTip: 'Draw the 3 pointer adjustments on paper to guarantee no cycles.',
    codeSnippet: `class Solution {
public:
    ListNode* swapPairs(ListNode* head) {
        ListNode dummy(0);
        dummy.next = head;
        ListNode* prev = &dummy;
        while (prev->next && prev->next->next) {
            ListNode* a = prev->next;
            ListNode* b = a->next;
            a->next = b->next;
            b->next = a;
            prev->next = b;
            prev = a;
        }
        return dummy.next;
    }
};`
  },
  {
    id: 'lc-141',
    lcNumber: 141,
    title: 'Linked List Cycle',
    topic: 'linked-list',
    topicName: 'Linked List',
    difficulty: 'Easy',
    slug: 'linked-list-cycle',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    keyIntuition: 'Floyd’s Cycle-Finding: fast moves 2 steps, slow moves 1 step. If they meet, there is a cycle.',
    cppTip: 'No need for hash sets—Floyd’s uses O(1) extra space.',
    codeSnippet: `class Solution {
public:
    bool hasCycle(ListNode *head) {
        ListNode *slow = head, *fast = head;
        while (fast != nullptr && fast->next != nullptr) {
            slow = slow->next;
            fast = fast->next->next;
            if (slow == fast) return true;
        }
        return false;
    }
};`
  },
  {
    id: 'lc-142',
    lcNumber: 142,
    title: 'Linked List Cycle II',
    topic: 'linked-list',
    topicName: 'Linked List',
    difficulty: 'Medium',
    slug: 'linked-list-cycle-ii',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    keyIntuition: 'When fast and slow meet, reset slow to head. Move both one step at a time; they meet exactly at cycle start.',
    cppTip: 'Mathematical proof: distance from head to cycle entrance equals distance from meeting point to cycle entrance.',
    codeSnippet: `class Solution {
public:
    ListNode *detectCycle(ListNode *head) {
        ListNode *slow = head, *fast = head;
        while (fast && fast->next) {
            slow = slow->next;
            fast = fast->next->next;
            if (slow == fast) {
                slow = head;
                while (slow != fast) {
                    slow = slow->next;
                    fast = fast->next;
                }
                return slow;
            }
        }
        return nullptr;
    }
};`
  },
  {
    id: 'lc-160',
    lcNumber: 160,
    title: 'Intersection of Two Linked Lists',
    topic: 'linked-list',
    topicName: 'Linked List',
    difficulty: 'Easy',
    slug: 'intersection-of-two-linked-lists',
    timeComplexity: 'O(N + M)',
    spaceComplexity: 'O(1)',
    keyIntuition: 'Two pointers pA and pB. When pA reaches end, redirect to headB. When pB reaches end, redirect to headA. They equalize path lengths.',
    cppTip: 'Both pointers traverse exactly lenA + lenB, meeting at intersection or nullptr.',
    codeSnippet: `class Solution {
public:
    ListNode *getIntersectionNode(ListNode *headA, ListNode *headB) {
        ListNode *pA = headA, *pB = headB;
        while (pA != pB) {
            pA = (pA == nullptr) ? headB : pA->next;
            pB = (pB == nullptr) ? headA : pB->next;
        }
        return pA;
    }
};`
  },
  {
    id: 'lc-234',
    lcNumber: 234,
    title: 'Palindrome Linked List',
    topic: 'linked-list',
    topicName: 'Linked List',
    difficulty: 'Easy',
    slug: 'palindrome-linked-list',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    keyIntuition: 'Find middle using slow & fast pointers. Reverse second half. Compare values from head and reversed half.',
    cppTip: 'Optionally re-reverse the second half before returning to restore original structure.',
    codeSnippet: `class Solution {
public:
    bool isPalindrome(ListNode* head) {
        ListNode *slow = head, *fast = head;
        while (fast && fast->next) {
            slow = slow->next;
            fast = fast->next->next;
        }
        ListNode *prev = nullptr, *curr = slow;
        while (curr) {
            ListNode *nxt = curr->next;
            curr->next = prev;
            prev = curr;
            curr = nxt;
        }
        while (prev) {
            if (head->val != prev->val) return false;
            head = head->next;
            prev = prev->next;
        }
        return true;
    }
};`
  },
  {
    id: 'lc-143',
    lcNumber: 143,
    title: 'Reorder List',
    topic: 'linked-list',
    topicName: 'Linked List',
    difficulty: 'Medium',
    slug: 'reorder-list',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    keyIntuition: '1. Find middle. 2. Reverse second half. 3. Merge two halves alternating nodes.',
    cppTip: 'Break the first half by setting slow->next = nullptr before reversing.',
    codeSnippet: `class Solution {
public:
    void reorderList(ListNode* head) {
        if (!head || !head->next) return;
        ListNode *slow = head, *fast = head;
        while (fast->next && fast->next->next) {
            slow = slow->next;
            fast = fast->next->next;
        }
        ListNode *prev = nullptr, *curr = slow->next;
        slow->next = nullptr;
        while (curr) {
            ListNode* nxt = curr->next;
            curr->next = prev;
            prev = curr;
            curr = nxt;
        }
        ListNode *first = head, *second = prev;
        while (second) {
            ListNode *t1 = first->next, *t2 = second->next;
            first->next = second;
            second->next = t1;
            first = t1;
            second = t2;
        }
    }
};`
  },
  {
    id: 'lc-25',
    lcNumber: 25,
    title: 'Reverse Nodes in k-Group',
    topic: 'linked-list',
    topicName: 'Linked List',
    difficulty: 'Hard',
    slug: 'reverse-nodes-in-k-group',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    keyIntuition: 'Check if at least k nodes remain. If so, reverse those k nodes and connect with the next reversed group recursively or iteratively.',
    cppTip: 'Count k nodes first before committing reversal.',
    codeSnippet: `class Solution {
public:
    ListNode* reverseKGroup(ListNode* head, int k) {
        ListNode* curr = head;
        int count = 0;
        while (curr && count < k) {
            curr = curr->next;
            count++;
        }
        if (count == k) {
            ListNode* reversedHead = reverseKGroup(curr, k);
            while (count > 0) {
                ListNode* temp = head->next;
                head->next = reversedHead;
                reversedHead = head;
                head = temp;
                count--;
            }
            head = reversedHead;
        }
        return head;
    }
};`
  },
  {
    id: 'lc-23',
    lcNumber: 23,
    title: 'Merge k Sorted Lists',
    topic: 'linked-list',
    topicName: 'Linked List',
    difficulty: 'Hard',
    slug: 'merge-k-sorted-lists',
    timeComplexity: 'O(N log K)',
    spaceComplexity: 'O(K)',
    keyIntuition: 'Use a min-priority queue of size k containing heads of lists. Continuously pop minimum and push its next node.',
    cppTip: 'Define a custom comparator lambda or struct for ListNode* in std::priority_queue.',
    codeSnippet: `class Solution {
public:
    ListNode* mergeKLists(vector<ListNode*>& lists) {
        auto comp = [](ListNode* a, ListNode* b) { return a->val > b->val; };
        priority_queue<ListNode*, vector<ListNode*>, decltype(comp)> pq(comp);
        for (auto list : lists) {
            if (list) pq.push(list);
        }
        ListNode dummy(0);
        ListNode* tail = &dummy;
        while (!pq.empty()) {
            ListNode* top = pq.top();
            pq.pop();
            tail->next = top;
            tail = tail->next;
            if (top->next) pq.push(top->next);
        }
        return dummy.next;
    }
};`
  },
  {
    id: 'lc-138',
    lcNumber: 138,
    title: 'Copy List with Random Pointer',
    topic: 'linked-list',
    topicName: 'Linked List',
    difficulty: 'Medium',
    slug: 'copy-list-with-random-pointer',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    keyIntuition: '1. Interweave copy nodes next to originals (curr->next = new Node(curr->val)). 2. Set random pointers. 3. Decouple lists.',
    cppTip: 'Interweaving avoids extra O(N) hash map memory.',
    codeSnippet: `class Solution {
public:
    Node* copyRandomList(Node* head) {
        if (!head) return nullptr;
        for (Node* curr = head; curr != nullptr; ) {
            Node* copy = new Node(curr->val);
            copy->next = curr->next;
            curr->next = copy;
            curr = copy->next;
        }
        for (Node* curr = head; curr != nullptr; curr = curr->next->next) {
            if (curr->random) curr->next->random = curr->random->next;
        }
        Node* dummy = new Node(0);
        Node* copyCurr = dummy;
        for (Node* curr = head; curr != nullptr; ) {
            copyCurr->next = curr->next;
            copyCurr = copyCurr->next;
            curr->next = curr->next->next;
            curr = curr->next;
        }
        return dummy->next;
    }
};`
  },
  {
    id: 'lc-146',
    lcNumber: 146,
    title: 'LRU Cache',
    topic: 'linked-list',
    topicName: 'Linked List',
    difficulty: 'Medium',
    slug: 'lru-cache',
    timeComplexity: 'O(1) all ops',
    spaceComplexity: 'O(capacity)',
    keyIntuition: 'Combine std::list (doubly linked list for O(1) splicing) and std::unordered_map storing iterators into list.',
    cppTip: 'Use std::list only when you need O(1) splicing (e.g. list::splice).',
    codeSnippet: `class LRUCache {
    int cap;
    list<pair<int, int>> dll;
    unordered_map<int, list<pair<int, int>>::iterator> mp;
public:
    LRUCache(int capacity) : cap(capacity) {}
    
    int get(int key) {
        auto it = mp.find(key);
        if (it == mp.end()) return -1;
        dll.splice(dll.begin(), dll, it->second);
        return it->second->second;
    }
    
    void put(int key, int value) {
        auto it = mp.find(key);
        if (it != mp.end()) {
            it->second->second = value;
            dll.splice(dll.begin(), dll, it->second);
            return;
        }
        if (dll.size() == cap) {
            int oldKey = dll.back().first;
            dll.pop_back();
            mp.erase(oldKey);
        }
        dll.push_front({key, value});
        mp[key] = dll.begin();
    }
};`
  },

  // ==================== 3. STACK ====================
  {
    id: 'lc-20',
    lcNumber: 20,
    title: 'Valid Parentheses',
    topic: 'stack',
    topicName: 'Stack',
    difficulty: 'Easy',
    slug: 'valid-parentheses',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    keyIntuition: 'Push expected closing brackets onto stack when opening bracket is met. If current closing matches stack top, pop; otherwise false.',
    cppTip: 'Push matching closing bracket directly to simplify comparisons.',
    codeSnippet: `class Solution {
public:
    bool isValid(string s) {
        stack<char> st;
        for (char c : s) {
            if (c == '(') st.push(')');
            else if (c == '{') st.push('}');
            else if (c == '[') st.push(']');
            else {
                if (st.empty() || st.top() != c) return false;
                st.pop();
            }
        }
        return st.empty();
    }
};`
  },
  {
    id: 'lc-1047',
    lcNumber: 1047,
    title: 'Remove All Adjacent Duplicates In String',
    topic: 'stack',
    topicName: 'Stack',
    difficulty: 'Easy',
    slug: 'remove-all-adjacent-duplicates-in-string',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    keyIntuition: 'Use result string itself as stack. If currentChar == res.back(), res.pop_back(); else res.push_back(currentChar).',
    cppTip: 'std::string with push_back and pop_back serves as a zero-overhead stack.',
    codeSnippet: `class Solution {
public:
    string removeDuplicates(string s) {
        string res = "";
        for (char c : s) {
            if (!res.empty() && res.back() == c) res.pop_back();
            else res.push_back(c);
        }
        return res;
    }
};`
  },
  {
    id: 'lc-71',
    lcNumber: 71,
    title: 'Simplify Path',
    topic: 'stack',
    topicName: 'Stack',
    difficulty: 'Medium',
    slug: 'simplify-path',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    keyIntuition: 'Split path by "/". For "..", pop stack if not empty. For normal directory names (not empty and not "."), push onto stack.',
    cppTip: 'Use stringstream with getline(ss, token, \'/\') to parse tokens cleanly.',
    codeSnippet: `class Solution {
public:
    string simplifyPath(string path) {
        stringstream ss(path);
        string token;
        vector<string> st;
        while (getline(ss, token, '/')) {
            if (token == "" || token == ".") continue;
            if (token == "..") {
                if (!st.empty()) st.pop_back();
            } else {
                st.push_back(token);
            }
        }
        string res = "";
        for (const string& dir : st) res += "/" + dir;
        return res.empty() ? "/" : res;
    }
};`
  },
  {
    id: 'lc-155',
    lcNumber: 155,
    title: 'Min Stack',
    topic: 'stack',
    topicName: 'Stack',
    difficulty: 'Medium',
    slug: 'min-stack',
    timeComplexity: 'O(1) all ops',
    spaceComplexity: 'O(N)',
    keyIntuition: 'Maintain a secondary minStack that tracks the minimum element up to the current depth, or store pairs {val, minSoFar} in single stack.',
    cppTip: 'Check !st.empty() before st.top() as required by C++ idioms.',
    codeSnippet: `class MinStack {
    stack<pair<int, int>> st;
public:
    MinStack() {}
    void push(int val) {
        int curMin = st.empty() ? val : min(val, st.top().second);
        st.push({val, curMin});
    }
    void pop() { st.pop(); }
    int top() { return st.top().first; }
    int getMin() { return st.top().second; }
};`
  },
  {
    id: 'lc-150',
    lcNumber: 150,
    title: 'Evaluate Reverse Polish Notation',
    topic: 'stack',
    topicName: 'Stack',
    difficulty: 'Medium',
    slug: 'evaluate-reverse-polish-notation',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    keyIntuition: 'Iterate tokens: if operator, pop two operands, evaluate (note order: second popped is left operand), push result back.',
    cppTip: 'Use std::stol / long to avoid intermediate 32-bit arithmetic overflow.',
    codeSnippet: `class Solution {
public:
    int evalRPN(vector<string>& tokens) {
        stack<long> st;
        for (const string& t : tokens) {
            if (t == "+" || t == "-" || t == "*" || t == "/") {
                long b = st.top(); st.pop();
                long a = st.top(); st.pop();
                if (t == "+") st.push(a + b);
                else if (t == "-") st.push(a - b);
                else if (t == "*") st.push(a * b);
                else if (t == "/") st.push(a / b);
            } else {
                st.push(stol(t));
            }
        }
        return st.top();
    }
};`
  },
  {
    id: 'lc-394',
    lcNumber: 394,
    title: 'Decode String',
    topic: 'stack',
    topicName: 'Stack',
    difficulty: 'Medium',
    slug: 'decode-string',
    timeComplexity: 'O(Output Length)',
    spaceComplexity: 'O(N)',
    keyIntuition: 'Use two stacks: countStack for repeat counts, stringStack for accumulated prefixes. On \']\', pop count and repeat string.',
    cppTip: 'Accumulate multi-digit numbers with k = k * 10 + (c - \'0\').',
    codeSnippet: `class Solution {
public:
    string decodeString(string s) {
        stack<int> counts;
        stack<string> resStack;
        string res = "";
        int k = 0;
        for (char c : s) {
            if (isdigit(c)) {
                k = k * 10 + (c - '0');
            } else if (c == '[') {
                counts.push(k);
                resStack.push(res);
                res = "";
                k = 0;
            } else if (c == ']') {
                string temp = res;
                res = resStack.top(); resStack.pop();
                int repeat = counts.top(); counts.pop();
                while (repeat--) res += temp;
            } else {
                res += c;
            }
        }
        return res;
    }
};`
  },
  {
    id: 'lc-739',
    lcNumber: 739,
    title: 'Daily Temperatures',
    topic: 'stack',
    topicName: 'Stack',
    difficulty: 'Medium',
    slug: 'daily-temperatures',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    keyIntuition: 'Monotonic decreasing stack of indices. While current temperature is higher than st.top(), resolve wait days for st.top().',
    cppTip: 'Store indices instead of values to calculate distances (i - prevIdx) directly.',
    codeSnippet: `class Solution {
public:
    vector<int> dailyTemperatures(vector<int>& temperatures) {
        int n = temperatures.size();
        vector<int> ans(n, 0);
        stack<int> st;
        for (int i = 0; i < n; ++i) {
            while (!st.empty() && temperatures[i] > temperatures[st.top()]) {
                int prev = st.top(); st.pop();
                ans[prev] = i - prev;
            }
            st.push(i);
        }
        return ans;
    }
};`
  },
  {
    id: 'lc-496',
    lcNumber: 496,
    title: 'Next Greater Element I',
    topic: 'stack',
    topicName: 'Stack',
    difficulty: 'Easy',
    slug: 'next-greater-element-i',
    timeComplexity: 'O(N + M)',
    spaceComplexity: 'O(N)',
    keyIntuition: 'Use monotonic stack on nums2 to map each element to its next greater element in an unordered_map. Then lookup each element of nums1.',
    cppTip: 'Every element in nums2 is pushed and popped at most once.',
    codeSnippet: `class Solution {
public:
    vector<int> nextGreaterElement(vector<int>& nums1, vector<int>& nums2) {
        unordered_map<int, int> nextGreater;
        stack<int> st;
        for (int x : nums2) {
            while (!st.empty() && x > st.top()) {
                nextGreater[st.top()] = x;
                st.pop();
            }
            st.push(x);
        }
        vector<int> res;
        for (int x : nums1) {
            res.push_back(nextGreater.count(x) ? nextGreater[x] : -1);
        }
        return res;
    }
};`
  },
  {
    id: 'lc-32',
    lcNumber: 32,
    title: 'Longest Valid Parentheses',
    topic: 'stack',
    topicName: 'Stack',
    difficulty: 'Hard',
    slug: 'longest-valid-parentheses',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    keyIntuition: 'Push -1 as base index onto stack. For \'(\', push index. For \')\', pop; if stack empty, push current index as new base; else update max length.',
    cppTip: 'The difference (i - st.top()) gives valid substring length.',
    codeSnippet: `class Solution {
public:
    int longestValidParentheses(string s) {
        stack<int> st;
        st.push(-1);
        int maxLen = 0;
        for (int i = 0; i < s.size(); ++i) {
            if (s[i] == '(') {
                st.push(i);
            } else {
                st.pop();
                if (st.empty()) {
                    st.push(i);
                } else {
                    maxLen = max(maxLen, i - st.top());
                }
            }
        }
        return maxLen;
    }
};`
  },
  {
    id: 'lc-84',
    lcNumber: 84,
    title: 'Largest Rectangle in Histogram',
    topic: 'stack',
    topicName: 'Stack',
    difficulty: 'Hard',
    slug: 'largest-rectangle-in-histogram',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    keyIntuition: 'Monotonic increasing stack of indices. When a shorter bar is encountered, pop and compute area with popped height as rectangle height.',
    cppTip: 'Append a 0 height sentinel at the end of heights vector to flush remaining bars.',
    codeSnippet: `class Solution {
public:
    int largestRectangleArea(vector<int>& heights) {
        heights.push_back(0);
        stack<int> st;
        int maxArea = 0;
        for (int i = 0; i < heights.size(); ++i) {
            while (!st.empty() && heights[i] < heights[st.top()]) {
                int h = heights[st.top()]; st.pop();
                int w = st.empty() ? i : i - st.top() - 1;
                maxArea = max(maxArea, h * w);
            }
            st.push(i);
        }
        return maxArea;
    }
};`
  },
  {
    id: 'lc-85',
    lcNumber: 85,
    title: 'Maximal Rectangle',
    topic: 'stack',
    topicName: 'Stack',
    difficulty: 'Hard',
    slug: 'maximal-rectangle',
    timeComplexity: 'O(Rows * Cols)',
    spaceComplexity: 'O(Cols)',
    keyIntuition: 'Convert matrix rows into histogram heights. For each row, call Largest Rectangle in Histogram subroutine.',
    cppTip: 'Reuse a 1D heights array across row iterations.',
    codeSnippet: `class Solution {
public:
    int maximalRectangle(vector<vector<char>>& matrix) {
        if (matrix.empty() || matrix[0].empty()) return 0;
        int m = matrix.size(), n = matrix[0].size(), maxArea = 0;
        vector<int> heights(n, 0);
        for (int i = 0; i < m; ++i) {
            for (int j = 0; j < n; ++j) {
                heights[j] = matrix[i][j] == '1' ? heights[j] + 1 : 0;
            }
            // Histogram logic
            vector<int> h = heights;
            h.push_back(0);
            stack<int> st;
            for (int k = 0; k < h.size(); ++k) {
                while (!st.empty() && h[k] < h[st.top()]) {
                    int height = h[st.top()]; st.pop();
                    int width = st.empty() ? k : k - st.top() - 1;
                    maxArea = max(maxArea, height * width);
                }
                st.push(k);
            }
        }
        return maxArea;
    }
};`
  },
  {
    id: 'lc-227',
    lcNumber: 227,
    title: 'Basic Calculator II',
    topic: 'stack',
    topicName: 'Stack',
    difficulty: 'Medium',
    slug: 'basic-calculator-ii',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    keyIntuition: 'Evaluate \'*\', \'/\' immediately by popping top of stack and computing result. For \'+\', push num; for \'-\', push -num.',
    cppTip: 'At the end, sum all elements left in stack for final answer.',
    codeSnippet: `class Solution {
public:
    int calculate(string s) {
        stack<int> st;
        char sign = '+';
        long num = 0;
        for (int i = 0; i < s.size(); ++i) {
            char c = s[i];
            if (isdigit(c)) num = num * 10 + (c - '0');
            if ((!isdigit(c) && c != ' ') || i == s.size() - 1) {
                if (sign == '+') st.push(num);
                else if (sign == '-') st.push(-num);
                else if (sign == '*') {
                    int top = st.top(); st.pop();
                    st.push(top * num);
                } else if (sign == '/') {
                    int top = st.top(); st.pop();
                    st.push(top / num);
                }
                sign = c;
                num = 0;
            }
        }
        int sum = 0;
        while (!st.empty()) { sum += st.top(); st.pop(); }
        return sum;
    }
};`
  },
  {
    id: 'lc-224',
    lcNumber: 224,
    title: 'Basic Calculator',
    topic: 'stack',
    topicName: 'Stack',
    difficulty: 'Hard',
    slug: 'basic-calculator',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    keyIntuition: 'Manage signs and parenthetical scopes. On \'(\', push running result and sign to stack. On \')\', pop and apply sign.',
    cppTip: 'Unifies unary plus/minus with running sum.',
    codeSnippet: `class Solution {
public:
    int calculate(string s) {
        stack<int> st;
        int result = 0, num = 0, sign = 1;
        for (char c : s) {
            if (isdigit(c)) {
                num = num * 10 + (c - '0');
            } else if (c == '+') {
                result += sign * num;
                num = 0;
                sign = 1;
            } else if (c == '-') {
                result += sign * num;
                num = 0;
                sign = -1;
            } else if (c == '(') {
                st.push(result);
                st.push(sign);
                result = 0;
                sign = 1;
            } else if (c == ')') {
                result += sign * num;
                num = 0;
                result *= st.top(); st.pop();
                result += st.top(); st.pop();
            }
        }
        result += sign * num;
        return result;
    }
};`
  },
  {
    id: 'lc-456',
    lcNumber: 456,
    title: '132 Pattern',
    topic: 'stack',
    topicName: 'Stack',
    difficulty: 'Medium',
    slug: '132-pattern',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    keyIntuition: 'Iterate backwards. Keep candidate "2" (third value). Monotonic stack keeps candidate "3". If nums[i] < third, we found "1" < "2" < "3".',
    cppTip: 'Traversing right-to-left simplifies tracking the third element.',
    codeSnippet: `class Solution {
public:
    bool find132pattern(vector<int>& nums) {
        int third = INT_MIN;
        stack<int> st;
        for (int i = nums.size() - 1; i >= 0; --i) {
            if (nums[i] < third) return true;
            while (!st.empty() && nums[i] > st.top()) {
                third = st.top(); st.pop();
            }
            st.push(nums[i]);
        }
        return false;
    }
};`
  },
  {
    id: 'lc-716',
    lcNumber: 716,
    title: 'Max Stack',
    topic: 'stack',
    topicName: 'Stack',
    difficulty: 'Hard',
    slug: 'max-stack',
    timeComplexity: 'O(log N) popMax',
    spaceComplexity: 'O(N)',
    keyIntuition: 'Maintain a doubly linked list for chronological order and a std::map for value-to-node-iterators to retrieve/remove max in O(log N).',
    cppTip: 'std::list::erase with std::map is optimal for O(1) list node removal.',
    codeSnippet: `class MaxStack {
    list<int> dll;
    map<int, vector<list<int>::iterator>> mp;
public:
    MaxStack() {}
    void push(int x) {
        dll.push_front(x);
        mp[x].push_back(dll.begin());
    }
    int pop() {
        int val = dll.front();
        dll.pop_front();
        mp[val].pop_back();
        if (mp[val].empty()) mp.erase(val);
        return val;
    }
    int top() { return dll.front(); }
    int peekMax() { return mp.rbegin()->first; }
    int popMax() {
        int val = mp.rbegin()->first;
        auto it = mp[val].back();
        mp[val].pop_back();
        if (mp[val].empty()) mp.erase(val);
        dll.erase(it);
        return val;
    }
};`
  },

  // ==================== 4. QUEUE ====================
  {
    id: 'lc-232',
    lcNumber: 232,
    title: 'Implement Queue using Stacks',
    topic: 'queue',
    topicName: 'Queue',
    difficulty: 'Easy',
    slug: 'implement-queue-using-stacks',
    timeComplexity: 'O(1) amortized',
    spaceComplexity: 'O(N)',
    keyIntuition: 'Two stacks: inStack and outStack. Push to inStack. Pop from outStack; if outStack is empty, transfer all from inStack.',
    cppTip: 'Use std::stack for containers. Transfer elements only on-demand.',
    codeSnippet: `class MyQueue {
    stack<int> inSt, outSt;
    void transfer() {
        if (outSt.empty()) {
            while (!inSt.empty()) {
                outSt.push(inSt.top());
                inSt.pop();
            }
        }
    }
public:
    MyQueue() {}
    void push(int x) { inSt.push(x); }
    int pop() { transfer(); int x = outSt.top(); outSt.pop(); return x; }
    int peek() { transfer(); return outSt.top(); }
    bool empty() { return inSt.empty() && outSt.empty(); }
};`
  },
  {
    id: 'lc-225',
    lcNumber: 225,
    title: 'Implement Stack using Queues',
    topic: 'queue',
    topicName: 'Queue',
    difficulty: 'Easy',
    slug: 'implement-stack-using-queues',
    timeComplexity: 'O(N) push, O(1) pop',
    spaceComplexity: 'O(N)',
    keyIntuition: 'Using a single std::queue: push new element, then rotate previous q.size() elements to the back.',
    cppTip: 'Single queue rotation avoids needing two separate queues.',
    codeSnippet: `class MyStack {
    queue<int> q;
public:
    MyStack() {}
    void push(int x) {
        q.push(x);
        int sz = q.size();
        for (int i = 0; i < sz - 1; ++i) {
            q.push(q.front());
            q.pop();
        }
    }
    int pop() { int x = q.front(); q.pop(); return x; }
    int top() { return q.front(); }
    bool empty() { return q.empty(); }
};`
  },
  {
    id: 'lc-933',
    lcNumber: 933,
    title: 'Number of Recent Calls',
    topic: 'queue',
    topicName: 'Queue',
    difficulty: 'Easy',
    slug: 'number-of-recent-calls',
    timeComplexity: 'O(1) amortized',
    spaceComplexity: 'O(W)',
    keyIntuition: 'Push current timestamp t to queue. While q.front() < t - 3000, pop old pings. Return q.size().',
    cppTip: 'Standard FIFO queue efficiently expires timestamps outside the 3000ms window.',
    codeSnippet: `class RecentCounter {
    queue<int> q;
public:
    RecentCounter() {}
    int ping(int t) {
        q.push(t);
        while (q.front() < t - 3000) q.pop();
        return q.size();
    }
};`
  },
  {
    id: 'lc-622',
    lcNumber: 622,
    title: 'Design Circular Queue',
    topic: 'queue',
    topicName: 'Queue',
    difficulty: 'Medium',
    slug: 'design-circular-queue',
    timeComplexity: 'O(1) all ops',
    spaceComplexity: 'O(K)',
    keyIntuition: 'Use fixed array with head, count, and capacity. Enqueue writes at (head + count) % cap. Dequeue advances head.',
    cppTip: 'Tracking `count` directly simplifies empty vs full condition.',
    codeSnippet: `class MyCircularQueue {
    vector<int> data;
    int head = 0, count = 0, cap;
public:
    MyCircularQueue(int k) : data(k), cap(k) {}
    bool enQueue(int value) {
        if (isFull()) return false;
        data[(head + count) % cap] = value;
        count++;
        return true;
    }
    bool deQueue() {
        if (isEmpty()) return false;
        head = (head + 1) % cap;
        count--;
        return true;
    }
    int Front() { return isEmpty() ? -1 : data[head]; }
    int Rear() { return isEmpty() ? -1 : data[(head + count - 1) % cap]; }
    bool isEmpty() { return count == 0; }
    bool isFull() { return count == cap; }
};`
  },
  {
    id: 'lc-641',
    lcNumber: 641,
    title: 'Design Circular Deque',
    topic: 'queue',
    topicName: 'Queue',
    difficulty: 'Medium',
    slug: 'design-circular-deque',
    timeComplexity: 'O(1) all ops',
    spaceComplexity: 'O(K)',
    keyIntuition: 'Double-ended circular ring buffer. Wrap indices using modulo arithmetic: (head - 1 + cap) % cap for insertFront.',
    cppTip: 'Modulo arithmetic guarantees indices remain valid within [0, cap - 1].',
    codeSnippet: `class MyCircularDeque {
    vector<int> data;
    int head = 0, count = 0, cap;
public:
    MyCircularDeque(int k) : data(k), cap(k) {}
    bool insertFront(int value) {
        if (isFull()) return false;
        head = (head - 1 + cap) % cap;
        data[head] = value;
        count++;
        return true;
    }
    bool insertLast(int value) {
        if (isFull()) return false;
        data[(head + count) % cap] = value;
        count++;
        return true;
    }
    bool deleteFront() {
        if (isEmpty()) return false;
        head = (head + 1) % cap;
        count--;
        return true;
    }
    bool deleteLast() {
        if (isEmpty()) return false;
        count--;
        return true;
    }
    int getFront() { return isEmpty() ? -1 : data[head]; }
    int getRear() { return isEmpty() ? -1 : data[(head + count - 1) % cap]; }
    bool isEmpty() { return count == 0; }
    bool isFull() { return count == cap; }
};`
  },
  {
    id: 'lc-346',
    lcNumber: 346,
    title: 'Moving Average from Data Stream',
    topic: 'queue',
    topicName: 'Queue',
    difficulty: 'Easy',
    slug: 'moving-average-from-data-stream',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(size)',
    keyIntuition: 'Maintain running sum and sliding window queue. If queue exceeds size, subtract front from running sum and pop.',
    cppTip: 'std::queue<int> provides clean O(1) front eviction.',
    codeSnippet: `class MovingAverage {
    queue<int> q;
    int maxSize;
    double sum = 0.0;
public:
    MovingAverage(int size) : maxSize(size) {}
    double next(int val) {
        q.push(val);
        sum += val;
        if (q.size() > maxSize) {
            sum -= q.front();
            q.pop();
        }
        return sum / q.size();
    }
};`
  },
  {
    id: 'lc-102',
    lcNumber: 102,
    title: 'Binary Tree Level Order Traversal',
    topic: 'queue',
    topicName: 'Queue',
    difficulty: 'Medium',
    slug: 'binary-tree-level-order-traversal',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    keyIntuition: 'Standard BFS using std::queue<TreeNode*>. In each level, get int sz = q.size() and loop sz times.',
    cppTip: 'Snapshot queue size (int sz = q.size()) to cleanly delimit levels.',
    codeSnippet: `class Solution {
public:
    vector<vector<int>> levelOrder(TreeNode* root) {
        if (!root) return {};
        vector<vector<int>> ans;
        queue<TreeNode*> q;
        q.push(root);
        while (!q.empty()) {
            int sz = q.size();
            vector<int> level;
            for (int i = 0; i < sz; ++i) {
                TreeNode* node = q.front(); q.pop();
                level.push_back(node->val);
                if (node->left) q.push(node->left);
                if (node->right) q.push(node->right);
            }
            ans.push_back(level);
        }
        return ans;
    }
};`
  },
  {
    id: 'lc-994',
    lcNumber: 994,
    title: 'Rotting Oranges',
    topic: 'queue',
    topicName: 'Queue',
    difficulty: 'Medium',
    slug: 'rotting-oranges',
    timeComplexity: 'O(M * N)',
    spaceComplexity: 'O(M * N)',
    keyIntuition: 'Multi-source BFS: push all initially rotten oranges into queue. Spread rot level by level, decrementing fresh count.',
    cppTip: 'Multi-source BFS starts simultaneously from all initial sources.',
    codeSnippet: `class Solution {
public:
    int orangesRotting(vector<vector<int>>& grid) {
        int m = grid.size(), n = grid[0].size(), fresh = 0;
        queue<pair<int, int>> q;
        for (int i = 0; i < m; ++i) {
            for (int j = 0; j < n; ++j) {
                if (grid[i][j] == 2) q.push({i, j});
                else if (grid[i][j] == 1) fresh++;
            }
        }
        if (fresh == 0) return 0;
        int minutes = 0;
        const int dirs[4][2] = {{0,1}, {0,-1}, {1,0}, {-1,0}};
        while (!q.empty() && fresh > 0) {
            int sz = q.size();
            minutes++;
            for (int k = 0; k < sz; ++k) {
                auto [r, c] = q.front(); q.pop();
                for (auto& d : dirs) {
                    int nr = r + d[0], nc = c + d[1];
                    if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] == 1) {
                        grid[nr][nc] = 2;
                        fresh--;
                        q.push({nr, nc});
                    }
                }
            }
        }
        return fresh == 0 ? minutes : -1;
    }
};`
  },
  {
    id: 'lc-542',
    lcNumber: 542,
    title: '01 Matrix',
    topic: 'queue',
    topicName: 'Queue',
    difficulty: 'Medium',
    slug: '01-matrix',
    timeComplexity: 'O(M * N)',
    spaceComplexity: 'O(M * N)',
    keyIntuition: 'Multi-source BFS: push all cells with value 0 to queue with dist 0. Cells with 1 are initialized to -1 (unvisited).',
    cppTip: 'Propagating outwards from all 0s guarantees shortest distance.',
    codeSnippet: `class Solution {
public:
    vector<vector<int>> updateMatrix(vector<vector<int>>& mat) {
        int m = mat.size(), n = mat[0].size();
        vector<vector<int>> dist(m, vector<int>(n, -1));
        queue<pair<int, int>> q;
        for (int i = 0; i < m; ++i) {
            for (int j = 0; j < n; ++j) {
                if (mat[i][j] == 0) {
                    dist[i][j] = 0;
                    q.push({i, j});
                }
            }
        }
        const int dirs[4][2] = {{1,0}, {-1,0}, {0,1}, {0,-1}};
        while (!q.empty()) {
            auto [r, c] = q.front(); q.pop();
            for (auto& d : dirs) {
                int nr = r + d[0], nc = c + d[1];
                if (nr >= 0 && nr < m && nc >= 0 && nc < n && dist[nr][nc] == -1) {
                    dist[nr][nc] = dist[r][c] + 1;
                    q.push({nr, nc});
                }
            }
        }
        return dist;
    }
};`
  },
  {
    id: 'lc-127',
    lcNumber: 127,
    title: 'Word Ladder',
    topic: 'queue',
    topicName: 'Queue',
    difficulty: 'Hard',
    slug: 'word-ladder',
    timeComplexity: 'O(M² * N)',
    spaceComplexity: 'O(M * N)',
    keyIntuition: 'Shortest path BFS where each node is a word. From current word, mutate each character \'a\'-\'z\' and check against wordSet.',
    cppTip: 'Erase word from wordSet once visited to avoid separate visited set.',
    codeSnippet: `class Solution {
public:
    int ladderLength(string beginWord, string endWord, vector<string>& wordList) {
        unordered_set<string> dict(wordList.begin(), wordList.end());
        if (!dict.count(endWord)) return 0;
        queue<string> q;
        q.push(beginWord);
        int steps = 1;
        while (!q.empty()) {
            int sz = q.size();
            for (int i = 0; i < sz; ++i) {
                string word = q.front(); q.pop();
                if (word == endWord) return steps;
                for (int j = 0; j < word.size(); ++j) {
                    char orig = word[j];
                    for (char c = 'a'; c <= 'z'; ++c) {
                        word[j] = c;
                        if (dict.count(word)) {
                            dict.erase(word);
                            q.push(word);
                        }
                    }
                    word[j] = orig;
                }
            }
            steps++;
        }
        return 0;
    }
};`
  },
  {
    id: 'lc-1091',
    lcNumber: 1091,
    title: 'Shortest Path in Binary Matrix',
    topic: 'queue',
    topicName: 'Queue',
    difficulty: 'Medium',
    slug: 'shortest-path-in-binary-matrix',
    timeComplexity: 'O(N²)',
    spaceComplexity: 'O(N²)',
    keyIntuition: '8-directional BFS in an N x N grid. Mark grid[r][c] = 1 immediately upon queueing to prevent duplicate additions.',
    cppTip: 'Check start grid[0][0] == 0 and end grid[n-1][n-1] == 0 first.',
    codeSnippet: `class Solution {
public:
    int shortestPathBinaryMatrix(vector<vector<int>>& grid) {
        int n = grid.size();
        if (grid[0][0] != 0 || grid[n-1][n-1] != 0) return -1;
        queue<pair<int, int>> q;
        q.push({0, 0});
        grid[0][0] = 1; // track distance directly
        const int dirs[8][2] = {{-1,-1},{-1,0},{-1,1},{0,-1},{0,1},{1,-1},{1,0},{1,1}};
        while (!q.empty()) {
            auto [r, c] = q.front(); q.pop();
            int d = grid[r][c];
            if (r == n - 1 && c == n - 1) return d;
            for (auto& dir : dirs) {
                int nr = r + dir[0], nc = c + dir[1];
                if (nr >= 0 && nr < n && nc >= 0 && nc < n && grid[nr][nc] == 0) {
                    grid[nr][nc] = d + 1;
                    q.push({nr, nc});
                }
            }
        }
        return -1;
    }
};`
  },
  {
    id: 'lc-239',
    lcNumber: 239,
    title: 'Sliding Window Maximum',
    topic: 'queue',
    topicName: 'Queue',
    difficulty: 'Hard',
    slug: 'sliding-window-maximum',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(K)',
    keyIntuition: 'Monotonic decreasing std::deque storing indices. Evict smaller elements from back before pushing. Evict out-of-window index from front.',
    cppTip: 'Use std::deque for sliding window maximum to push and pop from both ends in O(1).',
    codeSnippet: `class Solution {
public:
    vector<int> maxSlidingWindow(vector<int>& nums, int k) {
        deque<int> dq;
        vector<int> res;
        for (int i = 0; i < nums.size(); ++i) {
            if (!dq.empty() && dq.front() == i - k) dq.pop_front();
            while (!dq.empty() && nums[dq.back()] < nums[i]) dq.pop_back();
            dq.push_back(i);
            if (i >= k - 1) res.push_back(nums[dq.front()]);
        }
        return res;
    }
};`
  },
  {
    id: 'lc-1438',
    lcNumber: 1438,
    title: 'Longest Continuous Subarray With Absolute Diff Less Than or Equal to Limit',
    topic: 'queue',
    topicName: 'Queue',
    difficulty: 'Medium',
    slug: 'longest-continuous-subarray-with-absolute-diff-less-than-or-equal-to-limit',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    keyIntuition: 'Maintain two deques: one minDeque and one maxDeque for the current window. While max - min > limit, advance left pointer.',
    cppTip: 'Two deques yield O(1) amortized window min/max lookups without multiset O(N log N).',
    codeSnippet: `class Solution {
public:
    int longestSubarray(vector<int>& nums, int limit) {
        deque<int> maxDq, minDq;
        int l = 0, res = 0;
        for (int r = 0; r < nums.size(); ++r) {
            while (!maxDq.empty() && maxDq.back() < nums[r]) maxDq.pop_back();
            while (!minDq.empty() && minDq.back() > nums[r]) minDq.pop_back();
            maxDq.push_back(nums[r]);
            minDq.push_back(nums[r]);
            while (maxDq.front() - minDq.front() > limit) {
                if (maxDq.front() == nums[l]) maxDq.pop_front();
                if (minDq.front() == nums[l]) minDq.pop_front();
                l++;
            }
            res = max(res, r - l + 1);
        }
        return res;
    }
};`
  },

  // ==================== 5. BINARY TREE ====================
  {
    id: 'lc-144',
    lcNumber: 144,
    title: 'Binary Tree Preorder Traversal',
    topic: 'binary-tree',
    topicName: 'Binary Tree',
    difficulty: 'Easy',
    slug: 'binary-tree-preorder-traversal',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(H)',
    keyIntuition: 'Visit node (root), then traverse left subtree, then right subtree. Iterative version uses an explicit stack.',
    cppTip: 'For trees, write the recursive version first, then the iterative one with an explicit stack.',
    codeSnippet: `class Solution {
public:
    vector<int> preorderTraversal(TreeNode* root) {
        vector<int> res;
        stack<TreeNode*> st;
        if (root) st.push(root);
        while (!st.empty()) {
            TreeNode* node = st.top(); st.pop();
            res.push_back(node->val);
            if (node->right) st.push(node->right);
            if (node->left) st.push(node->left);
        }
        return res;
    }
};`
  },
  {
    id: 'lc-94',
    lcNumber: 94,
    title: 'Binary Tree Inorder Traversal',
    topic: 'binary-tree',
    topicName: 'Binary Tree',
    difficulty: 'Easy',
    slug: 'binary-tree-inorder-traversal',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(H)',
    keyIntuition: 'Traverse left, visit node, traverse right. Iterative: drill left pushing to stack; when null, pop, visit, go right.',
    cppTip: 'Use explicit stack with while(curr || !st.empty()) for standard non-recursive inorder.',
    codeSnippet: `class Solution {
public:
    vector<int> inorderTraversal(TreeNode* root) {
        vector<int> res;
        stack<TreeNode*> st;
        TreeNode* curr = root;
        while (curr != nullptr || !st.empty()) {
            while (curr != nullptr) {
                st.push(curr);
                curr = curr->left;
            }
            curr = st.top(); st.pop();
            res.push_back(curr->val);
            curr = curr->right;
        }
        return res;
    }
};`
  },
  {
    id: 'lc-145',
    lcNumber: 145,
    title: 'Binary Tree Postorder Traversal',
    topic: 'binary-tree',
    topicName: 'Binary Tree',
    difficulty: 'Easy',
    slug: 'binary-tree-postorder-traversal',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(H)',
    keyIntuition: 'Left, Right, Root. Trick: Preorder is Root, Left, Right; modify to Root, Right, Left, then reverse result!',
    cppTip: 'Reverse of modified preorder produces clean postorder without complex state flags.',
    codeSnippet: `class Solution {
public:
    vector<int> postorderTraversal(TreeNode* root) {
        vector<int> res;
        stack<TreeNode*> st;
        if (root) st.push(root);
        while (!st.empty()) {
            TreeNode* node = st.top(); st.pop();
            res.push_back(node->val);
            if (node->left) st.push(node->left);
            if (node->right) st.push(node->right);
        }
        reverse(res.begin(), res.end());
        return res;
    }
};`
  },
  {
    id: 'lc-104',
    lcNumber: 104,
    title: 'Maximum Depth of Binary Tree',
    topic: 'binary-tree',
    topicName: 'Binary Tree',
    difficulty: 'Easy',
    slug: 'maximum-depth-of-binary-tree',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(H)',
    keyIntuition: 'Depth of current node is 1 + max(depth(left), depth(right)). Base case: null node has depth 0.',
    cppTip: 'Prefer nullptr check over sentinel values.',
    codeSnippet: `class Solution {
public:
    int maxDepth(TreeNode* root) {
        if (!root) return 0;
        return 1 + max(maxDepth(root->left), maxDepth(root->right));
    }
};`
  },
  {
    id: 'lc-111',
    lcNumber: 111,
    title: 'Minimum Depth of Binary Tree',
    topic: 'binary-tree',
    topicName: 'Binary Tree',
    difficulty: 'Easy',
    slug: 'minimum-depth-of-binary-tree',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(H)',
    keyIntuition: 'If one child is null, minimum depth must traverse the existing non-null child. If both exist, min(left, right) + 1.',
    cppTip: 'BFS finds minimum depth immediately at the first leaf node encountered.',
    codeSnippet: `class Solution {
public:
    int minDepth(TreeNode* root) {
        if (!root) return 0;
        if (!root->left) return 1 + minDepth(root->right);
        if (!root->right) return 1 + minDepth(root->left);
        return 1 + min(minDepth(root->left), minDepth(root->right));
    }
};`
  },
  {
    id: 'lc-100',
    lcNumber: 100,
    title: 'Same Tree',
    topic: 'binary-tree',
    topicName: 'Binary Tree',
    difficulty: 'Easy',
    slug: 'same-tree',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(H)',
    keyIntuition: 'Both null -> true. One null -> false. Values differ -> false. Recurse on left && right.',
    cppTip: 'Base conditions cleanly resolve tree structural equality.',
    codeSnippet: `class Solution {
public:
    bool isSameTree(TreeNode* p, TreeNode* q) {
        if (!p && !q) return true;
        if (!p || !q) return false;
        if (p->val != q->val) return false;
        return isSameTree(p->left, q->left) && isSameTree(p->right, q->right);
    }
};`
  },
  {
    id: 'lc-101',
    lcNumber: 101,
    title: 'Symmetric Tree',
    topic: 'binary-tree',
    topicName: 'Binary Tree',
    difficulty: 'Easy',
    slug: 'symmetric-tree',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(H)',
    keyIntuition: 'Helper check(t1, t2): t1->val == t2->val && check(t1->left, t2->right) && check(t1->right, t2->left).',
    cppTip: 'Compare mirrored subtrees (left against right, and right against left).',
    codeSnippet: `class Solution {
public:
    bool isMirror(TreeNode* t1, TreeNode* t2) {
        if (!t1 && !t2) return true;
        if (!t1 || !t2) return false;
        return (t1->val == t2->val) &&
               isMirror(t1->left, t2->right) &&
               isMirror(t1->right, t2->left);
    }
    bool isSymmetric(TreeNode* root) {
        return isMirror(root, root);
    }
};`
  },
  {
    id: 'lc-226',
    lcNumber: 226,
    title: 'Invert Binary Tree',
    topic: 'binary-tree',
    topicName: 'Binary Tree',
    difficulty: 'Easy',
    slug: 'invert-binary-tree',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(H)',
    keyIntuition: 'Swap root->left and root->right, then recursively invert both subtrees.',
    cppTip: 'std::swap(root->left, root->right) makes this a 3-line function.',
    codeSnippet: `class Solution {
public:
    TreeNode* invertTree(TreeNode* root) {
        if (!root) return nullptr;
        swap(root->left, root->right);
        invertTree(root->left);
        invertTree(root->right);
        return root;
    }
};`
  },
  {
    id: 'lc-110',
    lcNumber: 110,
    title: 'Balanced Binary Tree',
    topic: 'binary-tree',
    topicName: 'Binary Tree',
    difficulty: 'Easy',
    slug: 'balanced-binary-tree',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(H)',
    keyIntuition: 'Bottom-up height calculation. If any subtree height difference > 1, return -1 to signal imbalance early.',
    cppTip: 'Bottom-up prevents O(N²) repeated depth calculations.',
    codeSnippet: `class Solution {
public:
    int checkHeight(TreeNode* node) {
        if (!node) return 0;
        int leftH = checkHeight(node->left);
        if (leftH == -1) return -1;
        int rightH = checkHeight(node->right);
        if (rightH == -1) return -1;
        if (abs(leftH - rightH) > 1) return -1;
        return 1 + max(leftH, rightH);
    }
    bool isBalanced(TreeNode* root) {
        return checkHeight(root) != -1;
    }
};`
  },
  {
    id: 'lc-543',
    lcNumber: 543,
    title: 'Diameter of Binary Tree',
    topic: 'binary-tree',
    topicName: 'Binary Tree',
    difficulty: 'Easy',
    slug: 'diameter-of-binary-tree',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(H)',
    keyIntuition: 'At each node, the longest path passing through it is leftDepth + rightDepth. Update global diameter and return 1 + max(left, right).',
    cppTip: 'Pass diameter by reference or use class member variable.',
    codeSnippet: `class Solution {
    int maxDiameter = 0;
    int height(TreeNode* node) {
        if (!node) return 0;
        int lh = height(node->left);
        int rh = height(node->right);
        maxDiameter = max(maxDiameter, lh + rh);
        return 1 + max(lh, rh);
    }
public:
    int diameterOfBinaryTree(TreeNode* root) {
        height(root);
        return maxDiameter;
    }
};`
  },
  {
    id: 'lc-199',
    lcNumber: 199,
    title: 'Binary Tree Right Side View',
    topic: 'binary-tree',
    topicName: 'Binary Tree',
    difficulty: 'Medium',
    slug: 'binary-tree-right-side-view',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(H)',
    keyIntuition: 'DFS visiting root -> right -> left. If current depth == res.size(), this is the first rightmost node at this level.',
    cppTip: 'Visiting right child before left child gives O(H) stack space with no queue needed.',
    codeSnippet: `class Solution {
    void dfs(TreeNode* node, int depth, vector<int>& res) {
        if (!node) return;
        if (depth == res.size()) res.push_back(node->val);
        dfs(node->right, depth + 1, res);
        dfs(node->left, depth + 1, res);
    }
public:
    vector<int> rightSideView(TreeNode* root) {
        vector<int> res;
        dfs(root, 0, res);
        return res;
    }
};`
  },
  {
    id: 'lc-112',
    lcNumber: 112,
    title: 'Path Sum',
    topic: 'binary-tree',
    topicName: 'Binary Tree',
    difficulty: 'Easy',
    slug: 'path-sum',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(H)',
    keyIntuition: 'Subtract root->val from targetSum. If at a leaf node and targetSum == 0, return true; else recurse on children.',
    cppTip: 'Be sure to verify leaf condition: !root->left && !root->right.',
    codeSnippet: `class Solution {
public:
    bool hasPathSum(TreeNode* root, int targetSum) {
        if (!root) return false;
        targetSum -= root->val;
        if (!root->left && !root->right) return targetSum == 0;
        return hasPathSum(root->left, targetSum) || hasPathSum(root->right, targetSum);
    }
};`
  },
  {
    id: 'lc-113',
    lcNumber: 113,
    title: 'Path Sum II',
    topic: 'binary-tree',
    topicName: 'Binary Tree',
    difficulty: 'Medium',
    slug: 'path-sum-ii',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(H)',
    keyIntuition: 'Backtracking: maintain a current path vector. Push node->val, recurse, if leaf and sum matches record path, then pop_back().',
    cppTip: 'Pass currentPath vector by reference and backtrack with pop_back() to avoid copying.',
    codeSnippet: `class Solution {
    void dfs(TreeNode* node, int sum, vector<int>& path, vector<vector<int>>& res) {
        if (!node) return;
        path.push_back(node->val);
        sum -= node->val;
        if (!node->left && !node->right && sum == 0) {
            res.push_back(path);
        } else {
            dfs(node->left, sum, path, res);
            dfs(node->right, sum, path, res);
        }
        path.pop_back();
    }
public:
    vector<vector<int>> pathSum(TreeNode* root, int targetSum) {
        vector<vector<int>> res;
        vector<int> path;
        dfs(root, targetSum, path, res);
        return res;
    }
};`
  },
  {
    id: 'lc-437',
    lcNumber: 437,
    title: 'Path Sum III',
    topic: 'binary-tree',
    topicName: 'Binary Tree',
    difficulty: 'Medium',
    slug: 'path-sum-iii',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(H)',
    keyIntuition: 'Prefix sum hash map on tree traversal: count how many ancestor prefix sums equal (currSum - targetSum). Backtrack map count on exit.',
    cppTip: 'Use long for currSum to avoid 32-bit signed integer overflow on deep trees.',
    codeSnippet: `class Solution {
    unordered_map<long, int> prefix;
    int count = 0;
    void dfs(TreeNode* node, long currSum, int targetSum) {
        if (!node) return;
        currSum += node->val;
        if (prefix.count(currSum - targetSum)) {
            count += prefix[currSum - targetSum];
        }
        prefix[currSum]++;
        dfs(node->left, currSum, targetSum);
        dfs(node->right, currSum, targetSum);
        prefix[currSum]--;
    }
public:
    int pathSum(TreeNode* root, int targetSum) {
        prefix[0] = 1;
        dfs(root, 0, targetSum);
        return count;
    }
};`
  },
  {
    id: 'lc-572',
    lcNumber: 572,
    title: 'Subtree of Another Tree',
    topic: 'binary-tree',
    topicName: 'Binary Tree',
    difficulty: 'Easy',
    slug: 'subtree-of-another-tree',
    timeComplexity: 'O(N * M)',
    spaceComplexity: 'O(H)',
    keyIntuition: 'For each node in main tree, check if isSameTree(root, subRoot). If not, recurse on root->left or root->right.',
    cppTip: 'Helper isSameTree reusable from LC 100.',
    codeSnippet: `class Solution {
    bool isSame(TreeNode* s, TreeNode* t) {
        if (!s && !t) return true;
        if (!s || !t || s->val != t->val) return false;
        return isSame(s->left, t->left) && isSame(s->right, t->right);
    }
public:
    bool isSubtree(TreeNode* root, TreeNode* subRoot) {
        if (!root) return false;
        if (isSame(root, subRoot)) return true;
        return isSubtree(root->left, subRoot) || isSubtree(root->right, subRoot);
    }
};`
  },
  {
    id: 'lc-114',
    lcNumber: 114,
    title: 'Flatten Binary Tree to Linked List',
    topic: 'binary-tree',
    topicName: 'Binary Tree',
    difficulty: 'Medium',
    slug: 'flatten-binary-tree-to-linked-list',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    keyIntuition: 'Morris traversal variation: for current node with left child, find the rightmost node of left subtree, attach current right subtree there, move left to right.',
    cppTip: 'Achieves true O(1) space with pointer rewiring.',
    codeSnippet: `class Solution {
public:
    void flatten(TreeNode* root) {
        TreeNode* curr = root;
        while (curr) {
            if (curr->left) {
                TreeNode* prev = curr->left;
                while (prev->right) prev = prev->right;
                prev->right = curr->right;
                curr->right = curr->left;
                curr->left = nullptr;
            }
            curr = curr->right;
        }
    }
};`
  },
  {
    id: 'lc-105',
    lcNumber: 105,
    title: 'Construct Binary Tree from Preorder and Inorder Traversal',
    topic: 'binary-tree',
    topicName: 'Binary Tree',
    difficulty: 'Medium',
    slug: 'construct-binary-tree-from-preorder-and-inorder-traversal',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    keyIntuition: 'Preorder root is first element. Find root in inorder using hash map to partition left and right subtrees. Recurse.',
    cppTip: 'Unordered_map for inorder index lookup avoids O(N) linear scans.',
    codeSnippet: `class Solution {
    unordered_map<int, int> inMap;
    int preIdx = 0;
    TreeNode* build(const vector<int>& pre, int inStart, int inEnd) {
        if (inStart > inEnd) return nullptr;
        int rootVal = pre[preIdx++];
        TreeNode* root = new TreeNode(rootVal);
        int mid = inMap[rootVal];
        root->left = build(pre, inStart, mid - 1);
        root->right = build(pre, mid + 1, inEnd);
        return root;
    }
public:
    TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {
        for (int i = 0; i < inorder.size(); ++i) inMap[inorder[i]] = i;
        return build(preorder, 0, inorder.size() - 1);
    }
};`
  },
  {
    id: 'lc-106',
    lcNumber: 106,
    title: 'Construct Binary Tree from Inorder and Postorder Traversal',
    topic: 'binary-tree',
    topicName: 'Binary Tree',
    difficulty: 'Medium',
    slug: 'construct-binary-tree-from-inorder-and-postorder-traversal',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    keyIntuition: 'Postorder root is last element. Build right subtree first before left subtree since postorder ends with right-root.',
    cppTip: 'Decrement postIdx and build right child before left child.',
    codeSnippet: `class Solution {
    unordered_map<int, int> inMap;
    int postIdx;
    TreeNode* build(const vector<int>& post, int inStart, int inEnd) {
        if (inStart > inEnd) return nullptr;
        int rootVal = post[postIdx--];
        TreeNode* root = new TreeNode(rootVal);
        int mid = inMap[rootVal];
        root->right = build(post, mid + 1, inEnd);
        root->left = build(post, inStart, mid - 1);
        return root;
    }
public:
    TreeNode* buildTree(vector<int>& inorder, vector<int>& postorder) {
        postIdx = postorder.size() - 1;
        for (int i = 0; i < inorder.size(); ++i) inMap[inorder[i]] = i;
        return build(postorder, 0, inorder.size() - 1);
    }
};`
  },
  {
    id: 'lc-236',
    lcNumber: 236,
    title: 'Lowest Common Ancestor of a Binary Tree',
    topic: 'binary-tree',
    topicName: 'Binary Tree',
    difficulty: 'Medium',
    slug: 'lowest-common-ancestor-of-a-binary-tree',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(H)',
    keyIntuition: 'If root is p or q or null, return root. Recurse left and right. If both return non-null, root is LCA; otherwise return non-null one.',
    cppTip: 'Bottom-up bubbling returns pointer directly.',
    codeSnippet: `class Solution {
public:
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        if (!root || root == p || root == q) return root;
        TreeNode* left = lowestCommonAncestor(root->left, p, q);
        TreeNode* right = lowestCommonAncestor(root->right, p, q);
        if (left && right) return root;
        return left ? left : right;
    }
};`
  },
  {
    id: 'lc-124',
    lcNumber: 124,
    title: 'Binary Tree Maximum Path Sum',
    topic: 'binary-tree',
    topicName: 'Binary Tree',
    difficulty: 'Hard',
    slug: 'binary-tree-maximum-path-sum',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(H)',
    keyIntuition: 'At each node, compute max gain from left and right (clamped to 0). Update globalMax with node->val + leftGain + rightGain. Return node->val + max(leftGain, rightGain).',
    cppTip: 'Clamp negative gains with max(0, gain).',
    codeSnippet: `class Solution {
    int maxSum = INT_MIN;
    int maxGain(TreeNode* node) {
        if (!node) return 0;
        int leftG = max(0, maxGain(node->left));
        int rightG = max(0, maxGain(node->right));
        maxSum = max(maxSum, node->val + leftG + rightG);
        return node->val + max(leftG, rightG);
    }
public:
    int maxPathSum(TreeNode* root) {
        maxGain(root);
        return maxSum;
    }
};`
  },
  {
    id: 'lc-297',
    lcNumber: 297,
    title: 'Serialize and Deserialize Binary Tree',
    topic: 'binary-tree',
    topicName: 'Binary Tree',
    difficulty: 'Hard',
    slug: 'serialize-and-deserialize-binary-tree',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    keyIntuition: 'Preorder traversal with "#" for null nodes and delimiter ",". Deserialization reconstructs tree from stringstream.',
    cppTip: 'stringstream with getline(ss, val, \',\') reconstructs recursive preorder cleanly.',
    codeSnippet: `class Codec {
    void serializeDfs(TreeNode* root, string& out) {
        if (!root) { out += "#,"; return; }
        out += to_string(root->val) + ",";
        serializeDfs(root->left, out);
        serializeDfs(root->right, out);
    }
    TreeNode* deserializeDfs(stringstream& ss) {
        string val;
        if (!getline(ss, val, ',')) return nullptr;
        if (val == "#") return nullptr;
        TreeNode* node = new TreeNode(stoi(val));
        node->left = deserializeDfs(ss);
        node->right = deserializeDfs(ss);
        return node;
    }
public:
    string serialize(TreeNode* root) {
        string out = "";
        serializeDfs(root, out);
        return out;
    }
    TreeNode* deserialize(string data) {
        stringstream ss(data);
        return deserializeDfs(ss);
    }
};`
  },
  {
    id: 'lc-987',
    lcNumber: 987,
    title: 'Vertical Order Traversal of a Binary Tree',
    topic: 'binary-tree',
    topicName: 'Binary Tree',
    difficulty: 'Hard',
    slug: 'vertical-order-traversal-of-a-binary-tree',
    timeComplexity: 'O(N log N)',
    spaceComplexity: 'O(N)',
    keyIntuition: 'Map column -> row -> multiset<int> values. Group all values by col in increasing order, then row, then value.',
    cppTip: 'map<int, map<int, multiset<int>>> automatically preserves required sort orders.',
    codeSnippet: `class Solution {
    map<int, map<int, multiset<int>>> nodes;
    void dfs(TreeNode* node, int col, int row) {
        if (!node) return;
        nodes[col][row].insert(node->val);
        dfs(node->left, col - 1, row + 1);
        dfs(node->right, col + 1, row + 1);
    }
public:
    vector<vector<int>> verticalTraversal(TreeNode* root) {
        dfs(root, 0, 0);
        vector<vector<int>> ans;
        for (auto& [col, rowMap] : nodes) {
            vector<int> colVals;
            for (auto& [row, vals] : rowMap) {
                colVals.insert(colVals.end(), vals.begin(), vals.end());
            }
            ans.push_back(colVals);
        }
        return ans;
    }
};`
  },

  // ==================== 6. BINARY SEARCH TREE (BST) ====================
  {
    id: 'lc-700',
    lcNumber: 700,
    title: 'Search in a Binary Search Tree',
    topic: 'bst',
    topicName: 'Binary Search Tree',
    difficulty: 'Easy',
    slug: 'search-in-a-binary-search-tree',
    timeComplexity: 'O(H)',
    spaceComplexity: 'O(1)',
    keyIntuition: 'If target < root->val, search left; if target > root->val, search right; if equal, return root.',
    cppTip: 'Iterative while loop avoids recursion stack overhead.',
    codeSnippet: `class Solution {
public:
    TreeNode* searchBST(TreeNode* root, int val) {
        while (root && root->val != val) {
            root = (val < root->val) ? root->left : root->right;
        }
        return root;
    }
};`
  },
  {
    id: 'lc-701',
    lcNumber: 701,
    title: 'Insert into a Binary Search Tree',
    topic: 'bst',
    topicName: 'Binary Search Tree',
    difficulty: 'Medium',
    slug: 'insert-into-a-binary-search-tree',
    timeComplexity: 'O(H)',
    spaceComplexity: 'O(1)',
    keyIntuition: 'Navigate left or right until reaching null position, then attach new TreeNode(val).',
    cppTip: 'Pointer-to-pointer or return-pointer recursion both write cleanly.',
    codeSnippet: `class Solution {
public:
    TreeNode* insertIntoBST(TreeNode* root, int val) {
        if (!root) return new TreeNode(val);
        if (val < root->val) root->left = insertIntoBST(root->left, val);
        else root->right = insertIntoBST(root->right, val);
        return root;
    }
};`
  },
  {
    id: 'lc-98',
    lcNumber: 98,
    title: 'Validate Binary Search Tree',
    topic: 'bst',
    topicName: 'Binary Search Tree',
    difficulty: 'Medium',
    slug: 'validate-binary-search-tree',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(H)',
    keyIntuition: 'Each node must fall strictly between (minVal, maxVal). Pass lower and upper bounds, updated as we descend.',
    cppTip: 'Use long long or TreeNode* pointers to prevent overflow with INT_MIN / INT_MAX.',
    codeSnippet: `class Solution {
    bool validate(TreeNode* node, long minVal, long maxVal) {
        if (!node) return true;
        if (node->val <= minVal || node->val >= maxVal) return false;
        return validate(node->left, minVal, node->val) &&
               validate(node->right, node->val, maxVal);
    }
public:
    bool isValidBST(TreeNode* root) {
        return validate(root, LONG_MIN, LONG_MAX);
    }
};`
  },
  {
    id: 'lc-530',
    lcNumber: 530,
    title: 'Minimum Absolute Difference in BST',
    topic: 'bst',
    topicName: 'Binary Search Tree',
    difficulty: 'Easy',
    slug: 'minimum-absolute-difference-in-bst',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(H)',
    keyIntuition: 'In-order traversal visits values in strictly sorted ascending order. Maintain prevNode and check (curr - prev) at each step.',
    cppTip: 'In-order of a BST is sorted, reducing search to adjacent difference checks.',
    codeSnippet: `class Solution {
    int minDiff = INT_MAX;
    TreeNode* prev = nullptr;
    void inorder(TreeNode* root) {
        if (!root) return;
        inorder(root->left);
        if (prev) minDiff = min(minDiff, root->val - prev->val);
        prev = root;
        inorder(root->right);
    }
public:
    int getMinimumDifference(TreeNode* root) {
        inorder(root);
        return minDiff;
    }
};`
  },
  {
    id: 'lc-501',
    lcNumber: 501,
    title: 'Find Mode in Binary Search Tree',
    topic: 'bst',
    topicName: 'Binary Search Tree',
    difficulty: 'Easy',
    slug: 'find-mode-in-binary-search-tree',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1) auxiliary',
    keyIntuition: 'In-order traversal keeps equal values contiguous. Track currCount, maxCount, and record nodes matching maxCount.',
    cppTip: 'Can be done in two passes (first find maxCount, second populate modes) for O(1) extra space.',
    codeSnippet: `class Solution {
    int maxCount = 0, currCount = 0;
    TreeNode* prev = nullptr;
    vector<int> modes;
    void handle(int val) {
        if (prev && prev->val == val) currCount++;
        else currCount = 1;
        if (currCount > maxCount) {
            maxCount = currCount;
            modes = {val};
        } else if (currCount == maxCount) {
            modes.push_back(val);
        }
    }
    void inorder(TreeNode* root) {
        if (!root) return;
        inorder(root->left);
        handle(root->val);
        prev = root;
        inorder(root->right);
    }
public:
    vector<int> findMode(TreeNode* root) {
        inorder(root);
        return modes;
    }
};`
  },
  {
    id: 'lc-230',
    lcNumber: 230,
    title: 'Kth Smallest Element in a BST',
    topic: 'bst',
    topicName: 'Binary Search Tree',
    difficulty: 'Medium',
    slug: 'kth-smallest-element-in-a-bst',
    timeComplexity: 'O(H + K)',
    spaceComplexity: 'O(H)',
    keyIntuition: 'In-order traversal. Decrement k when visiting node. When k == 0, return current value immediately.',
    cppTip: 'Early stopping when k == 0 avoids traversing the rest of the tree.',
    codeSnippet: `class Solution {
    int ans = -1;
    void inorder(TreeNode* root, int& k) {
        if (!root || k <= 0) return;
        inorder(root->left, k);
        if (--k == 0) {
            ans = root->val;
            return;
        }
        inorder(root->right, k);
    }
public:
    int kthSmallest(TreeNode* root, int k) {
        inorder(root, k);
        return ans;
    }
};`
  },
  {
    id: 'lc-235',
    lcNumber: 235,
    title: 'Lowest Common Ancestor of a Binary Search Tree',
    topic: 'bst',
    topicName: 'Binary Search Tree',
    difficulty: 'Medium',
    slug: 'lowest-common-ancestor-of-a-binary-search-tree',
    timeComplexity: 'O(H)',
    spaceComplexity: 'O(1)',
    keyIntuition: 'If both p and q values are smaller than root, LCA is in left subtree. If both larger, in right subtree. Otherwise root is the split point (LCA).',
    cppTip: 'O(1) space iterative solution runs in milliseconds.',
    codeSnippet: `class Solution {
public:
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        while (root) {
            if (p->val < root->val && q->val < root->val) root = root->left;
            else if (p->val > root->val && q->val > root->val) root = root->right;
            else return root;
        }
        return nullptr;
    }
};`
  },
  {
    id: 'lc-108',
    lcNumber: 108,
    title: 'Convert Sorted Array to Binary Search Tree',
    topic: 'bst',
    topicName: 'Binary Search Tree',
    difficulty: 'Easy',
    slug: 'convert-sorted-array-to-binary-search-tree',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(log N)',
    keyIntuition: 'Pick middle element mid = (l + r) / 2 as root. Recursively construct left child from (l, mid-1) and right child from (mid+1, r).',
    cppTip: 'Always picking the middle guarantees height-balanced BST.',
    codeSnippet: `class Solution {
    TreeNode* build(const vector<int>& nums, int l, int r) {
        if (l > r) return nullptr;
        int mid = l + (r - l) / 2;
        TreeNode* root = new TreeNode(nums[mid]);
        root->left = build(nums, l, mid - 1);
        root->right = build(nums, mid + 1, r);
        return root;
    }
public:
    TreeNode* sortedArrayToBST(vector<int>& nums) {
        return build(nums, 0, nums.size() - 1);
    }
};`
  },
  {
    id: 'lc-538',
    lcNumber: 538,
    title: 'Convert BST to Greater Tree',
    topic: 'bst',
    topicName: 'Binary Search Tree',
    difficulty: 'Medium',
    slug: 'convert-bst-to-greater-tree',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(H)',
    keyIntuition: 'Reverse in-order traversal (Right -> Root -> Left). Accumulate running sum and set root->val = runningSum.',
    cppTip: 'Visiting right subtree first visits elements in strictly descending order.',
    codeSnippet: `class Solution {
    int sum = 0;
    void reverseInorder(TreeNode* root) {
        if (!root) return;
        reverseInorder(root->right);
        sum += root->val;
        root->val = sum;
        reverseInorder(root->left);
    }
public:
    TreeNode* convertBST(TreeNode* root) {
        reverseInorder(root);
        return root;
    }
};`
  },
  {
    id: 'lc-1038',
    lcNumber: 1038,
    title: 'Binary Search Tree to Greater Sum Tree',
    topic: 'bst',
    topicName: 'Binary Search Tree',
    difficulty: 'Medium',
    slug: 'binary-search-tree-to-greater-sum-tree',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(H)',
    keyIntuition: 'Identical to LC 538: reverse in-order traversal (Right, Root, Left) maintaining cumulative sum.',
    cppTip: 'Reuses same algorithm with zero extra allocations.',
    codeSnippet: `class Solution {
    int sum = 0;
public:
    TreeNode* bstToGst(TreeNode* root) {
        if (!root) return nullptr;
        bstToGst(root->right);
        sum += root->val;
        root->val = sum;
        bstToGst(root->left);
        return root;
    }
};`
  },
  {
    id: 'lc-653',
    lcNumber: 653,
    title: 'Two Sum IV - Input is a BST',
    topic: 'bst',
    topicName: 'Binary Search Tree',
    difficulty: 'Easy',
    slug: 'two-sum-iv-input-is-a-bst',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    keyIntuition: 'Traverse BST while tracking seen values in an unordered_set. If (k - root->val) exists in set, return true.',
    cppTip: 'Can also be solved with two BST iterators (forward and backward) in O(H) space.',
    codeSnippet: `class Solution {
    unordered_set<int> seen;
public:
    bool findTarget(TreeNode* root, int k) {
        if (!root) return false;
        if (seen.count(k - root->val)) return true;
        seen.insert(root->val);
        return findTarget(root->left, k) || findTarget(root->right, k);
    }
};`
  },
  {
    id: 'lc-173',
    lcNumber: 173,
    title: 'BST Iterator',
    topic: 'bst',
    topicName: 'Binary Search Tree',
    difficulty: 'Medium',
    slug: 'binary-search-tree-iterator',
    timeComplexity: 'O(1) amortized next, O(1) hasNext',
    spaceComplexity: 'O(H)',
    keyIntuition: 'Controlled in-order traversal using an explicit stack of left nodes. Next() pops node and pushes all left descendants of node->right.',
    cppTip: 'Amortized O(1) time per next() because each node is pushed and popped at most once.',
    codeSnippet: `class BSTIterator {
    stack<TreeNode*> st;
    void pushLeft(TreeNode* node) {
        while (node) {
            st.push(node);
            node = node->left;
        }
    }
public:
    BSTIterator(TreeNode* root) {
        pushLeft(root);
    }
    int next() {
        TreeNode* top = st.top(); st.pop();
        pushLeft(top->right);
        return top->val;
    }
    bool hasNext() {
        return !st.empty();
    }
};`
  },
  {
    id: 'lc-450',
    lcNumber: 450,
    title: 'Delete Node in a BST',
    topic: 'bst',
    topicName: 'Binary Search Tree',
    difficulty: 'Medium',
    slug: 'delete-node-in-a-bst',
    timeComplexity: 'O(H)',
    spaceComplexity: 'O(H)',
    keyIntuition: 'If node has 0 or 1 child, replace with child. If 2 children, replace with in-order successor (min node in right subtree) and delete successor.',
    cppTip: 'Free or avoid leaking nodes. Cleanly delete target node in real C++.',
    codeSnippet: `class Solution {
    TreeNode* findMin(TreeNode* node) {
        while (node->left) node = node->left;
        return node;
    }
public:
    TreeNode* deleteNode(TreeNode* root, int key) {
        if (!root) return nullptr;
        if (key < root->val) {
            root->left = deleteNode(root->left, key);
        } else if (key > root->val) {
            root->right = deleteNode(root->right, key);
        } else {
            if (!root->left) {
                TreeNode* right = root->right;
                delete root;
                return right;
            } else if (!root->right) {
                TreeNode* left = root->left;
                delete root;
                return left;
            }
            TreeNode* successor = findMin(root->right);
            root->val = successor->val;
            root->right = deleteNode(root->right, successor->val);
        }
        return root;
    }
};`
  },
  {
    id: 'lc-99',
    lcNumber: 99,
    title: 'Recover Binary Search Tree',
    topic: 'bst',
    topicName: 'Binary Search Tree',
    difficulty: 'Medium',
    slug: 'recover-binary-search-tree',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(H)',
    keyIntuition: 'In-order traversal finds the two swapped nodes where prev->val > curr->val. Swap their values back after traversal.',
    cppTip: 'First swapped element is the first occurrence of prev; second swapped is the last occurrence of curr.',
    codeSnippet: `class Solution {
    TreeNode *first = nullptr, *second = nullptr, *prev = nullptr;
    void inorder(TreeNode* root) {
        if (!root) return;
        inorder(root->left);
        if (prev && prev->val > root->val) {
            if (!first) first = prev;
            second = root;
        }
        prev = root;
        inorder(root->right);
    }
public:
    void recoverTree(TreeNode* root) {
        inorder(root);
        if (first && second) swap(first->val, second->val);
    }
};`
  }
];
