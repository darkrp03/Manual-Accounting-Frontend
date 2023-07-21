export class Visitor {
    [key: number]: Visitor | undefined

    visitorId?: string;
    visitorName?: string;
    visitorSurname?: string;
    visitorEntryTime?: string;
}