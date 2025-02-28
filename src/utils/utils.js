// src/utils.js
export function safeParseJSON(data, defaultValue) {
    if (typeof data === "string") {
        try {
            const parsed = JSON.parse(data);
            return Array.isArray(parsed) ? parsed : defaultValue;
        } catch (error) {
            console.error("Lỗi parse JSON:", error);
            return defaultValue;
        }
    }
    return Array.isArray(data) ? data : defaultValue;
}
