const logDbConnection = (host) => {
    console.log(`MongoDB connected to host: ${host}`);
  };
  
  const logError = (message, errorStack) => {
    console.error(message);
    console.error(errorStack);
  };
  
  module.exports = { logDbConnection, logError };