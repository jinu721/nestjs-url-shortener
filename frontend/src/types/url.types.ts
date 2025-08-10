export interface CreateUrlPayload {
    originalUrl: string
}

export interface UrlHistory {
    id: number
    originalUrl: string
    shortUrl: string
    shortCode: string
    clicks: number
    createdAt: string
}