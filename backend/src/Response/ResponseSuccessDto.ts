export class ResponseSuccessDto<T=any>{
    // HTTP status code (optional)
    statusCode: number;
    messeage?: string; // Optional: Number of rows/entities affected
    updateResult?: number;// Optional: Number of rows/entities affected
    data?: T;// Optional payload or result

    /**
     * Template for update/insert
     * @param statusCode 
     * @param message 
     * @param updateResult 
     */
    constructor(statusCode: number, message: string, updateResult:number){
        this.statusCode = statusCode;
        this.messeage = message;
        this.updateResult = updateResult;
    }
    
}