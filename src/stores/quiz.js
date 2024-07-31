import { defineStore, acceptHMRUpdate } from 'pinia'

export const useQuizStore = defineStore('quiz', {
  state: () => ({
    quizInfo: { theme: null, difficult: null }
  }),
  actions: {
    SET_THEME(payload) {
      console.log(payload, this.quizInfo)
      this.quizInfo.theme = payload
    },
    SET_DIFFICULT(payload) {
      this.quizInfo.difficult = payload
    }
  },
  getters: {
    $quizInfo: (state) => state.quizInfo
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useQuizStore, import.meta.url))
}
