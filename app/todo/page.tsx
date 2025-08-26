"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Check, Loader2, X } from "lucide-react";
import { ResponTodos, Todo } from "../interfaces";
import { axiosClient } from "../lib/axios";
import { showToast } from "../lib/toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const fetchTodos = async (): Promise<Todo[]> => {
  const res: ResponTodos = await axiosClient.get("/todo");
  return res.content.entries;
};

const addTodoApi = async (item: string) => {
  await axiosClient.post("/todo", { item });
};

const toggleTodoApi = async (todo: Todo) => {
  await axiosClient.put(`/todo`, {
    action: todo.isDone ? "UNDONE" : "DONE",
    id: todo.id,
  });
};

const deleteTodosApi = async (ids: string[]) => {
  await Promise.all(
    ids.map((id) =>
      axiosClient.delete(`/todo`, {
        data: { id },
      })
    )
  );
};

export default function TodoPage() {
  const [newTodo, setNewTodo] = useState("");
  const [selectedId, setSelectedId] = useState<string | undefined>("");

  const queryClient = useQueryClient();

  const {
    data: todos = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  // Add Todo
  const addMutation = useMutation({
    mutationFn: addTodoApi,
    onSuccess: () => {
      showToast.success("Todo added");
      setNewTodo("");
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: () => showToast.error("Failed to add todo"),
  });

  const toggleMutation = useMutation({
    mutationFn: toggleTodoApi,
    onSuccess: (_, todo) => {
      showToast.success(
        !todo.isDone ? "Marked as completed" : "Marked as uncompleted"
      );
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: () => showToast.error("Failed to update todo"),
    onMutate: (todo) => {
      setSelectedId(todo.id);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTodosApi,
    onSuccess: () => {
      showToast.success("Deleted selected todos");
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: () => showToast.error("Failed to delete todos"),
  });

  return (
    <div className="w-full flex justify-center flex-col items-center">
      <h1 className="text-4xl font-bold mb-6 text-gray-600">To Do</h1>
      <Card className="w-full max-w-md shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Input
              placeholder="Add new task"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
            />
            <Button
              onClick={() => addMutation.mutate(newTodo)}
              disabled={addMutation.isPending || !newTodo.trim()}
            >
              {addMutation.isPending ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="animate-spin" /> Loading..
                </div>
              ) : (
                "Add Todo"
              )}
            </Button>
          </div>

          {isLoading && <p>Loading...</p>}
          {isError && <p>Failed to load todos</p>}

          <div className="space-y-4">
            {todos.map((todo) => (
              <div
                key={todo.id}
                className="flex items-center justify-between border-b pb-2"
              >
                <div className="flex items-center gap-2">
                  {toggleMutation.isPending && selectedId === todo.id ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <Checkbox
                      checked={todo.isDone || false}
                      onCheckedChange={() => toggleMutation.mutate(todo)}
                    />
                  )}
                  <span
                    className={cn(
                      "text-base",
                      todo.isDone && "line-through text-gray-500"
                    )}
                  >
                    {todo.item}
                  </span>
                </div>

                <div
                  className={cn(
                    "p-1 rounded-full",
                    todo.isDone
                      ? "text-green-500 bg-green-100/50"
                      : "text-red-500 bg-red-100/50"
                  )}
                >
                  {todo.isDone ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <X className="w-5 h-5" />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Delete Button */}
          <Button
            variant="destructive"
            className="mt-6 w-full"
            onClick={() => {
              const selectedIds = todos
                .filter((t) => t.isDone)
                .map((t) => t.id)
                .filter(Boolean) as string[];
              deleteMutation.mutate(selectedIds);
            }}
            disabled={
              deleteMutation.isPending || todos.every((item) => !item.isDone)
            }
          >
            {deleteMutation.isPending ? (
              <div className="flex items-center gap-2">
                <Loader2 className="animate-spin" /> Deleting...
              </div>
            ) : (
              "Deleted Selected"
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
