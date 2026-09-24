/**
 *  Reusable getById function with any type <T>
 */

export const getById = <T extends { id: string }>(dataSet: readonly T[],id: string,): T | undefined =>{
 return dataSet.find((item) => item.id === id);
}