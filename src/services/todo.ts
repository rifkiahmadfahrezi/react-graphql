import { api } from "@/lib/api"

export const fetchTodo = async <T>(queryString: string): Promise<T> => {
   try {
     const req = await api("", {
       method: "POST",
       body: JSON.stringify({
         query: queryString,
       }),
     });
 
     const json = await req.json();
 
     if (json.errors) {
       // Tangani error dari GraphQL
       throw new Error(JSON.stringify(json.errors));
     }
 
     return json.data as T;
   } catch (error) {
     console.error("GraphQL fetch error:", error);
     throw error;
   }
 };
export const mutateTodo = async <T>(queryString: string, variable: Record<string, any>): Promise<T> => {
   try {
     const req = await api("", {
       method: "POST",
       body: JSON.stringify({
         query: queryString,
         variables: variable
       }),
     });
 
     const json = await req.json();
 
     if (json.errors) {
       // Tangani error dari GraphQL
       throw new Error(JSON.stringify(json.errors));
     }
     
     return json.data as T;
   } catch (error) {
     console.error("GraphQL fetch error:", error);
     throw error;
   }
 };
 