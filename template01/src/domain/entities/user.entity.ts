// services/identity-service/src/domain/entities/user.entity.ts
export class User {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly role: string,
    private passwordHash: string
  ) {}

  // Lógica de negócio: validar se a senha é forte, etc.
  public static create(email: string, pass: string, role: string) {
    // validações aqui...
    return new User(crypto.randomUUID(), email, role, pass);
  }
}