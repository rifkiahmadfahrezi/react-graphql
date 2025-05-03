import type { Todo } from "@/types/todo";

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogClose
} from "@/components/ui/dialog"
 import { useMutateTodo } from "./query/use-mutate-todo";
 import { Trash } from "lucide-react";


export const DeleteTodo = ({ todo } : { todo : Todo }) => {

   const { mutate } = useMutateTodo(
      `
         mutation DeleteTodo($id: ID!) {
         deleteTodo(id: $id) {
               id
               title
               status
            }
         }
      `
   )

   const handleDelete = () => {
      mutate({
         id: todo.id
      })
   }

   return (
      <Dialog>
      <DialogTrigger asChild>
         <Button variant="outline" size={'icon'}> 
            <Trash className="text-red-400" />
            <span className="sr-only">Delete todo</span>
         </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Todo</DialogTitle>
          <DialogDescription>
            Delete this todo you can't undo this action.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
            <DialogClose asChild>
               <Button variant={"outline"} >Cancel</Button>
            </DialogClose>
          <Button onClick={handleDelete} >Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
   )
};
