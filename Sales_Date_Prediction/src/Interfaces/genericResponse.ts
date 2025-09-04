export interface GenericResponse<T> {
  data: T;
  statusCode: number;
}