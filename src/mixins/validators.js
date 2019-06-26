export const validators = {
    // Wraps validation functions into local methods
    methods: {
        // Validates if a number is really a number
        isNumberValid (number) {
            // Check if number times 0 is 0 and return true
            if (number * 0 === 0) {
                return true
            }
            // If not, return false
            return false
        },

        // Validates if a string has a length bigger than 0
        isStringLengthValid (string) {
            // Check if string is undefined or not
            if (string) {
                // If length is bigger than 0 return true
                if (string.length > 0) {
                    return true
                }
            }
            // If not, return false
            return false
        },

        // Validates if object is undefined or not
        isObjectDefined (object) {
            // Check if object is undefined or not
            if (object) {
                // If it is defined, return true
                return true
            }
            // If not, return false
            return false
        },

        // Validates if both strings are equal
        areStringsEqual (string1, string2) {
            // Check if both strings exists
            if (string1 && string2) {
                // If they are equal, return true
                if (string1 === string2) {
                    return true
                }
            }
            // If not, return false
            return false
        }
    }
}
