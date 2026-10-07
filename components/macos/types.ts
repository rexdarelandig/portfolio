export type WindowId = 
  | 'bio' 
  | 'projects' 
  | 'terminal' 
  | 'skills' 
  | 'contact' 
  | 'finder' 
  | 'resume' 
  | 'about-mac';

export interface WindowState {
  id: WindowId;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  selectedProjectId?: string;
}

export interface DockItem {
  id: WindowId | string;
  name: string;
  iconType: 'app' | 'project' | 'file';
  icon: string | React.ReactNode;
  isOpen?: boolean;
  badge?: string;
  projectId?: string;
  onClick: () => void;
}
