export interface Irelay{
    card:number
    relay:number
    type:string
    status:boolean
    title?:string
    pending:boolean
    disabled:boolean
  }
  export interface ILight extends Irelay{
    
    }
    export interface IOutlet extends Irelay{      
      kwh?:number          
    }
    export interface ServerToClientEvents {
      noArg: () => void;
      noArgVal: (val:number) => void;
      basicEmit: (a: number, b: string, c: Buffer) => void;
      light: (light:ILight) => void;
      outlet: (light:IOutlet) => void;
      watts: (index:number,kwh:number) => void;
      withAck: (d: string, callback: (e: number) => void) => void;
    }
    export type sevents= keyof ServerToClientEvents
    
    export interface ClientToServerEvents {
      hello: () => void;
    }
    
    export interface InterServerEvents {
      ping: () => void;
    }

   export interface IComponent<T>{
      kwhs?:number[]
      items:T[]
      handleChange:(item:T)=>void
    }
    
    