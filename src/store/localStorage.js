export const loadState = () => {
  try {
    const serializeState = localStorage.getItem('state');
    if(serializeState === null) {
      return undefined;
    }
    return JSON.parse(serializeState);
  }catch (err) {
    console.log('Load state err: ', err);
  }
};

export const saveState = state => {
  try {
    const serializeState = JSON.stringify(state);
    localStorage.setItem('state', serializeState);
  }catch (err) {
    console.log('Save state err', err);
  }
}
