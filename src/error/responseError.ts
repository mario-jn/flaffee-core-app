export class ResponseError extends Error{
    constructor(public statusCode: number, public messageEnglish: string, public messageIndonesian: string){
        super(messageEnglish)
    }
}