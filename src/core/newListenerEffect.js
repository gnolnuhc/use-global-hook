import { cleanUpListener } from "./cleanUpListener";

export const newListenerEffect = (store, mapState, originalHook) => () => {
  const newListener = { oldState: mapState ? mapState(store.state) : store.state };
  newListener.run = mapState
    ? (newState) => {
      const mappedState = mapState(newState);
      if (mappedState !== newListener.oldState) {
        newListener.oldState = mappedState;
        originalHook(mappedState);
      }
    }
    : originalHook;
  store.listeners.push(newListener);
  return cleanUpListener(store, newListener);
};
