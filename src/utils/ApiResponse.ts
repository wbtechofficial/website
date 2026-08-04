export class ApiResponse<T> {
  public readonly success: boolean;
  public readonly message: string;
  public readonly data: T;

  constructor(message: string, data: T) {
    this.success = true;
    this.message = message;
    this.data = data;
  }
}
