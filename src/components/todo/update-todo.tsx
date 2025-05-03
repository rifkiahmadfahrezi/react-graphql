import type { Todo } from "@/types/todo";

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectLabel,
   SelectTrigger,
   SelectValue,
 } from "@/components/ui/select"
 import { useMutateTodo } from "./query/use-mutate-todo";
 import { Pencil } from "lucide-react";
import { useState } from "react";

export const UpdateTodo = ({ todo } : { todo : Todo }) => {
  const [formValue, setFormValue] = useState({
    title: todo.title,
    status: todo.status
  })

  const { mutate } = useMutateTodo(`
     mutation UpdateTodo($id: ID!, $title: String, $status: String) {
        updateTodo(id: $id, title: $title, status: $status) {
          id
          title
          status
        }
      }
  `)

  const handleOnChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormValue(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutate({
      id: todo.id,
      title: formValue.title,
      status: formValue.status
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size={"icon"}>
          <Pencil className="text-green-600" />
          <span className="sr-only">Update todo</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Todo</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                name="title"
                value={formValue.title}
                required
                onChange={handleOnChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Select
                defaultValue={formValue.status}
                onValueChange={(value) => setFormValue(prev => ({
                  ...prev,
                  status: value as Todo["status"]
                }))}
              >
                <SelectTrigger className="col-span-3 w-full">
                  <SelectValue id="status" placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="w-full col-span-3">
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem value="done">Done</SelectItem>
                    <SelectItem value="on_progress">On progress</SelectItem>
                    <SelectItem value="not_started">Not started</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant={"outline"}>Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="submit">Save changes</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
