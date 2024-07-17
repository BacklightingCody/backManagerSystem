export const getDate = (n?: string): string => {
    let date: Date;

    if (n) {
        date = new Date(n);
    } else {
        date = new Date();
    }

    const datePart = date.toISOString().substr(0, 10); // 获取 YYYY-MM-DD
    const timePart = date.toISOString().substr(11, 8); // 获取 HH:MM:SS

    return datePart.replace(/-/g, "-") + " " + timePart;
};

// console.log(getDate('2024-06-17T05:40:05.000Z')); // 输出 2024-06-17 05:40:05
