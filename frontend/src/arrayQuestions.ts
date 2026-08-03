export interface ArrayQuestion {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  problemStatement: string;
  exampleInput: string;
  exampleOutput: string;
  explanation: string;
  timeComplexity: string;
  spaceComplexity: string;
  code: string;
}

export const arrayQuestions: ArrayQuestion[] = [
  {
    id: 'q1-reverse-array',
    title: '1. Reverse an Array',
    difficulty: 'Easy',
    problemStatement: 'Given an array of integers, reverse the elements of the array in-place.',
    exampleInput: 'arr[] = {1, 2, 3, 4, 5}',
    exampleOutput: 'Reversed Array: 5 4 3 2 1',
    explanation: 'We use a two-pointer technique. Place one pointer at the start (index 0) and one pointer at the end (index n-1). Swap the elements at these pointers and move them towards each other until start >= end.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
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
    id: 'q2-max-min-element',
    title: '2. Find Maximum and Minimum Element',
    difficulty: 'Easy',
    problemStatement: 'Find the maximum and minimum elements in an array with minimum number of comparisons.',
    exampleInput: 'arr[] = {1000, 11, 445, 1, 330, 3000}',
    exampleOutput: 'Min: 1, Max: 3000',
    explanation: 'Initialize min and max with the first element of the array. Traverse through the array from index 1 to N-1, updating min if the current element is smaller and max if it is larger.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    code: `#include <iostream>
using namespace std;

int main() {
    int arr[] = {1000, 11, 445, 1, 330, 3000};
    int n = 6;

    int minVal = arr[0];
    int maxVal = arr[0];

    for (int i = 1; i < n; i++) {
        if (arr[i] < minVal) minVal = arr[i];
        if (arr[i] > maxVal) maxVal = arr[i];
    }

    cout << "Minimum Element: " << minVal << endl;
    cout << "Maximum Element: " << maxVal << endl;

    return 0;
}`
  },
  {
    id: 'q3-kth-max-min',
    title: '3. Find Kth Smallest Element',
    difficulty: 'Medium',
    problemStatement: 'Find the Kth smallest element in an unsorted array of distinct integers.',
    exampleInput: 'arr[] = {7, 10, 4, 3, 20, 15}, K = 3',
    exampleOutput: 'Kth Smallest: 7',
    explanation: 'By sorting the array in non-decreasing order, the Kth smallest element will be situated at index K-1.',
    timeComplexity: 'O(N log N)',
    spaceComplexity: 'O(1)',
    code: `#include <iostream>
#include <algorithm>
using namespace std;

int main() {
    int arr[] = {7, 10, 4, 3, 20, 15};
    int n = 6;
    int k = 3;

    sort(arr, arr + n);

    cout << "Kth Smallest Element: " << arr[k - 1] << endl;

    return 0;
}`
  },
  {
    id: 'q4-sort-012',
    title: '4. Sort Array of 0s, 1s, and 2s',
    difficulty: 'Medium',
    problemStatement: 'Given an array containing only 0s, 1s, and 2s, sort the array in-place without using library sort.',
    exampleInput: 'arr[] = {0, 2, 1, 2, 0, 1}',
    exampleOutput: 'Sorted Array: 0 0 1 1 2 2',
    explanation: 'Uses the Dutch National Flag Algorithm with 3 pointers: low, mid, and high. If arr[mid] == 0, swap with arr[low] and increment low & mid. If 1, increment mid. If 2, swap with arr[high] and decrement high.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    code: `#include <iostream>
using namespace std;

int main() {
    int arr[] = {0, 2, 1, 2, 0, 1};
    int n = 6;

    int low = 0, mid = 0, high = n - 1;

    while (mid <= high) {
        if (arr[mid] == 0) {
            swap(arr[low], arr[mid]);
            low++;
            mid++;
        } else if (arr[mid] == 1) {
            mid++;
        } else {
            swap(arr[mid], arr[high]);
            high--;
        }
    }

    cout << "Sorted 0s, 1s, 2s: ";
    for (int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }

    return 0;
}`
  },
  {
    id: 'q5-move-negatives',
    title: '5. Move Negative Numbers to One Side',
    difficulty: 'Easy',
    problemStatement: 'Move all negative numbers to the beginning of the array without maintaining order.',
    exampleInput: 'arr[] = {-12, 11, -13, -5, 6, -7, 5, -3, 6}',
    exampleOutput: 'Partitioned Array: -12 -3 -13 -5 -7 6 5 11 6',
    explanation: 'Uses a two-pointer approach similar to quicksort partition. `j` keeps track of the boundary of negative numbers. Whenever a negative number is encountered, swap it with arr[j] and increment j.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    code: `#include <iostream>
using namespace std;

int main() {
    int arr[] = {-12, 11, -13, -5, 6, -7, 5, -3, 6};
    int n = 9;

    int j = 0;
    for (int i = 0; i < n; i++) {
        if (arr[i] < 0) {
            if (i != j) swap(arr[i], arr[j]);
            j++;
        }
    }

    cout << "Negatives Moved to Left: ";
    for (int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }

    return 0;
}`
  },
  {
    id: 'q6-union-two-arrays',
    title: '6. Union of Two Sorted Arrays',
    difficulty: 'Easy',
    problemStatement: 'Find the union of two sorted arrays containing unique elements.',
    exampleInput: 'arr1[] = {1, 2, 4, 5, 6}, arr2[] = {2, 3, 5, 7}',
    exampleOutput: 'Union: 1 2 3 4 5 6 7',
    explanation: 'Traverse both arrays using two pointers i and j. Print smaller element and increment pointer. If elements are equal, print once and increment both pointers.',
    timeComplexity: 'O(N + M)',
    spaceComplexity: 'O(1)',
    code: `#include <iostream>
using namespace std;

int main() {
    int arr1[] = {1, 2, 4, 5, 6};
    int arr2[] = {2, 3, 5, 7};
    int n = 5, m = 4;

    int i = 0, j = 0;
    cout << "Union of Arrays: ";
    while (i < n && j < m) {
        if (arr1[i] < arr2[j]) {
            cout << arr1[i++] << " ";
        } else if (arr2[j] < arr1[i]) {
            cout << arr2[j++] << " ";
        } else {
            cout << arr1[i++] << " ";
            j++;
        }
    }
    while (i < n) cout << arr1[i++] << " ";
    while (j < m) cout << arr2[j++] << " ";

    return 0;
}`
  },
  {
    id: 'q7-rotate-array-by-one',
    title: '7. Cyclically Rotate Array by One',
    difficulty: 'Easy',
    problemStatement: 'Given an array, cyclically rotate the array clockwise by one position.',
    exampleInput: 'arr[] = {1, 2, 3, 4, 5}',
    exampleOutput: 'Rotated Array: 5 1 2 3 4',
    explanation: 'Store the last element in a variable x. Shift all elements right by one index starting from index n-1 down to 1. Finally, assign x to index 0.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    code: `#include <iostream>
using namespace std;

int main() {
    int arr[] = {1, 2, 3, 4, 5};
    int n = 5;

    int last = arr[n - 1];
    for (int i = n - 1; i > 0; i--) {
        arr[i] = arr[i - 1];
    }
    arr[0] = last;

    cout << "Cyclically Rotated: ";
    for (int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }

    return 0;
}`
  },
  {
    id: 'q8-kadanes-algorithm',
    title: '8. Maximum Subarray Sum (Kadane\'s)',
    difficulty: 'Medium',
    problemStatement: 'Find the contiguous subarray with the maximum sum in an array of numbers.',
    exampleInput: 'arr[] = {-2, 1, -3, 4, -1, 2, 1, -5, 4}',
    exampleOutput: 'Maximum Subarray Sum: 6 (Subarray [4, -1, 2, 1])',
    explanation: 'Kadane\'s Algorithm maintains a running sum `currMax`. Add elements one by one. If `currMax` becomes negative, reset it to 0 because a negative sum will reduce future subarray totals.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    code: `#include <iostream>
using namespace std;

int main() {
    int arr[] = {-2, 1, -3, 4, -1, 2, 1, -5, 4};
    int n = 9;

    int maxSoFar = arr[0];
    int currMax = 0;

    for (int i = 0; i < n; i++) {
        currMax += arr[i];
        if (currMax > maxSoFar) maxSoFar = currMax;
        if (currMax < 0) currMax = 0;
    }

    cout << "Maximum Subarray Sum: " << maxSoFar << endl;

    return 0;
}`
  },
  {
    id: 'q9-minimize-heights',
    title: '9. Minimize the Maximum Difference',
    difficulty: 'Hard',
    problemStatement: 'Given heights of N towers and value K, increase or decrease each tower height by K to minimize max diff.',
    exampleInput: 'arr[] = {1, 15, 10}, K = 6',
    exampleOutput: 'Minimum Difference: 5',
    explanation: 'Sort the array. The initial diff is arr[n-1] - arr[0]. Traverse indices 1 to n-1: compare potential new minimum (arr[0] + k) and new maximum (arr[i-1] + k vs arr[n-1] - k).',
    timeComplexity: 'O(N log N)',
    spaceComplexity: 'O(1)',
    code: `#include <iostream>
#include <algorithm>
using namespace std;

int main() {
    int arr[] = {1, 15, 10};
    int n = 3, k = 6;

    sort(arr, arr + n);
    int ans = arr[n - 1] - arr[0];

    int smallest = arr[0] + k;
    int largest = arr[n - 1] - k;

    for (int i = 0; i < n - 1; i++) {
        int minH = min(smallest, arr[i + 1] - k);
        int maxH = max(largest, arr[i] + k);
        if (minH < 0) continue;
        ans = min(ans, maxH - minH);
    }

    cout << "Minimized Max Height Diff: " << ans << endl;

    return 0;
}`
  },
  {
    id: 'q10-min-jumps',
    title: '10. Minimum Jumps to Reach End',
    difficulty: 'Hard',
    problemStatement: 'Given an array where each element represents max jump length, find minimum jumps to reach the end.',
    exampleInput: 'arr[] = {1, 3, 5, 8, 9, 2, 6, 7, 6, 8, 9}',
    exampleOutput: 'Minimum Jumps: 3',
    explanation: 'Greedy approach maintaining `maxReach`, `steps`, and `jumps`. `maxReach` tracks furthest index reachable. When `steps` reach 0, increment `jumps` and re-fill `steps` with remaining distance.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    code: `#include <iostream>
#include <algorithm>
using namespace std;

int main() {
    int arr[] = {1, 3, 5, 8, 9, 2, 6, 7, 6, 8, 9};
    int n = 11;

    if (n <= 1) { cout << "Minimum Jumps: 0" << endl; return 0; }

    int maxReach = arr[0];
    int steps = arr[0];
    int jumps = 1;

    for (int i = 1; i < n - 1; i++) {
        maxReach = max(maxReach, i + arr[i]);
        steps--;

        if (steps == 0) {
            jumps++;
            if (i >= maxReach) { jumps = -1; break; }
            steps = maxReach - i;
        }
    }

    cout << "Minimum Jumps to End: " << jumps << endl;

    return 0;
}`
  }
];
