
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  MessageSquare, 
  MessageSquareWarning, 
  Users, 
  Calendar,
  Bell
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const location = useLocation();

  const menuItems = [
    {
      name: '企业对话分析',
      icon: <MessageSquare size={20} />,
      path: '/conversations',
    },
    {
      name: '投诉处理',
      icon: <MessageSquareWarning size={20} />,
      path: '/complaints',
    },
    {
      name: '客户拜访',
      icon: <Calendar size={20} />,
      path: '/customer-visits',
    },
    {
      name: '客户画像',
      icon: <Users size={20} />,
      path: '/customer-profiles',
    },
    {
      name: '推送管理',
      icon: <Bell size={20} />,
      path: '/notification-settings',
    },
  ];

  return (
    <aside
      className={`${
        isOpen ? 'w-64' : 'w-0 md:w-16'
      } bg-sidebar transition-width duration-300 ease-in-out hidden md:block`}
    >
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center justify-between px-4">
          {isOpen ? (
            <span className="text-xl font-semibold text-sidebar-foreground">
              园区AI工作台
            </span>
          ) : null}
        </div>
        <nav className="flex-1 space-y-2 px-2 py-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar-item ${
                location.pathname === item.path ? 'active' : ''
              } ${isOpen ? '' : 'justify-center'}`}
            >
              {item.icon}
              {isOpen && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
