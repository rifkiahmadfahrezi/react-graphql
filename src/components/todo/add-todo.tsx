
import { Input } from "../ui/input";
import { useState } from "react";
import { useMutateTodo } from "./query/use-mutate-todo";


export const AddTodo = () => {
   const [title, setTitle] = useState<string>("")
   const { mutate } = useMutateTodo(
      // mutate query
      `mutation CreateTodo($title: String!, $status: String!) {
         createTodo(title: $title, status: $status) {
            id
            title
            status
         }
      }
      `)

   const handleSubmit = (e : React.FormEvent) => {
      e.preventDefault()
      mutate({
         title,
         status: "not_started",
       })
      setTitle("")
   }  

   return <form onSubmit={handleSubmit} >
      <Input 
      value={title}
      required
      onChange={e => setTitle(e.target.value)}
      placeholder="Add new Todo" />
   </form>
};
