export enum SocialProvider {
  GOOGLE = "google",
  GITHUB = "github",
}

export interface SocialLogin {
  provider: SocialProvider;
}
