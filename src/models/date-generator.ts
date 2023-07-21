export class DateGenerator {
    getDateWithTime(): string {
        const currentDate = new Date();

        const day = `${('0' + currentDate.getDate()).slice(-2)}`;
        const month = `${('0' + (currentDate.getMonth() + 1)).slice(-2)}`;
        const year = `${currentDate.getFullYear()}`;
        const hours = `${('0' + currentDate.getHours()).slice(-2)}`;
        const minutes = `${('0' + currentDate.getMinutes()).slice(-2)}`;

        const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;

        return formattedDate;
    }
}