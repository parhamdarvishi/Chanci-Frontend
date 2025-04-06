import cookie from "@shared/helpers/cookie";
import { VOLUNTEER } from "@shared/helpers/cookie/types";

/**
 * Check if the current user is a volunteer
 * @returns {boolean | null} true if user is a volunteer, false if not, null if cookie is not available
 */
export const getUserIsVolunteer = (): string | null => {
  return cookie?.getCookie(VOLUNTEER);
};