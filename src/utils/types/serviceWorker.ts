type SyncManager = {
  register(tag: string): Promise<void>;
  getTags(): Promise<string[]>;
};

export type ServiceWorkerProps = {
  sync: SyncManager;
} & ServiceWorkerRegistration;
