// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// export const fetchIssues = createAsyncThunk(
//   'issues/fetchIssues',
//   async (repoUrl, { rejectWithValue }) => {
//     const match = repoUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);

//     if (!match) {
//       return rejectWithValue("Invalid GitHub repository URL. Example: https://github.com/facebook/react");
//     }

//     const [, owner, repo] = match;

//     try {
//       const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues`);

//       if (!response.ok) {
//         throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
//       }

//       const data = await response.json();
//       return { data, owner, repo };
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const issuesSlice = createSlice({
//   name: 'issues',
//   initialState: {
//     data: [],
//     owner: "",
//     repo: "",
//     error: ""
//   },
//   reducers: {
//     updateIssueState: (state, action) => {
//       const { issueId, newState } = action.payload;
//       const issueIndex = state.data.findIndex((issue) => issue.id === issueId);
//       if (issueIndex === -1) return;
//       state.data = state.data.map(issue =>
//         issue.id === issueId
//           ? {
//               ...issue,
//               state: newState === "Done" ? "closed" : "open",
//               assignee: newState === "In Progress" ? "assigned" : null,
//             }
//           : issue
//       );
//     },
//    reorderIssues: (state, action) => {
//       const { sourceIndex, destinationIndex, column } = action.payload;

//       // Отримуємо всі елементи поточної колонки
//       const columnIssues = state.data
//         .filter((issue) => {
//           if (column === "ToDo") return issue.state === "open" && !issue.assignee;
//           if (column === "In Progress") return issue.state === "open" && issue.assignee;
//           if (column === "Done") return issue.state === "closed";
//           return false;
//         });

//       // Якщо індекси виходять за межі масиву, нічого не робимо
//       if (
//         sourceIndex < 0 ||
//         destinationIndex < 0 ||
//         sourceIndex >= columnIssues.length ||
//         destinationIndex >= columnIssues.length
//       ) {
//         return;
//       }

//       // Знаходимо ID елементу, який потрібно перемістити
//       const movedIssue = columnIssues[sourceIndex];

//       // Видаляємо елемент з поточної позиції
//       state.data = state.data.filter((issue) => issue.id !== movedIssue.id);

//       // Додаємо елемент у нову позицію
//       columnIssues.splice(sourceIndex, 1);
//       columnIssues.splice(destinationIndex, 0, movedIssue);

//       // Оновлюємо порядок у state.data
//       state.data = [...state.data, ...columnIssues];
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(fetchIssues.fulfilled, (state, action) => {
//       state.data = action.payload.data;
//       state.owner = action.payload.owner;
//       state.repo = action.payload.repo;
//       state.error = "";
//     })
//     .addCase(fetchIssues.rejected, (state, action) => {
//       state.error = action.payload;
//     });
//   },
// });

// export const { reorderIssues, updateIssueState } = issuesSlice.actions;
// export default issuesSlice.reducer;


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchIssues = createAsyncThunk(
  'issues/fetchIssues',
  async (repoUrl, { rejectWithValue }) => {
    const match = repoUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);

    if (!match) {
      return rejectWithValue("Invalid GitHub repository URL. Example: https://github.com/facebook/react");
    }

    const [, owner, repo] = match;

    try {
      const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues`);

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return { data, owner, repo };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const issuesSlice = createSlice({
  name: "issues",
  initialState: {
    data: [],
    order: {
      ToDo: [],
      "In Progress": [],
      Done: [],
    },
    owner: "",
    repo: "",
    error: "",
  },
  reducers: {
    
    updateIssueState: (state, action) => {
      const { issueId, newState, index } = action.payload;
      const issueIndex = state.data.findIndex((issue) => issue.id === issueId);
      if (issueIndex === -1) return;

      const issue = state.data[issueIndex];

      // Видаляємо з поточної колонки
      Object.keys(state.order).forEach((column) => {
        state.order[column] = state.order[column].filter((id) => id !== issueId);
      });

      // Додаємо в нову колонку на потрібну позицію
      if (newState === "Done") {
        issue.state = "closed";
        state.order.Done.splice(index, 0, issueId);
      } else if (newState === "In Progress") {
        issue.state = "open";
        issue.assignee = "assigned";
        state.order["In Progress"].splice(index, 0, issueId);
      } else {
        issue.state = "open";
        issue.assignee = null;
        state.order.ToDo.splice(index, 0, issueId);
      }
    },

    reorderIssues: (state, action) => {
      const { sourceIndex, destinationIndex, column } = action.payload;

      if (!state.order[column]) return;

      const columnIssues = [...state.order[column]];
      const [movedIssue] = columnIssues.splice(sourceIndex, 1);
      columnIssues.splice(destinationIndex, 0, movedIssue);

      state.order[column] = columnIssues;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchIssues.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.owner = action.payload.owner;
      state.repo = action.payload.repo;
      state.error = "";

      // Ініціалізуємо порядок
      state.order = {
        ToDo: action.payload.data
          .filter((issue) => issue.state === "open" && !issue.assignee)
          .map((issue) => issue.id),
        "In Progress": action.payload.data
          .filter((issue) => issue.state === "open" && issue.assignee)
          .map((issue) => issue.id),
        Done: action.payload.data
          .filter((issue) => issue.state === "closed")
          .map((issue) => issue.id),
      };
    });

    builder.addCase(fetchIssues.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export const { reorderIssues, updateIssueState } = issuesSlice.actions;
export default issuesSlice.reducer;
