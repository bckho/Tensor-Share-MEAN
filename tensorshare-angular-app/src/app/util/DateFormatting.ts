export function getFullDateString(date: Date): string {
    return date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear();
}

export function getFullDateTimeString(date: Date): string {
    const fullDate = date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear();
    const timestamp = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    return fullDate + ' ' + timestamp;
}
