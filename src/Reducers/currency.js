const CurrencyReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_CURRENCY":
      return { ...state, ...action.currency };

    default:
      return state;
  }
};
export { CurrencyReducer };
