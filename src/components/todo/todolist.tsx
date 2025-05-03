import { useTodoList } from "./query/use-todolist";
import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import type { Todo } from "@/types/todo";
import { TodoStatus } from "./todo-status";
import { UpdateTodo } from "./update-todo";
import { DeleteTodo } from "./delete-todo";
import { cn } from "@/lib/utils";

export const TodoList = () => {
   const { data  , isLoading, error, refetch } = 
      useTodoList(`
         {
            allTodos{
               id
               title
               status
            }
         }`)
   if(isLoading) {
      return (
         <>
         <div className="grid gap-2">
            {Array(5).fill(0).map((_, i) => (
               <Skeleton key={i} className="w-full h-10" />
            ))}
         </div>
         </>
      )
   }

   if(error){
      return (
         <Card>
            <h4 className="text-lg font-semibold">An error is occured</h4>
            <Button size={"sm"} onClick={() => refetch()}>
               Retry
            </Button>
         </Card>
      )
   }

   if(!data || (data as { allTodos : Todo[] }).allTodos.length == 0) return <p className="p-3 text-muted-foreground">Nothing todo now..</p>
   return (
      <>
         <div className="grid gap-2">
            {(data as { allTodos : Todo[] }).allTodos.map(item => (
               <Card className="p-3 gap-1" key={item.id}>
                  <TodoStatus status={item.status} />
                  <h3 className={cn(item.status == "done" && "line-through text-muted-foreground")}>{item.title}</h3>

                  <div className="mt-5 flex items-center gap-2">
                     <DeleteTodo todo={item} />
                     <UpdateTodo todo={item} />
                  </div>
               </Card>
            )).reverse()}
         </div>
      </>
   )
};


