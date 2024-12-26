let logBuffer = [];
export default class Logger {
  /**
   * Log info message
   * @param {string} message Message to log
   */
  static info(message) {
    const msg = `[INFO] ${new Date().toLocaleTimeString()} : ${message}`;
    console.log(msg);
    logBuffer.push(msg);
  }

  /**
   * Log warning message
   * @param {string} message Message to log
   */
  static warn(message) {
    const msg = `[WARN] ${new Date().toLocaleTimeString()} : ${message}`;
    console.log(msg);
    logBuffer.push(msg);
  }

  /**
   * Log error message
   * @param {string} message Message to log
   */
  static error(message) {
    const msg = `[ERROR] ${new Date().toLocaleTimeString()} : ${message}`;
    console.log(msg);
    logBuffer.push(msg);
    throw new Error(msg);
  }
};
