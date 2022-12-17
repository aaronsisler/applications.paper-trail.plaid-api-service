const getMethodStartTime = () => new Date(Date.now());

const methodProcessTime = (methodName: string, startTime: Date) => {
  const endTime = new Date(Date.now());
  const methodProcessTime: number = endTime.getTime() - startTime.getTime();

  console.log(`PERF:${methodName}:RUNTIME:${methodProcessTime}ms`);
};
export { getMethodStartTime, methodProcessTime };
