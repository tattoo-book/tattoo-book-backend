export class JwtConfig {
  static register() {
    return {
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    };
  }
}
