import { createFileRoute } from '@tanstack/react-router'
import { TodoList } from '@/components/todo/todolist'
import { AddTodo } from '@/components/todo/add-todo'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <>
      <main className="max-w-screen-md py-10 mx-auto px-3">
        <div className="mb-6 flex items-center justify-between sticky top-0 bg-background p-3">
          <h1 className='font-semibold text-xl'>Todo</h1>
          <AddTodo />
        </div>
        <TodoList />
      </main>
    </>
  )
}
