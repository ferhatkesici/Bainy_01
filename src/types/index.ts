export interface Task {
  id: string;
  name: string;
  project: string;
  employee: string;
  creationDate: string;
  deadline: string;
  status: 'Devam Ediyor' | 'Tamamlandı';
  hours?: number;
  color?: string;
}

export interface Employee {
  id: number;
  username: string;
  password: string;
  role: 'supervisor' | 'hybrid_supervisor' | 'employee';
  name: string;
  department: string;
  active: boolean;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  employee: string;
  taskId?: string;
  color?: string;
} 