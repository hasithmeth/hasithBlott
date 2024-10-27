const messaging = {
  requestPermission: jest.fn(),
  hasPermission: jest.fn(() => Promise.resolve(true)),
  getToken: jest.fn(() => Promise.resolve('mocked-token')),
  onMessage: jest.fn(),
  onNotificationOpenedApp: jest.fn(),
  getInitialNotification: jest.fn(),
};

export default () => messaging;
export { messaging };
