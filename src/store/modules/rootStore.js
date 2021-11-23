const rootStore = {
  namespaced: true,
  state: {
    showLoginModal: false,
  },
  getters: {},
  mutations: {
    //// SET_SHOW_LOGIN_MODAL(state, response) {
    ////state.showLoginModal = response;
    SET_TRIGGER_LOGIN_MODAL(state) {
      //? issue CODE03 - 그냥 true로만 계속 설정하면 엄청 꼬인다 -> 이렇게 toggle 방식으로 변경 (computed에 무조건 걸려야 함)
      state.showLoginModal = !state.showLoginModal;
    },
  },
  actions: {},
};

export default rootStore;
