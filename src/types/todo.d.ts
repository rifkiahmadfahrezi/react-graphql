export type Todo = {
   id: number;
   title: string;
   status: "done" | "on_progress" | "not_started";
}