export const requestPermissions = (callback: (result: any) => void) => {
  Notification.requestPermission(callback);
};
