/**
 * Foundation for Lokker's structured error handling.
 *
 * Rules (see AGENTS.md / DEVELOPER.md):
 * - Throw a class that extends AppError, never a bare string or plain object.
 * - `message` is for developers and logs; it must never contain secrets
 *   (passwords, key material, vault contents).
 * - `userMessage` is the only text safe to render to end users.
 * - Never swallow errors: either handle them meaningfully or rethrow.
 *
 * This is deliberately small. Grow it only when real error categories emerge.
 */
export class AppError extends Error {
  /**
   * @param {string} message   Developer-facing description, safe for logs.
   * @param {object} [options]
   * @param {string} [options.code]      Stable machine-readable error code.
   * @param {string} [options.userMessage] End-user-safe message. Defaults to a
   *   generic string so internal details never leak by accident.
   * @param {unknown} [options.cause]    Original error, preserved for logs.
   */
  constructor(message, { code = "APP_ERROR", userMessage, cause } = {}) {
    super(message, { cause });
    this.name = new.target.name;
    this.code = code;
    this.userMessage = userMessage ?? "Something went wrong. Please try again.";
  }
}
