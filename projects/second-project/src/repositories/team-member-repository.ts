

export abstract class TeamMemberRepository {
  abstract create(name: string, memberFunction: string): Promise<void>;
}