import { useQuery } from "@tanstack/react-query";
import { fetchTodo } from "@/services/todo";

export const KEY = "todos"

export const useTodoList = (query: string)  => {
   return useQuery({
      queryKey: [KEY],
      queryFn: () => (fetchTodo(query)), 
      })
      
};
