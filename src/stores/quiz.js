import { defineStore, acceptHMRUpdate } from 'pinia'

export const useQuizStore = defineStore('quiz', {
  state: () => ({
    quizInfo: { theme: null, difficult: null },
    userInfo: { name: '', quizzes: [] }
  }),
  actions: {
    SET_USER_INFO(payload) {
      this.userInfo.name = payload
      localStorage.setItem('quizUserInfo', JSON.stringify(this.userInfo))
    },
    SET_USER_QUIZ(payload) {
      this.userInfo.quizzes.push(payload)
      localStorage.setItem('quizUserInfo', JSON.stringify(this.userInfo))
    },
    RESET_USER_INFO() {
      this.userInfo.name = ''
      this.userInfo.quizzes = []
      localStorage.removeItem('quizUserInfo')
    },
    SET_THEME(payload) {
      this.quizInfo.theme = payload
    },
    SET_DIFFICULT(payload) {
      this.quizInfo.difficult = payload
    }
  },
  getters: {
    $quizInfo: (state) => state.quizInfo,
    $userInfo: (state) =>
      state.userInfo.name ? state.userInfo : JSON.parse(localStorage.getItem('quizUserInfo'))
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useQuizStore, import.meta.url))
}
