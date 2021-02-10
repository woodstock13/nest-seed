export interface ITalk {
    id: number
    description: string
    startsAt: string
    endsAt: string
    speakers: {
        id: string
        name: string
    }
    room: string
    day: string
    format: string
    track: string
    level: string
}
