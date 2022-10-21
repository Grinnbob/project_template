export class CreatePostDto {
  readonly title: string;
  readonly content: string;
  readonly userId: number; // get it from token and remove from here
}
