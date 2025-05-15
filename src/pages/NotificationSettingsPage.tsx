import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Search, Save, Edit, UserPlus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

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
    position: '客服主管',
    notifications: ['service-quality-staff', 'project-warning-staff'],
  },
  {
    id: '2',
    name: '李四',
    phone: '13800138002',
    position: '运营经理',
    notifications: ['service-quality-manager', 'project-warning-manager', 'project-report'],
  },
  {
    id: '3',
    name: '王五',
    phone: '13800138003',
    position: '客服专员',
    notifications: ['tenant-insights', 'project-report'],
  },
];

const NotificationSettingsPage = () => {
  const [users, setUsers] = useState<Array<{
    id: string;
    name: string;
    phone: string;
    position: string;
    notifications: string[];
  }>>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isPersonnelSynced, setIsPersonnelSynced] = useState(false);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const { toast } = useToast();

  // Filter users based on search query
  const filteredUsers = users.filter(user =>
    user.name.includes(searchQuery) || user.phone.includes(searchQuery)
  );

  // Toggle notification type for a user
  const toggleNotification = (userId: string, notificationType: string) => {
    if (userId !== editingUserId) return;
    
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

  // Sync personnel data
  const syncPersonnel = () => {
    // In a real app, here you would fetch data from your backend
    setUsers(initialUsers);
    setIsPersonnelSynced(true);
    
    toast({
      title: "人员同步成功",
      description: "已同步最新的人员数据",
    });
  };

  // Start editing a user's notification settings
  const startEditing = (userId: string) => {
    setEditingUserId(userId);
  };

  // Save changes for the currently edited user
  const saveUserSettings = (userId: string) => {
    // In a real app, here you would send the data to your backend
    setEditingUserId(null);
    
    toast({
      title: "保存成功",
      description: "用户推送设置已更新",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">推送管理</h1>
        {!isPersonnelSynced ? (
          <Button onClick={syncPersonnel}>
            <UserPlus className="mr-2 h-4 w-4" />
            同步人员数据
          </Button>
        ) : (
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={syncPersonnel}
            >
              <UserPlus className="mr-2 h-4 w-4" />
              同步
            </Button>
          </div>
        )}
      </div>
      
      {isPersonnelSynced && (
        <>
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
                  <TableHead className="w-[150px]">用户名称</TableHead>
                  <TableHead className="w-[150px]">手机号</TableHead>
                  <TableHead className="w-[120px]">岗位</TableHead>
                  {notificationTypes.map(type => (
                    <TableHead key={type.id} className="text-center">
                      {type.label}
                    </TableHead>
                  ))}
                  <TableHead className="w-[100px]">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map(user => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.phone}</TableCell>
                      <TableCell>{user.position}</TableCell>
                      {notificationTypes.map(type => (
                        <TableCell key={type.id} className="text-center">
                          <Checkbox
                            checked={user.notifications.includes(type.id)}
                            onCheckedChange={() => toggleNotification(user.id, type.id)}
                            disabled={editingUserId !== user.id}
                          />
                        </TableCell>
                      ))}
                      <TableCell>
                        {editingUserId === user.id ? (
                          <Button 
                            size="sm" 
                            onClick={() => saveUserSettings(user.id)}
                          >
                            <Save className="h-4 w-4 mr-1" />
                            保存
                          </Button>
                        ) : (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => startEditing(user.id)}
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            编辑
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3 + notificationTypes.length + 1} className="text-center py-4">
                      没有找到匹配的用户
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </>
      )}

      {!isPersonnelSynced && (
        <div className="flex flex-col items-center justify-center p-8 border rounded-lg bg-muted/30">
          <UserPlus className="h-12 w-12 mb-4 text-muted-foreground" />
          <h3 className="text-xl font-medium mb-2">请先同步人员数据</h3>
          <p className="text-muted-foreground mb-4">同步人员数据后才能配置推送设置</p>
          <Button onClick={syncPersonnel}>立即同步</Button>
        </div>
      )}
    </div>
  );
};

export default NotificationSettingsPage;
