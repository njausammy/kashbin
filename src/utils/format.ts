export const formatPhoneNumber = (phoneNumber?: string): string => {
    if (!phoneNumber) return ''
    // Remove all non-numeric characters
    const cleaned = phoneNumber.replace(/\D/g, '');

    // Check if the cleaned phone number is valid
    if (cleaned.length < 9) {
        // Return original input if it's too short to be a valid phone number
        return phoneNumber;
    }

    // Format according to specific pattern
    const countryCode = cleaned.substring(0, 3); // +254
    const firstGroup = cleaned.substring(3, 6);  // 724
    const secondGroup = cleaned.substring(6, 8); // 53
    const thirdGroup = cleaned.substring(8, 10); // 24
    const fourthGroup = cleaned.substring(10, 12); // 98

    // Join the parts with spaces to form the final formatted number
    const formattedNumber = `+${countryCode} ${firstGroup} ${secondGroup} ${thirdGroup} ${fourthGroup}`;

    return formattedNumber;
};
