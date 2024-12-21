export class ResponseResultListDto<T=any>{
    count: number;// Optional: Number of rows/entities affected
    data: T;// Optional payload or result

    /**
     * Template for update/insert
     * @param statusCode 
     * @param message 
     * @param updateResult 
     */
    constructor(count: number, data:T){
      this.count = count;
      this.data = data;
    }
    
}