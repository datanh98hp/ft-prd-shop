const queueConfig = {
  removeOnComplete:
    process.env.QUEUE_REMOVE_ONCOMPLETE==='true' ? true : false || false,
  delay: parseInt(process.env.QUEUE_DELAY) || 1000 * 3,
  lifo: parseInt(process.env.QUEUE_LIFO) || true,
  priority: parseInt(process.env.QUEUE_PRIORITY) || 3,
};

export default queueConfig;
