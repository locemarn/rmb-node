export class UserEntity {
  constructor(
    public readonly id: number,
    public readonly username: string,
    public readonly email: string,
    public readonly password: string,
    public readonly role:
      | 'superuser'
      | 'admin'
      | 'reader'
      | 'editor'
      | 'tester',
    public readonly created_at?: Date,
    public readonly updated_at?: Date | null
  ) {}
}
