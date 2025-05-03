import type { Todo } from "@/types/todo";
import { Badge, type BadgeVariants } from "../ui/badge";

export const TodoStatus = ({ status } : { status : Todo["status"] }) => {
   let variant : BadgeVariants["variant"] = "secondary"

   switch(status){
      case "done":
         variant = "success"
         break
      case "on_progress":
         variant = "on_progress"
         break
      case "not_started":
         variant = "not_started"
            break
   }

   return <Badge variant={variant} >{status.replaceAll("_", " ")}</Badge>
};
