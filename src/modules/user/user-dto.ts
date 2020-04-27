export class CreateUserDto {
  readonly name: string;
  readonly phone: number;
}

export class CreateUserMsgDto {
  readonly success: boolean;
  readonly result: object;
}