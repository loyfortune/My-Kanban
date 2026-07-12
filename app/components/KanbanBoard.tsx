'use client'
import { useState } from "react"
import { DropResult, DragDropContext } from "@hello-pangea/dnd"
import { Task, Board } from "@/types/types"
import axios from "axios"
import Column from "./Column"
import { SyncLoader } from "react-spinners"
import { FaPlus } from "react-icons/fa"
import Modal from "./ui/Modal"
import { createTask } from "../actions/boardActions"
// SERVER ACTION FOR MODAL

const KanbanBoard: React.FC<{board: Board | null}> = ({ board, }) => {
  const [isCreate, setIsCreate] = useState(false);
  const [tasks, setTask] = useState<Task[] | null>(board ? board.tasks 
  : null);
  const loading = board ? false : true;

  const openModal = () => {
    setIsCreate(true);
  };

  const closeModal = () => {
    setIsCreate(false);
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = 
    result;

    if (!destination) return

    if (source.droppableId === destination.droppableId
    && source.index === destination.index) return

    const draggedTask = tasks!.find((task) => task.id === draggableId);

    let updatedStatus: string;

    switch (destination.droppableId) {
      case 'todo':
        updatedStatus = 'todo'
        break;
      case 'in-progress':
        updatedStatus = 'in_progress'
        break;
      case 'completed':
        updatedStatus = 'done'
        break;
      default: 
        updatedStatus = draggedTask?.status as string;
    }

    try {
      axios.post('/api/updateTaskStatus', {
        taskId: draggableId,
        newStatus: updatedStatus
      });
    } catch (error) {
      console.log(error);
    }

    const updatedTask = tasks!.map((task) => {
      if (task.id === draggableId) {
        return {
          ...task,
          status: updatedStatus,
        }
      }
      return task;
    });

    setTask(updatedTask)
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <SyncLoader color="#fff"/>
      </div>
    )
  }

  return (
    <div className="py-10 relative dark:bg-gray-900 h-screen">
      <h1 className="font-bold text-center mb-10 text-3xl">
        {board?.name}
      </h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid md:grid-cols-3 max-md:items-center w-[90%]
        max-w-375 mx-auto md:gap-5 gap-10">
          <button className="bg-gray-700 rounded-full hover:bg-gray-600 
          text-white font-bold p-4 absolute right-10 bottom-10 cursor-pointer" 
          onClick={openModal}>
            <FaPlus />
          </button>
          {isCreate && <Modal closeModal={closeModal} title='Create New Task' isCreate=
          {isCreate} action={createTask} value={board?.id as string}/>}
          <Column title='Todo' tasks={tasks!.filter((task) => task.status
          === 'todo')} droppableId='todo'/>
          <Column title='In Progress' tasks={tasks!.filter((task) => task.status
          === 'in_progress')} droppableId='in-progress'/>
          <Column title='Completed' tasks={tasks!.filter((task) => task.status
          === 'done')} droppableId='completed'/>
        </div>

      </DragDropContext>
    </div>
  )
};

export default KanbanBoard