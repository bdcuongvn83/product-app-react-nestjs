export class ResponseErrorDto{
    
    statusCode: number;// Optional payload or result
    message: string;

    /**
     * Template for update/insert
     * @param statusCode 
     * @param message 
     */
    constructor(statusCode: number, message:string){
      this.statusCode = statusCode;
      this.message = message;
    }
    
}