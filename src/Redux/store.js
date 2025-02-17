import { configureStore } from '@reduxjs/toolkit'
import issuesSreducer from '../Redux/issuesSlice'

const store = configureStore({
    reducer: {
      issues: issuesSreducer
  }
})

export default store;