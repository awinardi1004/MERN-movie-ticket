export type baseResponse<T> = {
  message: string
  data: T
  status: string
};