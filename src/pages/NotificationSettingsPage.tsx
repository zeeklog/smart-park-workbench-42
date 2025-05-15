
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Define notification types
const notificationTypes = [
  { id: 'service-quality-staff', label: '服务质量类-客服' },
  { id: 'service-quality-manager', label: '服务质量类-主管' },
  { id: 'project-warning-staff', label: '项目异常预警-客服' },
  { id: 'project-warning-manager', label: '项目异常预警-主管' },
  { id: 'project-report', label: '项目运营报告' },
  { id: 'tenant-insights', label: '租户洞察类' },
];

// Mock data for initial users
const initialUsers = [
  {
    id: '1',
    name: '张三',
    phone: '13800138001',
    notifications: ['service-quality-staff', 'project-warning-staff'],
  },
  {
    id: '2',
    name: '李四',
    phone: '13800138002',
    notifications: ['service-quality-manager', 'project-warning-manager', 'project-report'],
  },
  {
    id: '3',
    name: '王五',
    phone: '13800138003',
    notifications: ['tenant-insights', 'project-report'],
  },
];

const NotificationSettingsPage = () => {
  const [users, setUsers] = useState(initialUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  // Filter users based on search query
  const filteredUsers = users.filter(user =>
    user.name.includes(searchQuery) || user.phone.includes(searchQuery)
  );

  // Toggle notification type for a user
  const toggleNotification = (userId: string, notificationType: string) => {
    setUsers(prevUsers =>
      prevUsers.map(user => {
        if (user.id === userId) {
          const updatedNotifications = user.notifications.includes(notificationType)
            ? user.notifications.filter(type => type !== notificationType)
            : [...user.notifications, notificationType];
          
          return { ...user, notifications: updatedNotifications };
        }
        return user;
      })
    );
  };

  // Save changes
  const saveChanges = () => {
    // In a real app, here you would send the data to your backend
    toast({
      title: "保存成功",
      description: "推送设置已更新",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">推送管理</h1>
        <Button onClick={saveChanges}>保存设置</Button>
      </div>
      
      <div className="flex max-w-sm items-center rounded-md border bg-background px-3 py-2 mb-6">
        <Search size={18} className="mr-2 text-muted-foreground" />
        <input
          type="text"
          placeholder="搜索用户名或手机号..."
          className="w-full bg-transparent outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">用户名称</TableHead>
              <TableHead className="w-[150px]">手机号</TableHead>
              {notificationTypes.map(type => (
                <TableHead key={type.id} className="text-center">
                  {type.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map(user => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  {notificationTypes.map(type => (
                    <TableCell key={type.id} className="text-center">
                      <Checkbox
                        checked={user.notifications.includes(type.id)}
                        onCheckedChange={() => toggleNotification(user.id, type.id)}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2 + notificationTypes.length} className="text-center py-4">
                  没有找到匹配的用户
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default NotificationSettingsPage;
