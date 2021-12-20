export class Result<T> {
  private _isSuccess: boolean;
  private _isFailure: boolean;
  private _value: T | undefined;
  private _error: string;

  private constructor(
    isSuccess: boolean,
    error = '',
    value: T | undefined = undefined,
  ) {
    if (isSuccess && error) {
      throw new Error(`InvalidOperation: A result cannot be
        successful and contain an error`);
    }

    if (!isSuccess && !error) {
      throw new Error(`InvalidOperation: A failing result
        needs to contain an error message`);
    }

    this._isSuccess = isSuccess;
    this._isFailure = !isSuccess;
    this._error = error;
    this._value = value;

    Object.freeze(this);
  }

  public get isSuccess(): boolean {
    return this._isSuccess;
  }

  public get isFailure(): boolean {
    return this._isFailure;
  }

  public get value(): T | undefined {
    return this._value;
  }

  public get error(): string {
    return this._error;
  }

  public static ok<U>(value?: U): Result<U> {
    return new Result<U>(true, '', value);
  }

  public static fail<U>(error: string): Result<U> {
    return new Result<U>(false, error, undefined);
  }

  public static combine(results: Result<any>[]): Result<any> {
    for (const result of results) {
      if (result.isFailure) return result;
    }
    return Result.ok<any>();
  }
}
