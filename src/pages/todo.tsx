import React, { useState, useMemo, ReactNode } from 'react';
import { 
  Search, Plus, Edit, Trash2, ChevronLeft, ChevronRight, 
  Check, MoreHorizontal, Calendar 
} from 'lucide-react';
import Container from "../components/shared/container";
import Section from "../components/shared/section";

const Avatar = ({ src, alt }: { src: string, alt: string }) => (
  <img 
    src={src} 
    alt={alt} 
    className="w-8 h-8 rounded-full object-cover border border-slate-700"
  />
);

const Badge = ({ children, variant }: { children: ReactNode, variant: 'in-progress' | 'pending' | 'completed' }) => {
  const styles = {
    'in-progress': 'bg-orange-500/10 text-orange-500 border-orange-500/20',
    'pending': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    'completed': 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
  }[variant];

  return (
    <span className={`px-2.5 py-0.5 rounded text-xs font-medium border ${styles}`}>
      {children}
    </span>
  );
};

const Priority = ({ level }: { level: 'High' | 'Medium' | 'Low' }) => {
  const color = {
    'High': 'bg-rose-500',
    'Medium': 'bg-amber-500',
    'Low': 'bg-emerald-500',
  }[level];

  const textColor = {
    'High': 'text-rose-500',
    'Medium': 'text-amber-500',
    'Low': 'text-emerald-500',
  }[level];

  return (
    <div className="flex items-center gap-2">
      <span className={`w-2 h-2 rounded-full ${color}`} />
      <span className={`text-sm ${textColor}`}>{level}</span>
    </div>
  );
};

/**
 * =========================================================================
 * TODO LIST COMPONENT LOGIC
 * =========================================================================
 */

interface Task {
  id: string;
  name: string;
  createdDate: string;
  dueDate: string;
  assignedTo: {
    name: string;
    avatar: string;
  };
  status: 'In-Progress' | 'Pending' | 'Completed';
  priority: 'High' | 'Medium' | 'Low';
  selected?: boolean;
}

const INITIAL_TASKS: Task[] = [
  { id: '1', name: 'Review system logs for any reported errors', createdDate: 'Tue Apr 23 2024', dueDate: 'Tue Apr 30 2024', assignedTo: { name: 'Anna M. Hines', avatar: 'https://i.pravatar.cc/150?u=10' }, status: 'In-Progress', priority: 'High' },
  { id: '2', name: 'Conduct user testing to identify potential bugs', createdDate: 'Tue May 14 2024', dueDate: 'Sun Aug 25 2024', assignedTo: { name: 'Candice F. Gilmore', avatar: 'https://i.pravatar.cc/150?u=20' }, status: 'Pending', priority: 'Low' },
  { id: '3', name: 'Gather feedback from stakeholders regarding any issues', createdDate: 'Fri Apr 12 2024', dueDate: 'Sun Apr 28 2024', assignedTo: { name: 'Vanessa R. Davis', avatar: 'https://i.pravatar.cc/150?u=30' }, status: 'In-Progress', priority: 'High' },
  { id: '4', name: 'Prioritize bugs based on severity and impact', createdDate: 'Wed Apr 10 2024', dueDate: 'Mon Apr 15 2024', assignedTo: { name: 'Judith H. Fritsche', avatar: 'https://i.pravatar.cc/150?u=40' }, status: 'Completed', priority: 'Medium', selected: true },
  { id: '5', name: 'Investigate and analyze the root cause of each bug', createdDate: 'Wed May 22 2024', dueDate: 'Fri Jul 05 2024', assignedTo: { name: 'Peter T. Smith', avatar: 'https://i.pravatar.cc/150?u=50' }, status: 'Pending', priority: 'Low' },
  { id: '6', name: 'Develop and implement fixes for the identified bugs', createdDate: 'Sat May 18 2024', dueDate: 'Tue Apr 30 2024', assignedTo: { name: 'Emmanuel J. Delcid', avatar: 'https://i.pravatar.cc/150?u=60' }, status: 'Completed', priority: 'Low', selected: true },
  { id: '7', name: 'Complete any recurring tasks', createdDate: 'Fri Apr 05 2024', dueDate: 'Mon Apr 22 2024', assignedTo: { name: 'William J. Cook', avatar: 'https://i.pravatar.cc/150?u=70' }, status: 'Pending', priority: 'High' },
  { id: '8', name: 'Check emails and respond', createdDate: 'Sat Jun 15 2024', dueDate: 'Thu Aug 01 2024', assignedTo: { name: 'Martin R. Peters', avatar: 'https://i.pravatar.cc/150?u=80' }, status: 'Pending', priority: 'Low' },
  { id: '9', name: 'Review schedule for the day', createdDate: 'Mon Apr 22 2024', dueDate: 'Tue Apr 30 2024', assignedTo: { name: 'Paul M. Schubert', avatar: 'https://i.pravatar.cc/150?u=90' }, status: 'In-Progress', priority: 'Medium' },
  { id: '10', name: 'Daily stand-up meeting', createdDate: 'Tue Apr 23 2024', dueDate: 'Tue Apr 30 2024', assignedTo: { name: 'Janet J. Champine', avatar: 'https://i.pravatar.cc/150?u=95' }, status: 'In-Progress', priority: 'High' },
];

export const TodoList = () => {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  // Toggle Selection
  const toggleSelect = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, selected: !t.selected } : t));
  };

  const deletetask = (id: string) => {
    if (confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter(t => t.id !== id));
    }
  };

  // Filter Logic
  const filteredTasks = useMemo(() => {
    return tasks.filter(t => t.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [tasks, searchTerm]);

  return (
    <div className="w-full">
      {/* Header Toolbar */}
      <div className="p-5 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/5">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
          <input
            type="text"
            placeholder="Search task..."
            className="w-full bg-white border border-slate-200 dark:bg-slate-900 dark:border-slate-700 rounded-md py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-slate-800 dark:text-slate-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors shadow-lg shadow-blue-900/20">
          <Plus size={16} />
          Create Task
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800 text-xs uppercase text-slate-500 font-semibold">
              <th className="p-4 w-12 text-center">
                {/* Header Checkbox (Visual only for demo) */}
                <div className="w-4 h-4 border border-slate-400 rounded mx-auto"></div>
              </th>
              <th className="p-4">Task Name</th>
              <th className="p-4">Created Date</th>
              <th className="p-4">Due Date</th>
              <th className="p-4">Assigned</th>
              <th className="p-4">Status</th>
              <th className="p-4">Priority</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-slate-200 dark:divide-slate-800">
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <tr 
                  key={task.id} 
                  className={`group transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50 ${task.selected ? 'bg-blue-50 dark:bg-blue-900/10' : ''}`}
                >
                  <td className="p-4 text-center">
                    <div 
                      onClick={() => toggleSelect(task.id)}
                      className={`w-5 h-5 rounded-full border-2 mx-auto flex items-center justify-center cursor-pointer transition-all ${
                        task.selected 
                          ? 'bg-blue-500 border-blue-500' 
                          : 'border-slate-300 dark:border-slate-600 group-hover:border-slate-400'
                      }`}
                    >
                      {task.selected && <Check size={12} className="text-white" />}
                    </div>
                  </td>
                  <td className="p-4 font-medium text-slate-700 dark:text-slate-200">
                    {task.name}
                  </td>
                  <td className="p-4 text-slate-500 dark:text-slate-400 whitespace-nowrap">
                    {task.createdDate}
                  </td>
                  <td className="p-4 text-slate-500 dark:text-slate-400 whitespace-nowrap">
                    {task.dueDate}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <Avatar src={task.assignedTo.avatar} alt={task.assignedTo.name} />
                      <span className="text-slate-700 dark:text-slate-300">{task.assignedTo.name}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge variant={task.status.toLowerCase().replace(' ', '-') as any}>
                      {task.status}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <Priority level={task.priority} />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 text-slate-400 bg-slate-100 dark:bg-slate-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 rounded transition-colors">
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => deletetask(task.id)}
                        className="p-1.5 text-slate-400 bg-slate-100 dark:bg-slate-800 hover:bg-rose-100 dark:hover:bg-rose-900/30 hover:text-rose-600 rounded transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="p-8 text-center text-slate-500">
                  No tasks found matching "{searchTerm}"
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer Pagination */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
        <div>
          Showing <span className="font-semibold text-slate-700 dark:text-slate-200">{filteredTasks.length > 0 ? 1 : 0}</span> to <span className="font-semibold text-slate-700 dark:text-slate-200">{filteredTasks.length}</span> of <span className="font-semibold text-slate-700 dark:text-slate-200">{tasks.length}</span> tasks
        </div>
        <div className="flex items-center gap-2">
          <button className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50">
            <ChevronLeft size={16} />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 text-white text-xs font-medium shadow-lg shadow-blue-900/20">
            1
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium transition-colors">
            2
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium transition-colors">
            3
          </button>
          <button className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * =========================================================================
 * DOCUMENTATION PAGE
 * =========================================================================
 */

export default function Todos() {
  return (
    <Container
      title="Task List"
      description="A comprehensive task management table with search, filtering, status tracking, and pagination."
    >
      <Section title="Tasks">
        <TodoList />
      </Section>
    </Container>
  );
}