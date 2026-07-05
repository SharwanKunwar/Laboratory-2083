package com.unpredictable.practice.DeathNoteBackend.login.helper;

import java.util.UUID;

/**
 * Utility class for UUID-related helper methods.
 */
public class UserHelper {

    /**
     * Converts a String representation of a UUID into a UUID object.
     *
     * Example:
     * Input  : "123e4567-e89b-12d3-a456-426614174000"
     * Output : UUID object
     *
     * @param uuid String containing a valid UUID.
     * @return UUID object.
     * @throws IllegalArgumentException if the provided string is not a valid UUID.
     */
    public static UUID parseUUID(String uuid) {
        return UUID.fromString(uuid);
    }
}