// src/types/global.d.ts
interface Window {
  ethereum?: {
    request: (args: { method: string; params?: any[] }) => Promise<any>;
    removeAllListeners?: () => void;
    on: (event: string, callback: (...args: any[]) => void) => void;
  };
}