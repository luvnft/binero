import { type ReactNode, createContext, useContext } from 'react';

export const SlotOutletContext = createContext<ReactNode>(null);

export function SlotOutlet() {
  return useContext(SlotOutletContext);
}
