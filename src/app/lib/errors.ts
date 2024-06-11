export class SBINotExistError extends Error {
  constructor() {
    super("SBI not found");
    this.name = "SBINotExistError";
  }
}
