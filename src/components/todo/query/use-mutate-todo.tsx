import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mutateTodo } from "@/services/todo";
import { KEY } from "./use-todolist"


export const useMutateTodo = (queryString: string)  => {
   const queryClient = useQueryClient()
   return useMutation({
      mutationKey: [KEY],
      mutationFn: (variables: Record<string, any>) => mutateTodo(queryString, variables),
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: [KEY] })
      }
   })
};
