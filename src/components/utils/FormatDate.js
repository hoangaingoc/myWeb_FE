export default function formatDate(date) {
    if (!date) {
        return "No date available";
    }

    const formattedDate = new Date(date);
    const dateString = formattedDate.toISOString().slice(0, 10);
    const hours = formattedDate.getHours().toString().padStart(2, '0');
    const minutes = formattedDate.getMinutes().toString().padStart(2, '0');

    return `${dateString} ${hours}:${minutes}`;
}