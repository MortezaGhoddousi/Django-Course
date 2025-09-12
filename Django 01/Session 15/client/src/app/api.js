const api = "http://localhost:8000";

function toPersianNumber(num) {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return num
        .toString()
        .split("")
        .map((c) => {
            if (/\d/.test(c)) {
                return persianDigits[c];
            } else {
                return c;
            }
        })
        .join("");
}

export { api, toPersianNumber };
