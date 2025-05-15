
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  MessageSquare, 
  MessageSquareWarning, 
  Users, 
  Calendar,
  Bell,
  List,
  UserSearch
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['notification']);

  const toggleSubmenu = (menuId: string) => {
    setExpandedMenus(prev => 
      prev.includes(menuId) 
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    );
  };

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
      name: '用户画像2',
      icon: <UserSearch size={20} />,
      path: '/customer-profile2',
    },
    {
      id: 'notification',
      name: '推送管理',
      icon: <Bell size={20} />,
      hasSubMenu: true,
      subMenuItems: [
        {
          name: '推送设置',
          path: '/notification-settings',
        },
        {
          name: '推送列表',
          path: '/notification-list',
        }
      ]
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
            <div key={item.path || item.id}>
              {item.hasSubMenu ? (
                <>
                  <button
                    onClick={() => toggleSubmenu(item.id as string)}
                    className={`sidebar-item ${isOpen ? '' : 'justify-center'}`}
                  >
                    {item.icon}
                    {isOpen && (
                      <>
                        <span>{item.name}</span>
                        <span className="ml-auto">
                          {expandedMenus.includes(item.id as string) ? '▼' : '▶'}
                        </span>
                      </>
                    )}
                  </button>
                  {isOpen && expandedMenus.includes(item.id as string) && (
                    <div className="pl-8 mt-1 space-y-1">
                      {item.subMenuItems?.map((subItem) => (
                        <Link
                          key={subItem.path}
                          to={subItem.path}
                          className={`sidebar-item text-sm ${
                            location.pathname === subItem.path ? 'active' : ''
                          }`}
                        >
                          <span>{subItem.name}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to={item.path}
                  className={`sidebar-item ${
                    location.pathname === item.path ? 'active' : ''
                  } ${isOpen ? '' : 'justify-center'}`}
                >
                  {item.icon}
                  {isOpen && <span>{item.name}</span>}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
