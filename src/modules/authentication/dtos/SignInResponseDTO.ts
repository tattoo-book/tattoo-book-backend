export class SignInResponseDTO {
  accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  static create(token: string) {
    return new SignInResponseDTO(token);
  }
}
